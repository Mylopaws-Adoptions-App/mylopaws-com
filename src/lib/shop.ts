import fs from 'node:fs';
import { SHOP_WHATSAPP, SUPABASE, waLink } from './site';

export type Product = { handle: string; title: string; category: string | null; image_url: string | null; rx_required: boolean | null };

/** Category names as shown on the site (brand terminology: "Skin & Fur", never "coat"). */
export const shopCategory = (c: string | null) => (c === 'Skin & Coat Care' ? 'Skin & Fur Care' : c ?? 'Other');

/** In-stock catalogue from the Mylopaws shop (Supabase). Refreshes hourly; never throws. */
export async function catalogue(): Promise<Product[]> {
  // Local testing only: point SHOP_FIXTURE at a JSON file when Supabase isn't reachable.
  if (process.env.SHOP_FIXTURE) return (JSON.parse(fs.readFileSync(process.env.SHOP_FIXTURE, 'utf8')) as Product[]).map((p) => ({ ...p, category: shopCategory(p.category) }));
  try {
    const url = `${SUPABASE.url}/rest/v1/shop_products?select=handle,title,category,image_url,rx_required&available=eq.true&in_stock=eq.true&category=neq.Vaccines&order=category.asc,title.asc`;
    const res = await fetch(url, { headers: { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` }, next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const rows = (await res.json()) as Product[];
    return rows.map((p) => ({ ...p, category: shopCategory(p.category) }));
  } catch {
    return [];
  }
}

export const shopLink = (text: string) => waLink(SHOP_WHATSAPP, text);
