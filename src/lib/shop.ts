import fs from 'node:fs';
import { SUPABASE } from './site';
import { shopCategory, type Bundle, type ShopProduct } from './shop-core';
export * from './shop-core';

const COLS = 'handle,title,category,brand,pet_type,concerns,life_stage,pack_size,family,variant_label,gtin,benefits,how_to_use,short_desc,description,images,image_url,price,mylopaws_price,price_flag,is_prescription,rx_required,featured,bestseller,sort_rank,country_of_origin';

function clean(p: ShopProduct): ShopProduct {
  return { ...p, category: shopCategory(p.category), price: p.price == null ? null : Number(p.price), mylopaws_price: p.mylopaws_price == null ? null : Number(p.mylopaws_price) };
}

/** In-stock catalogue from the Mylopaws shop (Supabase). Refreshes every 15 minutes; never throws. */
export async function allProducts(): Promise<ShopProduct[]> {
  // Local testing only: point SHOP_FIXTURE at a JSON file when Supabase isn't reachable.
  if (process.env.SHOP_FIXTURE) return (JSON.parse(fs.readFileSync(process.env.SHOP_FIXTURE, 'utf8')) as ShopProduct[]).map(clean);
  try {
    const url = `${SUPABASE.url}/rest/v1/shop_products?select=${COLS}&available=eq.true&in_stock=eq.true&category=neq.Vaccines&order=sort_rank.asc,title.asc&limit=1000`;
    const res = await fetch(url, { headers: { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` }, next: { revalidate: 900 } });
    if (!res.ok) return [];
    return ((await res.json()) as ShopProduct[]).map(clean);
  } catch {
    return [];
  }
}
export const catalogue = allProducts;


export async function bundles(): Promise<Bundle[]> {
  if (process.env.SHOP_FIXTURE_BUNDLES) return JSON.parse(fs.readFileSync(process.env.SHOP_FIXTURE_BUNDLES, 'utf8')) as Bundle[];
  try {
    const h = { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` };
    const [b, i] = await Promise.all([
      fetch(`${SUPABASE.url}/rest/v1/shop_bundles?select=slug,title,blurb,pet_type,image_url,discount_pct&active=eq.true&order=sort_rank.asc`, { headers: h, next: { revalidate: 900 } }),
      fetch(`${SUPABASE.url}/rest/v1/shop_bundle_items?select=bundle_slug,handle,qty`, { headers: h, next: { revalidate: 900 } }),
    ]);
    if (!b.ok || !i.ok) return [];
    const items = (await i.json()) as { bundle_slug: string; handle: string; qty: number }[];
    return ((await b.json()) as Omit<Bundle, 'items'>[]).map((x) => ({ ...x, discount_pct: Number(x.discount_pct), items: items.filter((y) => y.bundle_slug === x.slug).map((y) => ({ handle: y.handle, qty: Number(y.qty) })) }));
  } catch {
    return [];
  }
}

