import { createHash } from 'node:crypto';
import { SUPABASE } from '@/lib/site';

/**
 * Shop search logging. Service role only (server env SUPABASE_SERVICE_ROLE_KEY), never exposed to the browser.
 * No-ops with 204 if the key is not set, so the shop never breaks. No personal data: queries that look like an
 * email or phone number are dropped, and IPs are only used (hashed) as a rate-limit key.
 */
export const dynamic = 'force-dynamic';
const NO = { status: 204, headers: { 'Cache-Control': 'no-store' } } as const;
const clip = (v: unknown, n: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, n) : null);
const looksPersonal = (q: string) => /@/.test(q) || /\d[\s\-().]*\d[\s\-().]*\d[\s\-().]*\d[\s\-().]*\d[\s\-().]*\d[\s\-().]*\d/.test(q) || /(https?:|www\.)/i.test(q);

export async function POST(req: Request) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return new Response(null, NO);
  try {
    const b = (await req.json()) as Record<string, unknown>;
    const query = clip(b.query, 120);
    if (!query || looksPersonal(query)) return new Response(null, NO);
    const session = clip(b.session_id, 64);
    const h = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
    const rest = `${SUPABASE.url}/rest/v1`;

    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    const rl = await fetch(`${rest}/rpc/rl_hit`, { method: 'POST', headers: h, body: JSON.stringify({ p_key: 'shop-search:' + createHash('sha256').update(ip).digest('hex').slice(0, 24), p_limit: 40, p_window_sec: 60 }) });
    if (rl.ok && (await rl.json()) === false) return new Response(null, { status: 429, headers: NO.headers });

    if (b.type === 'click') {
      const pid = clip(b.product_id, 200);
      if (!session || !pid) return new Response(null, NO);
      const since = new Date(Date.now() - 30 * 60_000).toISOString();
      const patch: Record<string, unknown> = { clicked_product_id: pid };
      if (b.added === true) patch.added_to_basket = true;
      await fetch(`${rest}/shop_searches?session_id=eq.${encodeURIComponent(session)}&query=eq.${encodeURIComponent(query)}&created_at=gte.${since}`, { method: 'PATCH', headers: { ...h, Prefer: 'return=minimal' }, body: JSON.stringify(patch) });
      return new Response(null, NO);
    }

    if (session) {
      const since = new Date(Date.now() - 10_000).toISOString();
      const d = await fetch(`${rest}/shop_searches?select=id&session_id=eq.${encodeURIComponent(session)}&query=eq.${encodeURIComponent(query)}&created_at=gte.${since}&limit=1`, { headers: h });
      if (d.ok && ((await d.json()) as unknown[]).length) return new Response(null, NO);
    }
    const rc = Number(b.results_count);
    const r = await fetch(`${rest}/shop_searches`, {
      method: 'POST', headers: { ...h, Prefer: 'return=minimal' },
      body: JSON.stringify({
        query, results_count: Number.isFinite(rc) && rc >= 0 ? Math.floor(rc) : 0, session_id: session, source: 'website',
        page_path: clip(b.page_path, 200), utm_source: clip(b.utm_source, 100), utm_medium: clip(b.utm_medium, 100), utm_campaign: clip(b.utm_campaign, 150),
      }),
    });
    if (!r.ok) console.error('shop-search insert', r.status);
  } catch { /* never surface errors to the shop */ }
  return new Response(null, NO);
}
