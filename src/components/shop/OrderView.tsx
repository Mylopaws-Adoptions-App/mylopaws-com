'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { inr, shopLink } from '@/lib/shop-core';
import { shopApi } from './api';
import { ecommerce } from '@/lib/track';
import { WhatsApp } from '../Icons';

type Order = { id: string; order_number: number; created_at: string; items: { title: string; qty: number; price: number; handle: string; category?: string }[]; subtotal: number; delivery_fee: number; total: number; status: string; payment_status: string; delivery_status: string; fulfilment: string; promised_date: string | null; tracking_url: string | null; rx_status: string; customer_name: string };
const STEPS = ['processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
const LABEL: Record<string, string> = { processing: 'Confirmed', packed: 'Packed', shipped: 'On the way', out_for_delivery: 'Out for delivery', delivered: 'Delivered' };

export function OrderView() {
  const sp = useSearchParams();
  const id = sp.get('id') ?? '';
  const fresh = sp.get('new') === '1';
  const [o, setO] = useState<Order | null>(null);
  const [wa, setWa] = useState('919071091699');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [err, setErr] = useState('');
  const [tries, setTries] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    let p = '';
    try { const s = JSON.parse(localStorage.getItem('mp_last_order') ?? '{}'); if (s.id === id) p = s.phone; } catch { /* ignore */ }
    if (p) setPhone(p);
  }, [id]);

  useEffect(() => {
    if (!id || !phone) return;
    let live = true;
    shopApi<{ order: Order; support_whatsapp: string }>('order', { order_id: id, phone }).then((r) => {
      if (!live) return;
      setO(r.order); setWa(r.support_whatsapp); setErr('');
      // payment confirmation can lag by a few seconds: poll briefly
      if (r.order.payment_status !== 'paid' && tries < 6) setTimeout(() => live && setTries((t) => t + 1), 2500);
    }).catch((e) => live && setErr(e instanceof Error ? e.message : 'Order not found'));
    return () => { live = false; };
  }, [id, phone, tries]);

  useEffect(() => {
    if (!o || o.payment_status !== 'paid' || !fresh || fired.current) return;
    fired.current = true;
    try { if (sessionStorage.getItem('mp_purchased_' + o.id)) return; sessionStorage.setItem('mp_purchased_' + o.id, '1'); } catch { /* ignore */ }
    ecommerce('purchase', o.items.map((i) => ({ item_id: i.handle, item_name: i.title, item_category: i.category ?? null, price: i.price, quantity: i.qty })), { transaction_id: String(o.order_number), value: Number(o.total), shipping: Number(o.delivery_fee) }, `order-${o.id}`);
    // server-side Meta CAPI (no-op until the pixel id and token are configured)
    fetch('/api/shop/capi/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'Purchase', event_id: `order-${o.id}`, order_id: o.id, phone }) }).catch(() => {});
  }, [o, fresh, phone]);

  if (!id) return <div className="wrap"><div className="empty">No order selected. <Link href="/shopping/">Back to the shop</Link></div></div>;
  if (!phone) {
    return (
      <div className="wrap"><div className="co-card" style={{ maxWidth: 460 }}>
        <h3>Find your order</h3>
        <p className="muted small">Enter the mobile number you used at checkout.</p>
        <label>Mobile number<input inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(-10))} /></label>
        <button type="button" className="btn btn-primary" disabled={pin.length !== 10} onClick={() => setPhone(pin)}>Show my order</button>
        <p className="muted small">Or message us on <a href={shopLink('Hi Mylopaws, I need an update on my order.')}>WhatsApp</a>.</p>
      </div></div>
    );
  }
  if (err) return <div className="wrap"><div className="empty">{err}. <a href={shopLink('Hi Mylopaws, I need help finding my order.')}>Message us on WhatsApp</a></div></div>;
  if (!o) return <div className="wrap"><div className="empty">Loading your order...</div></div>;

  const paid = o.payment_status === 'paid';
  const cancelled = o.delivery_status === 'cancelled' || o.status === 'cancelled';
  const idx = Math.max(0, STEPS.indexOf(o.delivery_status));
  return (
    <div className="wrap order">
      <div className="order-head">
        <span className={`tag ${paid ? 'g' : 'y'}`}>{cancelled ? 'Cancelled' : paid ? 'Payment received' : 'Confirming payment...'}</span>
        <h2>{paid && fresh ? 'Thank you, ' + (o.customer_name?.split(' ')[0] ?? '') + '!' : `Order #${o.order_number}`}</h2>
        <p className="muted">{paid ? 'We will update you on WhatsApp at each step. No login needed.' : 'This can take a few seconds. If you were charged, your order will be confirmed shortly.'}</p>
      </div>
      {paid && !cancelled && (
        <ol className="track">
          {STEPS.filter((s) => o.fulfilment === 'delivery' || s === 'processing' || s === 'packed' || s === 'delivered').map((s, i) => (
            <li key={s} className={STEPS.indexOf(s) <= idx ? 'done' : ''}><span />{o.fulfilment === 'pickup' && s === 'packed' ? 'Ready to collect' : o.fulfilment === 'pickup' && s === 'delivered' ? 'Collected' : LABEL[s]}</li>
          ))}
        </ol>
      )}
      <div className="co-card">
        <h3>Order #{o.order_number}</h3>
        <ul className="order-items">{o.items.map((i, n) => <li key={n}><span>{i.qty} × {i.title}</span><b>{inr(i.price * i.qty)}</b></li>)}</ul>
        <div className="sum"><div><span>Delivery</span><b>{Number(o.delivery_fee) ? inr(o.delivery_fee) : 'Free'}</b></div><div className="tot"><span>Total paid</span><b>{inr(o.total)}</b></div></div>
        <p className="muted small">{o.fulfilment === 'pickup' ? 'Collect from our HSR Layout store once we message you that it is ready.' : o.promised_date ? `Expected on our ${new Date(o.promised_date + 'T00:00:00Z').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC' })} evening delivery run.` : 'We will message you the delivery date.'}</p>
        {o.rx_status === 'received' && <p className="muted small">Our team will check your prescription before packing.</p>}
        {o.tracking_url && <p><a href={o.tracking_url}>Track your delivery</a></p>}
      </div>
      <a className="btn btn-ghost" href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi Mylopaws, about my order #${o.order_number}`)}`}><WhatsApp size={18} /> Message us about this order</a>
      <p><Link href="/shopping/">Continue shopping →</Link></p>
    </div>
  );
}
