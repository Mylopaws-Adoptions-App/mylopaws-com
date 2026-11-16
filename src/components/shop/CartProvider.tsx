'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ecommerce, track } from '@/lib/track';
import { DELIVERY_FEE, FREE_DELIVERY_MIN, inr } from '@/lib/shop-core';

export type CartLine = { key: string; handle?: string; bundle?: string; qty: number; title: string; price: number; mrp: number | null; img: string; rx: boolean; brand?: string | null; category?: string | null; pack?: string | null };
type Toast = { id: number; text: string; nudge?: string } | null;
type Ctx = {
  lines: CartLine[]; count: number; subtotal: number; needsRx: boolean; ready: boolean;
  add: (l: Omit<CartLine, 'qty' | 'key'> & { qty?: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  replace: (lines: CartLine[]) => void;
};
const C = createContext<Ctx | null>(null);
const STORE = 'mp_cart_v1';
export const useCart = () => {
  const c = useContext(C);
  if (!c) throw new Error('CartProvider missing');
  return c;
};
const toItem = (l: CartLine) => ({ item_id: l.handle ?? `bundle-${l.bundle}`, item_name: l.title, item_brand: l.brand ?? null, item_category: l.category ?? null, price: l.price, quantity: l.qty });
export { toItem };

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const tid = useRef(0);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE) ?? '[]');
      if (Array.isArray(raw)) setLines(raw.filter((l) => l && typeof l.key === 'string' && l.qty >= 1 && typeof l.price === 'number').slice(0, 40));
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORE, JSON.stringify(lines)); } catch { /* ignore */ }
  }, [lines, ready]);
  // keep tabs in sync
  useEffect(() => {
    const on = (e: StorageEvent) => { if (e.key === STORE && e.newValue) try { setLines(JSON.parse(e.newValue)); } catch { /* ignore */ } };
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  }, []);

  const subtotal = useMemo(() => Math.round(lines.reduce((t, l) => t + l.price * l.qty, 0) * 100) / 100, [lines]);

  const add: Ctx['add'] = useCallback((l) => {
    const key = l.bundle ? `b:${l.bundle}` : `h:${l.handle}`;
    const qty = Math.max(1, l.qty ?? 1);
    let newSub = 0;
    setLines((cur) => {
      const i = cur.findIndex((x) => x.key === key);
      const next = i >= 0 ? cur.map((x, j) => (j === i ? { ...x, qty: Math.min(20, x.qty + qty) } : x)) : [...cur, { ...l, key, qty }];
      newSub = next.reduce((t, x) => t + x.price * x.qty, 0);
      return next;
    });
    ecommerce('add_to_cart', [toItem({ ...l, key, qty } as CartLine)]);
    const gap = FREE_DELIVERY_MIN - (subtotal + l.price * qty);
    const id = ++tid.current;
    setToast({ id, text: `Added to cart: ${l.title}`, nudge: gap > 0 ? `Add ${inr(gap)} more for free delivery` : 'You have free delivery' });
    if (gap > 0) track('free_delivery_nudge_seen', { gap, cart_value: subtotal + l.price * qty });
    setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 4500);
    void newSub;
  }, [subtotal]);

  const setQty = useCallback((key: string, qty: number) => setLines((cur) => (qty <= 0 ? cur.filter((l) => l.key !== key) : cur.map((l) => (l.key === key ? { ...l, qty: Math.min(20, qty) } : l)))), []);
  const remove = useCallback((key: string) => {
    setLines((cur) => {
      const l = cur.find((x) => x.key === key);
      if (l) ecommerce('remove_from_cart', [toItem(l)]);
      return cur.filter((x) => x.key !== key);
    });
  }, []);
  const clear = useCallback(() => setLines([]), []);
  const replace = useCallback((l: CartLine[]) => setLines(l), []);

  const value: Ctx = useMemo(() => ({
    lines, count: lines.reduce((t, l) => t + l.qty, 0), subtotal, needsRx: lines.some((l) => l.rx), ready, add, setQty, remove, clear, replace,
  }), [lines, subtotal, ready, add, setQty, remove, clear, replace]);

  return (
    <C.Provider value={value}>
      {children}
      <div className="cart-toast-wrap" aria-live="polite">
        {toast && (
          <div className="cart-toast" role="status" key={toast.id}>
            <div><b>{toast.text}</b>{toast.nudge && <small>{toast.nudge}</small>}</div>
            <a className="btn btn-primary" href="/shopping/cart/">View cart</a>
          </div>
        )}
      </div>
    </C.Provider>
  );
}

export { DELIVERY_FEE, FREE_DELIVERY_MIN };
