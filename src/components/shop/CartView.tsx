'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DELIVERY_FEE, FREE_DELIVERY_MIN, inr, productPath, shopLink, vetLink } from '@/lib/shop-core';
import { useCart, toItem, type CartLine } from './CartProvider';
import { Quote, ShopApiError, loadRazorpay, shopApi } from './api';
import { attribution, ecommerce, track, whatsappClick } from '@/lib/track';
import { WhatsApp } from '../Icons';

type Fulfil = 'delivery' | 'pickup';
type Cfg = { delivery: { fee: number; free_min: number; window: string; pickup_enabled: boolean }; next_run_label: string; support_whatsapp: string };

const fileB64 = (f: File) => new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1] ?? ''); r.onerror = () => rej(new Error('read')); r.readAsDataURL(f); });

export function CartView() {
  const router = useRouter();
  const { lines, ready, setQty, remove, replace, clear } = useCart();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [cfg, setCfg] = useState<Cfg | null>(null);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [fulfil, setFulfil] = useState<Fulfil>('delivery');
  const [f, setF] = useState({ name: '', phone: '', email: '', line1: '', landmark: '', pincode: '' });
  const [consent, setConsent] = useState(false);
  const [rx, setRx] = useState<{ id: string; name: string } | null>(null);
  const [rxBusy, setRxBusy] = useState(false);
  const started = useRef(false);
  const viewed = useRef(false);
  const sid = useRef('');

  useEffect(() => {
    try { sid.current = sessionStorage.getItem('mp_sid') ?? crypto.randomUUID(); sessionStorage.setItem('mp_sid', sid.current); } catch { sid.current = crypto.randomUUID(); }
    try { const s = JSON.parse(localStorage.getItem('mp_cust') ?? '{}'); if (s && typeof s === 'object') setF((x) => ({ ...x, name: s.name ?? '', phone: s.phone ?? '', email: s.email ?? '', line1: s.line1 ?? '', landmark: s.landmark ?? '', pincode: s.pincode ?? '' })); } catch { /* ignore */ }
    shopApi<Cfg>('config').then(setCfg).catch(() => {});
  }, []);

  const payload = useMemo(() => lines.map((l) => (l.bundle ? { bundle: l.bundle, qty: l.qty } : { handle: l.handle, qty: l.qty })), [lines]);
  const sig = JSON.stringify(payload);

  // refresh prices and stock from the server whenever the cart changes
  useEffect(() => {
    if (!ready || !lines.length) { setQuote(null); return; }
    let live = true;
    const t = setTimeout(() => {
      shopApi<Quote>('quote', { items: payload }).then((q) => {
        if (!live) return;
        setQuote(q);
        // sync authoritative prices into the cart
        const next: CartLine[] = lines.map((l) => {
          const mine = q.lines.filter((x) => (l.bundle ? x.bundle === l.bundle : !x.bundle && x.handle === l.handle));
          if (!mine.length) return l;
          const total = mine.reduce((s, x) => s + x.line_total, 0);
          const unit = Math.round((total / l.qty) * 100) / 100;
          return unit !== l.price ? { ...l, price: unit } : l;
        });
        if (next.some((l, i) => l !== lines[i])) { setNotice('Some prices were updated. Please review your cart.'); replace(next); }
        if (q.missing > 0) setNotice('Some items are no longer available and were not counted. Please remove them to continue.');
        if (!viewed.current) { viewed.current = true; ecommerce('view_cart', lines.map(toItem)); }
      }).catch(() => {});
    }, 250);
    return () => { live = false; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, sig]);

  const needsRx = quote?.needs_rx ?? lines.some((l) => l.rx);
  const subtotal = quote?.subtotal ?? lines.reduce((s, l) => s + l.price * l.qty, 0);
  const freeMin = cfg?.delivery.free_min ?? FREE_DELIVERY_MIN;
  const fee = fulfil === 'delivery' && subtotal > 0 && subtotal < freeMin ? (cfg?.delivery.fee ?? DELIVERY_FEE) : 0;
  const total = Math.round((subtotal + fee) * 100) / 100;
  const gap = Math.max(0, freeMin - subtotal);
  const unavailable = quote?.lines.filter((l) => !l.in_stock || l.vaccine).map((l) => l.handle) ?? [];

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  const begin = useCallback(() => {
    if (started.current || !lines.length) return;
    started.current = true;
    ecommerce('begin_checkout', lines.map(toItem));
  }, [lines]);

  const phone10 = f.phone.replace(/\D/g, '').slice(-10);
  const phoneOk = /^[6-9]\d{9}$/.test(phone10);

  const uploadRx = async (file: File | undefined) => {
    if (!file) return;
    setErr('');
    if (!phoneOk) { setErr('Please enter your mobile number first, then upload the prescription.'); return; }
    if (file.size > 6 * 1024 * 1024) { setErr('That file is too large. Please upload a photo or PDF under 6 MB.'); return; }
    setRxBusy(true);
    track('rx_upload_start');
    try {
      const r = await shopApi<{ rx_id: string }>('rx_upload', { phone: phone10, name: f.name, mime: file.type || 'image/jpeg', file_b64: await fileB64(file), items: lines.filter((l) => l.rx).map((l) => l.title) });
      setRx({ id: r.rx_id, name: file.name });
      track('rx_upload_complete');
    } catch (e) { setErr(e instanceof Error ? e.message : 'Upload failed. Please try again.'); }
    finally { setRxBusy(false); }
  };

  const pay = async () => {
    setErr('');
    if (busy) return;
    if (f.name.trim().length < 2) return setErr('Please enter your name.');
    if (!phoneOk) return setErr('Please enter a valid 10-digit mobile number.');
    if (fulfil === 'delivery') {
      if (f.line1.trim().length < 8) return setErr('Please enter your full delivery address.');
      if (!/^5[6]\d{4}$/.test(f.pincode.trim())) return setErr('We deliver within Bangalore only. Please check the pincode (560xxx).');
    }
    if (needsRx && !rx) return setErr('Please upload your vet prescription before paying.');
    setBusy(true);
    try {
      const a = attribution();
      const o = await shopApi<{ order_id: string; order_number: number; razorpay_order_id: string; key_id: string; amount_paise: number; amount: number; prefill: Record<string, string>; promised_label: string | null; items: { id: string; name: string; price: number; qty: number; category: string }[]; subtotal: number; delivery_fee: number }>('checkout', {
        name: f.name, phone: phone10, email: f.email, fulfilment: fulfil, address: { line1: f.line1, landmark: f.landmark, pincode: f.pincode }, items: payload, rx_id: rx?.id,
        sid: sid.current, utm: a.utm, gclid: a.gclid, fbp: a.fbp, fbc: a.fbc, marketing_consent: consent,
      });
      try { localStorage.setItem('mp_cust', JSON.stringify(f)); } catch { /* ignore */ }
      ecommerce('add_payment_info', lines.map(toItem), { payment_type: 'razorpay' });
      await loadRazorpay();
      const Rz = window.Razorpay!;
      const finish = (orderId: string, num: number) => {
        try { localStorage.setItem('mp_last_order', JSON.stringify({ id: orderId, phone: phone10, n: num })); } catch { /* ignore */ }
        clear();
        router.push(`/shopping/order/?id=${orderId}&new=1`);
      };
      const rzp = new Rz({
        key: o.key_id, amount: o.amount_paise, currency: 'INR', order_id: o.razorpay_order_id, name: 'Mylopaws', description: `Order #${o.order_number}`,
        image: 'https://mylopaws.com/icon.svg', prefill: o.prefill, theme: { color: '#681947' }, notes: { order_number: String(o.order_number) },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try { await shopApi('verify', r); } catch { /* the webhook still confirms the payment */ }
          finish(o.order_id, o.order_number);
        },
        modal: { ondismiss: () => { setBusy(false); setErr('Payment was not completed. Your cart is saved, so you can try again.'); track('payment_dismissed'); } },
      });
      rzp.on('payment.failed', () => { setErr('Payment failed. You have not been charged. Please try again or use another method.'); setBusy(false); });
      rzp.open();
    } catch (e) {
      setBusy(false);
      if (e instanceof ShopApiError && e.code === 'out_of_stock') setNotice(e.message);
      setErr(e instanceof ShopApiError || e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  };

  if (!ready) return <div className="wrap"><div className="empty">Loading your cart...</div></div>;
  if (!lines.length) {
    return (
      <div className="wrap"><div className="empty cart-empty">
        <h2>Your cart is empty</h2>
        <p>Browse tick and flea care, shampoos, supplements and food.</p>
        <Link className="btn btn-primary" href="/shopping/#catalogue">Browse the shop</Link>
      </div></div>
    );
  }

  return (
    <div className="wrap cart-grid">
      <section aria-label="Your items">
        <h2 className="cart-h">Your cart</h2>
        {notice && <div className="notice" role="status">{notice}</div>}
        <div className={`fd-bar${gap === 0 ? ' ok' : ''}`}>
          {gap > 0 ? <>Add <b>{inr(gap)}</b> more for <b>free delivery</b></> : <>You have <b>free delivery</b></>}
          <span className="fd-track" aria-hidden="true"><span style={{ width: `${Math.min(100, (subtotal / freeMin) * 100)}%` }} /></span>
        </div>
        <ul className="cart-lines">
          {lines.map((l) => {
            const bad = l.handle && unavailable.includes(l.handle);
            return (
              <li key={l.key} className={bad ? 'bad' : ''}>
                {l.img ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={l.img} alt="" width={72} height={72} loading="lazy" /> : <span className="cl-noimg" />}
                <div className="cl-main">
                  {l.handle ? <Link href={productPath(l.handle)}>{l.title}</Link> : <span>{l.title}</span>}
                  {l.pack && <small>{l.pack}</small>}
                  {l.rx && <span className="tag y">Prescription required</span>}
                  {bad && <small className="err">Out of stock. Please remove it to continue.</small>}
                  <button type="button" className="linkbtn" onClick={() => remove(l.key)}>Remove</button>
                </div>
                <div className="cl-side">
                  <div className="qty sm"><button type="button" aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)}>−</button><span>{l.qty}</span><button type="button" aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)}>+</button></div>
                  <b>{inr(l.price * l.qty)}</b>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="muted small"><Link href="/shopping/#catalogue">← Continue shopping</Link></p>
      </section>

      <section aria-label="Checkout" className="co" onFocusCapture={begin}>
        <h2 className="cart-h">Checkout</h2>
        <div className="co-card">
          <h3>Your details</h3>
          <label>Name<input autoComplete="name" value={f.name} onChange={set('name')} /></label>
          <label>Mobile number (we update you on WhatsApp)<input inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" value={f.phone} onChange={set('phone')} /></label>
          <label>Email (optional)<input type="email" autoComplete="email" value={f.email} onChange={set('email')} /></label>
        </div>
        <div className="co-card">
          <h3>Delivery</h3>
          <div className="seg" role="radiogroup" aria-label="Delivery or pickup">
            <button type="button" role="radio" aria-checked={fulfil === 'delivery'} onClick={() => setFulfil('delivery')}><b>Deliver to me</b><small>{cfg ? `Arrives ${cfg.next_run_label}, ${cfg.delivery.window}` : 'Arrives in 1–3 days by Delhivery'}</small></button>
            {(cfg?.delivery.pickup_enabled ?? true) && <button type="button" role="radio" aria-checked={fulfil === 'pickup'} onClick={() => { setFulfil('pickup'); track('pickup_selected'); }}><b>Free pickup</b><small>HSR Layout store</small></button>}
          </div>
          {fulfil === 'delivery' ? (
            <>
              <label>Full address<input autoComplete="street-address" placeholder="House, street, area" value={f.line1} onChange={set('line1')} /></label>
              <div className="two"><label>Landmark (optional)<input value={f.landmark} onChange={set('landmark')} /></label><label>Pincode<input inputMode="numeric" autoComplete="postal-code" placeholder="560xxx" maxLength={6} value={f.pincode} onChange={set('pincode')} /></label></div>
            </>
          ) : (
            <p className="muted small">Collect from 764/A, 22nd Cross, Parangipalya Main Road, HSR Layout. We message you on WhatsApp when it is packed.</p>
          )}
        </div>
        {needsRx && (
          <div className="co-card rxbox">
            <h3>Vet prescription</h3>
            <p>Your cart has a prescription medicine. Upload the prescription (photo or PDF) before paying. Our team checks it before packing.</p>
            {rx ? <p className="ok-line">✓ Uploaded: {rx.name} <button type="button" className="linkbtn" onClick={() => setRx(null)}>Change</button></p> : (
              <label className="file">{rxBusy ? 'Uploading...' : 'Upload prescription'}<input type="file" accept="image/*,application/pdf" disabled={rxBusy} onChange={(e) => uploadRx(e.target.files?.[0])} /></label>
            )}
            <p className="muted small">No prescription yet? <a href={vetLink()} onClick={() => whatsappClick('cart', undefined, 'vet_consult_click')}>Talk to our vet</a> (consult ₹650).</p>
          </div>
        )}
        <div className="co-card sum">
          <div><span>Subtotal</span><b>{inr(subtotal)}</b></div>
          <div><span>Delivery</span><b>{fulfil === 'pickup' ? 'Free (pickup)' : fee ? inr(fee) : 'Free'}</b></div>
          <div className="tot"><span>Total</span><b>{inr(total)}</b></div>
          <label className="chk"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> Send me offers and reminders on WhatsApp (optional)</label>
          {err && <div className="err-box" role="alert">{err}</div>}
          <button type="button" className="btn btn-primary pay" onClick={pay} disabled={busy || unavailable.length > 0 || (quote?.missing ?? 0) > 0}>{busy ? 'Please wait...' : `Pay ${inr(total)}`}</button>
          <p className="muted small">Secure payment by Razorpay: UPI, cards, netbanking. By paying you agree to our <Link href="/terms-of-service/">terms</Link>, <Link href="/shipping-delivery-policy/">delivery</Link> and <Link href="/cancellation-refund-policy/">refund</Link> policies.</p>
          <a className="btn btn-ghost" href={shopLink('Hi Mylopaws, I need help with my cart.')} onClick={() => whatsappClick('cart')}><WhatsApp size={18} /> Need help? Chat with us</a>
        </div>
      </section>
    </div>
  );
}
