import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { SUPABASE } from '@/lib/site';

/** Server-side Meta Conversions API for Purchase. No-op until META_PIXEL_ID and META_CAPI_TOKEN are set in Vercel. */
export const dynamic = 'force-dynamic';
const sha = (s: string) => createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

export async function POST(req: Request) {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID, token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return NextResponse.json({ ok: false, reason: 'not configured' });
  try {
    const b = await req.json();
    const orderId = String(b.order_id ?? ''), phone = String(b.phone ?? '').replace(/\D/g, '').slice(-10);
    if (!/^[0-9a-f-]{36}$/i.test(orderId) || phone.length !== 10) return NextResponse.json({ ok: false }, { status: 400 });
    // look the order up through the same guest endpoint, so only the buyer's own (id + phone) order can be reported
    const r = await fetch(`${SUPABASE.url}/functions/v1/shop-web`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'order', order_id: orderId, phone }) });
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 404 });
    const { order } = await r.json();
    if (order.payment_status !== 'paid') return NextResponse.json({ ok: false, reason: 'unpaid' });
    const body = {
      data: [{
        event_name: 'Purchase', event_time: Math.floor(Date.now() / 1000), event_id: String(b.event_id ?? `order-${orderId}`), action_source: 'website',
        event_source_url: `https://mylopaws.com/shopping/order/?id=${orderId}`,
        user_data: { ph: [sha('91' + phone)], client_ip_address: (req.headers.get('x-forwarded-for') ?? '').split(',')[0] || undefined, client_user_agent: req.headers.get('user-agent') ?? undefined },
        custom_data: { currency: 'INR', value: Number(order.total), order_id: String(order.order_number), content_type: 'product', content_ids: order.items.map((i: { handle: string }) => i.handle), num_items: order.items.length },
      }],
    };
    const m = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return NextResponse.json({ ok: m.ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
