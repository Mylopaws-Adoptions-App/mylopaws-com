'use client';
/** Shop analytics. One call fans out to GA4 + Google Ads (gtag), Meta Pixel (if loaded after consent) and Clarity. Never throws. */

type Params = Record<string, unknown>;
declare global {
  interface Window { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; clarity?: (...a: unknown[]) => void; dataLayer?: unknown[] }
}

export const ADS_ID = 'AW-958815128';
/** Conversion labels come from Google Ads (Goals > Conversions). Set NEXT_PUBLIC_ADS_PURCHASE_LABEL / NEXT_PUBLIC_ADS_WHATSAPP_LABEL in Vercel. */
const ADS_PURCHASE = process.env.NEXT_PUBLIC_ADS_PURCHASE_LABEL;
const ADS_WHATSAPP = process.env.NEXT_PUBLIC_ADS_WHATSAPP_LABEL;

export type Item = { item_id: string; item_name: string; item_brand?: string | null; item_category?: string | null; item_variant?: string | null; price?: number; quantity?: number };

export function track(name: string, params: Params = {}) {
  try {
    window.gtag?.('event', name, params);
    window.clarity?.('event', name);
  } catch { /* analytics must never break the shop */ }
}

const FB: Record<string, string> = { view_item: 'ViewContent', add_to_cart: 'AddToCart', begin_checkout: 'InitiateCheckout', add_payment_info: 'AddPaymentInfo', purchase: 'Purchase' };
const sum = (items: Item[]) => items.reduce((t, i) => t + (i.price ?? 0) * (i.quantity ?? 1), 0);

export function ecommerce(name: 'view_item_list' | 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'view_cart' | 'begin_checkout' | 'add_payment_info' | 'purchase', items: Item[], extra: Params = {}, eventId?: string) {
  const value = Math.round(sum(items) * 100) / 100;
  track(name, { currency: 'INR', value, items, ...extra });
  try {
    const fb = FB[name];
    if (fb && window.fbq) {
      window.fbq('track', fb, { currency: 'INR', value: name === 'purchase' ? (extra.value as number) ?? value : value, content_ids: items.map((i) => i.item_id), content_type: 'product', num_items: items.reduce((t, i) => t + (i.quantity ?? 1), 0) }, eventId ? { eventID: eventId } : undefined);
    }
    if (name === 'purchase' && ADS_PURCHASE) window.gtag?.('event', 'conversion', { send_to: `${ADS_ID}/${ADS_PURCHASE}`, value: (extra.value as number) ?? value, currency: 'INR', transaction_id: extra.transaction_id });
  } catch { /* ignore */ }
}

/** WhatsApp / vet clicks: GA4 lead event plus the Google Ads WhatsApp conversion when its label is set. */
export function whatsappClick(where: string, product?: string, kind: 'whatsapp_click' | 'vet_consult_click' = 'whatsapp_click') {
  track(kind, { where, product, page_path: location.pathname });
  try {
    if (ADS_WHATSAPP) window.gtag?.('event', 'conversion', { send_to: `${ADS_ID}/${ADS_WHATSAPP}` });
    window.fbq?.('track', 'Contact');
  } catch { /* ignore */ }
}

// ── attribution captured on landing, sent with the order ─────────
const KEY = 'mp_attr';
export function captureAttribution() {
  try {
    const q = new URLSearchParams(location.search);
    const cur = JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Record<string, string>;
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
      const v = q.get(k);
      if (v) cur[k] = v;
    }
    sessionStorage.setItem(KEY, JSON.stringify(cur));
  } catch { /* ignore */ }
}
const cookie = (n: string) => document.cookie.split('; ').find((c) => c.startsWith(n + '='))?.split('=')[1];
export function attribution() {
  let a: Record<string, string> = {};
  try { a = JSON.parse(sessionStorage.getItem(KEY) ?? '{}'); } catch { /* ignore */ }
  const fbc = cookie('_fbc') ?? (a.fbclid ? `fb.1.${Date.now()}.${a.fbclid}` : undefined);
  return { utm: a, gclid: a.gclid, fbp: cookie('_fbp'), fbc };
}

// ── consent (DPDP) ───────────────────────────────────────────────
export const CONSENT_KEY = 'mp_consent';
export type Consent = 'granted' | 'denied' | null;
export function getConsent(): Consent {
  try { const v = localStorage.getItem(CONSENT_KEY); return v === 'granted' || v === 'denied' ? v : null; } catch { return null; }
}
export function applyConsent(v: 'granted' | 'denied') {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* ignore */ }
  window.gtag?.('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: 'granted' });
  if (v === 'granted') loadMetaPixel();
}
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export function loadMetaPixel() {
  if (!PIXEL || window.fbq) return;
  // Standard Meta Pixel bootstrap
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return; const n: any = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement; t.async = true; t.src = v; const s = b.getElementsByTagName(e)[0]; s.parentNode!.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq!('init', PIXEL);
  window.fbq!('track', 'PageView');
}
