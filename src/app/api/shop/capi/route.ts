import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { ANALYTICS, SUPABASE } from '@/lib/site';
import { feedId } from '@/lib/feed-id';

/**
 * Server-side Meta Conversions API, paired with the browser pixel through a shared event_id so Meta de-duplicates.
 * - ViewContent / AddToCart / InitiateCheckout: posted by the browser right after the pixel event (same event_id).
 * - Purchase: sent when payment is confirmed. A database trigger calls this route the moment an order becomes paid
 *   (so it still counts if the buyer closes the tab); the order page also calls it as a fallback. The order row is
 *   read with the service role and claimed once (capi_sent_at), so Meta gets one server Purchase per order.
 * No-op until META_CAPI_TOKEN is set. Set META_TEST_EVENT_CODE (Events Manager > Test events) to watch events live.
 */
export const dynamic = 'force-dynamic';
const sha = (s: string) => createHash('sha256').update(s.trim().toLowerCase()).digest('hex');
const ck = (req: Request, n: string) => (req.headers.get('cookie') ?? '').split('; ').find((c) => c.startsWith(n + '='))?.slice(n.length + 1) || undefined;
const SLUG = /^[a-z0-9][a-z0-9._-]{0,199}$/i;
const EVENTS = ['ViewContent', 'AddToCart', 'InitiateCheckout'] as const;
type Item = { handle?: string; qty?: number; price?: number };

async function send(pixel: string, token: string, ev: Record<string, unknown>) {
  const body = { data: [ev], ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}) };
  const m = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const res = (await m.json().catch(() => ({}))) as { events_received?: number; error?: { message?: string } };
  if (!m.ok) console.error('meta capi', m.status, res.error?.message);
  return { ok: m.ok, received: res.events_received ?? 0 };
}

export async function POST(req: Request) {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID || ANALYTICS.metaPixel, token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return NextResponse.json({ ok: false, reason: 'not configured' });
  try {
    const b = await req.json();
    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || undefined, ua = req.headers.get('user-agent') ?? undefined;

    // ── browser events (consent-gated on the client; same event_id as the pixel call) ──
    if (EVENTS.includes(b.event)) {
      const ids: string[] = (Array.isArray(b.content_ids) ? b.content_ids : []).map(String).filter((s: string) => SLUG.test(s)).slice(0, 50);
      const eventId = String(b.event_id ?? '');
      if (!ids.length || !/^[\w.-]{6,80}$/.test(eventId)) return NextResponse.json({ ok: false }, { status: 400 });
      const contents = (Array.isArray(b.contents) ? b.contents : []).slice(0, 50).filter((c: { id?: string }) => SLUG.test(String(c.id))).map((c: { id: string; quantity?: number; item_price?: number }) => ({ id: String(c.id), quantity: Math.max(1, Math.floor(Number(c.quantity) || 1)), item_price: Number(c.item_price) || 0 }));
      const src = typeof b.url === 'string' && b.url.startsWith('https://mylopaws.com/') ? b.url : 'https://mylopaws.com/shopping/';
      return NextResponse.json(await send(pixel, token, {
        event_name: b.event, event_time: Math.floor(Date.now() / 1000), event_id: eventId, action_source: 'website', event_source_url: src,
        user_data: { client_ip_address: ip, client_user_agent: ua, fbp: ck(req, '_fbp'), fbc: ck(req, '_fbc') },
        custom_data: { currency: 'INR', value: Number(b.value) || 0, content_ids: ids, contents, content_type: 'product', num_items: contents.reduce((t: number, c: { quantity: number }) => t + c.quantity, 0) },
      }));
    }

    // ── Purchase ──
    const orderId = String(b.order_id ?? '');
    if (!/^[0-9a-f-]{36}$/i.test(orderId)) return NextResponse.json({ ok: false }, { status: 400 });
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key) return NextResponse.json({ ok: false, reason: 'no service key' });
    const h = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
    const rest = `${SUPABASE.url}/rest/v1`;
    // claim first: only one server Purchase per order, whoever gets here first (DB trigger, or the order page as a fallback)
    const claim = await fetch(`${rest}/shop_orders?id=eq.${orderId}&payment_status=eq.paid&capi_sent_at=is.null&select=id,order_number,total,delivery_fee,items,customer_phone,customer_email,fbp,fbc,client_ip,client_ua`, {
      method: 'PATCH', headers: { ...h, Prefer: 'return=representation' }, body: JSON.stringify({ capi_sent_at: new Date().toISOString() }),
    });
    if (!claim.ok) return NextResponse.json({ ok: false }, { status: 502 });
    const [o] = (await claim.json()) as Array<{ id: string; order_number: number; total: number; items: Item[]; customer_phone?: string; customer_email?: string; fbp?: string; fbc?: string; client_ip?: string; client_ua?: string }>;
    if (!o) return NextResponse.json({ ok: true, reason: 'already sent or unpaid' });
    const items = (Array.isArray(o.items) ? o.items : []).filter((i) => i.handle && SLUG.test(i.handle));
    const phone = String(o.customer_phone ?? '').replace(/\D/g, '').slice(-10);
    const email = String(o.customer_email ?? '').trim();
    const r = await send(pixel, token, {
      event_name: 'Purchase', event_time: Math.floor(Date.now() / 1000), event_id: `order-${o.id}`, action_source: 'website',
      event_source_url: `https://mylopaws.com/shopping/order/?id=${o.id}`,
      user_data: {
        ...(phone.length === 10 ? { ph: [sha('91' + phone)] } : {}), ...(email ? { em: [sha(email)] } : {}),
        client_ip_address: o.client_ip || ip, client_user_agent: o.client_ua || ua, fbp: o.fbp || ck(req, '_fbp'), fbc: o.fbc || ck(req, '_fbc'),
      },
      custom_data: { currency: 'INR', value: Number(o.total), order_id: String(o.order_number), content_type: 'product', content_ids: items.map((i) => feedId(i.handle!)), contents: items.map((i) => ({ id: feedId(i.handle!), quantity: i.qty ?? 1, item_price: Number(i.price ?? 0) })), num_items: items.length },
    });
    if (!r.ok) await fetch(`${rest}/shop_orders?id=eq.${orderId}`, { method: 'PATCH', headers: h, body: JSON.stringify({ capi_sent_at: null }) }); // let a retry through
    return NextResponse.json(r);
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
