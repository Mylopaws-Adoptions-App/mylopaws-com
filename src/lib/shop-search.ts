'use client';
import { track } from './track';

/** Search logging for the shop. Fire-and-forget; never throws. */
const SID = 'mp_sid', LAST = 'mp_last_search';
function sid() {
  try {
    let v = sessionStorage.getItem(SID);
    if (!v) { v = (crypto.randomUUID?.() ?? String(Date.now()) + Math.random().toString(36).slice(2)); sessionStorage.setItem(SID, v); }
    return v;
  } catch { return undefined; }
}
const send = (body: Record<string, unknown>) => {
  try { void fetch('/api/shop-search/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => {}); } catch { /* ignore */ }
};

export function logSearch(raw: string, results: number) {
  const q = raw.trim().slice(0, 120);
  if (!q) return;
  const u = new URLSearchParams(location.search), session = sid();
  try { sessionStorage.setItem(LAST, JSON.stringify({ q, t: Date.now() })); } catch { /* ignore */ }
  track('search', { search_term: q });
  track('view_search_results', { search_term: q, results_count: results });
  send({ query: q, results_count: results, session_id: session, page_path: location.pathname, utm_source: u.get('utm_source') ?? undefined, utm_medium: u.get('utm_medium') ?? undefined, utm_campaign: u.get('utm_campaign') ?? undefined });
}

/** Call when a product is clicked or added to the basket; links it to the search made in the last 30 minutes. */
export function logSearchClick(productId: string, added = false) {
  try {
    const l = JSON.parse(sessionStorage.getItem(LAST) ?? 'null') as { q: string; t: number } | null;
    if (!l || Date.now() - l.t > 30 * 60_000) return;
    send({ type: 'click', query: l.q, session_id: sid(), product_id: productId, added });
  } catch { /* ignore */ }
}
