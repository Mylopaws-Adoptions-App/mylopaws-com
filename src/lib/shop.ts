import fs from 'node:fs';
import { SUPABASE } from './site';
import FEED_DESC from '@/data/feed-descriptions.json';
import { shopCategory, sell, mrp, isRx, imagesOf, type Bundle, type ShopProduct } from './shop-core';
export * from './shop-core';

const COLS = 'handle,title,category,brand,pet_type,concerns,life_stage,pack_size,family,variant_label,gtin,benefits,how_to_use,short_desc,description,images,image_url,price,mylopaws_price,price_flag,in_stock,feed_eligible,in_store,feed_description,feed_google_category,feed_product_type,is_prescription,rx_required,featured,bestseller,sort_rank,country_of_origin';

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

/** Products flagged for the Google Merchant feed (feed_eligible), in stock only, so every feed item has a live product page. */
export async function feedProducts(): Promise<ShopProduct[]> {
  if (process.env.SHOP_FIXTURE) return (await allProducts()).filter((p) => p.feed_eligible);
  try {
    const url = `${SUPABASE.url}/rest/v1/shop_products?select=${COLS}&available=eq.true&in_stock=eq.true&feed_eligible=eq.true&product_type=neq.SRK%20draft&order=sort_rank.asc,title.asc&limit=1000`;
    const res = await fetch(url, { headers: { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` }, next: { revalidate: 900 } });
    if (!res.ok) return [];
    return ((await res.json()) as ShopProduct[]).map(clean);
  } catch {
    return [];
  }
}


const priceEsc = (n: number) => n.toFixed(2);
/** Merchant feed price tags, shared by the main feed and the local inventory feed so they can never disagree. */
export function priceTags(p: ShopProduct): string[] {
  const price = sell(p)!, list = mrp(p);
  return list && list > price ? [`<g:price>${priceEsc(list)} INR</g:price>`, `<g:sale_price>${priceEsc(price)} INR</g:sale_price>`] : [`<g:price>${priceEsc(price)} INR</g:price>`];
}
/** The products in the main Google Merchant feed. The local inventory feed is a subset of exactly this list. */
export async function merchantItems(): Promise<ShopProduct[]> {
  return (await feedProducts()).filter((p) => !isRx(p) && sell(p) && imagesOf(p)[0] && productDescription(p));
}


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


const DEFAULT_DESC = FEED_DESC as Record<string, string>;
const meaningful = (t: string | null | undefined, title: string) => {
  const v = (t ?? '').replace(/\s+/g, ' ').trim();
  return v && v.toLowerCase().replace(/[.\s]+$/, '') !== title.toLowerCase() ? v : '';
};
/** Product copy shared by the feed and the product page: DB override > default copy > existing text (never just the title). */
export function productDescription(p: ShopProduct): string {
  return meaningful(p.feed_description, p.title) || DEFAULT_DESC[p.handle] || meaningful(p.short_desc, p.title) || meaningful(p.description, p.title) || '';
}
