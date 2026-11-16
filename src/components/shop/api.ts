import { SUPABASE } from '@/lib/site';

export const SHOP_API = `${SUPABASE.url}/functions/v1/shop-web`;
export class ShopApiError extends Error {
  code?: string; handle?: string; status: number;
  constructor(msg: string, status: number, code?: string, handle?: string) { super(msg); this.status = status; this.code = code; this.handle = handle; }
}
// deno-lint-ignore no-explicit-any
export async function shopApi<T = any>(action: string, body: Record<string, unknown> = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(SHOP_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...body }) });
  } catch {
    throw new ShopApiError('Could not reach the shop. Please check your internet and try again.', 0);
  }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new ShopApiError(j.error ?? 'Something went wrong. Please try again.', res.status, j.code, j.handle);
  return j as T;
}

export type Quote = {
  lines: { handle: string; title: string; price: number; mrp: number; qty: number; line_total: number; bundle: string | null; in_stock: boolean; rx: boolean; vaccine: boolean; image_url: string | null }[];
  subtotal: number; delivery_fee: number; free_delivery_gap: number; needs_rx: boolean; missing: number;
};

declare global { interface Window { Razorpay?: new (o: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void } } }
let rz: Promise<void> | null = null;
export function loadRazorpay(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject();
  if (window.Razorpay) return Promise.resolve();
  rz ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve();
    s.onerror = () => { rz = null; reject(new Error('Could not load the payment window')); };
    document.head.appendChild(s);
  });
  return rz;
}
