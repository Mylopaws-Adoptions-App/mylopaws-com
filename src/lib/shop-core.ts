import { SHOP_WHATSAPP, waLink } from './site';

/** Catalogue row as the shop uses it. Prices are rupees; `price` is the MRP, `mylopaws_price` the selling price. */
export type ShopProduct = {
  handle: string;
  title: string;
  category: string | null;
  brand: string | null;
  pet_type: 'dog' | 'cat' | 'both' | null;
  concerns: string[] | null;
  life_stage: string | null;
  pack_size: string | null;
  family: string | null;
  variant_label: string | null;
  gtin: string | null;
  benefits: string[] | null;
  how_to_use: string | null;
  short_desc: string | null;
  description: string | null;
  images: string[] | null;
  image_url: string | null;
  price: number | null;
  mylopaws_price: number | null;
  price_flag: string | null;
  is_prescription: boolean | null;
  rx_required: boolean | null;
  featured: boolean | null;
  bestseller: boolean | null;
  sort_rank: number | null;
  country_of_origin: string | null;
};
/** Backwards compatible name used by the home page. */
export type Product = ShopProduct;

/** Category names as shown on the site (brand terminology: "Skin & Fur", never "coat"). */
export const shopCategory = (c: string | null) => (c === 'Skin & Coat Care' ? 'Skin & Fur Care' : c ?? 'Other');

export type Bundle = { slug: string; title: string; blurb: string | null; pet_type: string | null; image_url: string | null; discount_pct: number; items: { handle: string; qty: number }[] };

// ── price helpers ────────────────────────────────────────────────
/** Selling price, or null when we have no price (then the shop says "Ask on WhatsApp"). */
export const sell = (p: Pick<ShopProduct, 'price' | 'mylopaws_price'>): number | null => {
  const v = p.mylopaws_price ?? p.price;
  return v != null && v > 0 ? v : null;
};
export const mrp = (p: Pick<ShopProduct, 'price' | 'mylopaws_price'>): number | null => (p.price != null && p.price > 0 ? p.price : null);
export const savePct = (p: Pick<ShopProduct, 'price' | 'mylopaws_price'>): number => {
  const s = sell(p), m = mrp(p);
  return s && m && m > s ? Math.round((1 - s / m) * 100) : 0;
};
export const inr = (n: number) => '₹' + (Math.round(n * 100) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 });
export const isRx = (p: Pick<ShopProduct, 'is_prescription' | 'rx_required'>) => !!(p.is_prescription || p.rx_required);

/** Image URLs on our own site are made same-origin so they load on previews and localhost too. */
export const imgSrc = (u: string | null | undefined) => (u ? u.replace(/^https:\/\/(www\.)?mylopaws\.com(?=\/)/, '') : '');
export const imagesOf = (p: Pick<ShopProduct, 'images' | 'image_url'>): string[] => {
  const a = (p.images ?? []).filter(Boolean);
  return (a.length ? a : p.image_url ? [p.image_url] : []).map(imgSrc);
};
export const productPath = (handle: string) => `/shopping/product/${handle}/`;

/** The slim shape sent to client components (keeps the page light). */
export type Card = { h: string; t: string; b: string | null; c: string | null; pt: string | null; cn: string[]; pk: string | null; p: number | null; m: number | null; i: string; rx: boolean; best: boolean; f: boolean; r: number };
export const toCard = (p: ShopProduct): Card => ({
  h: p.handle, t: p.title, b: p.brand, c: p.category, pt: p.pet_type, cn: p.concerns ?? [], pk: p.pack_size,
  p: sell(p), m: mrp(p), i: imagesOf(p)[0] ?? '', rx: isRx(p), best: !!p.bestseller, f: !!p.featured, r: p.sort_rank ?? 100,
});

// ── taxonomy ─────────────────────────────────────────────────────
export const CONCERNS: Record<string, { label: string; blurb: string }> = {
  'ticks-fleas': { label: 'Ticks & fleas', blurb: 'Spot-ons, chews, sprays and shampoos to keep ticks and fleas off dogs and cats.' },
  'skin-fur': { label: 'Skin & Fur', blurb: 'Shampoos, serums, supplements and sprays for healthy skin and a shiny coat.' },
  itching: { label: 'Itching', blurb: 'Soothing care for itchy, irritated skin. If it keeps up, see a vet.' },
  dandruff: { label: 'Dandruff', blurb: 'Anti-dandruff shampoos and conditioners for flaky skin.' },
  digestion: { label: 'Digestion', blurb: 'Probiotics, tonics and gentle diets for a happy tummy.' },
  joints: { label: 'Joints & mobility', blurb: 'Joint-care supplements for senior and active pets.' },
  immunity: { label: 'Immunity & vitamins', blurb: 'Multivitamins and immunity support for everyday health.' },
  bathing: { label: 'Bath time', blurb: 'Gentle shampoos and conditioners for dogs and cats.' },
  odour: { label: 'Odour control', blurb: 'Deodorising shampoos, colognes and sprays.' },
  tangles: { label: 'Tangles & shedding', blurb: 'Detanglers and de-shedding care for long and double coats.' },
  'wound-care': { label: 'Wound care', blurb: 'Sprays, creams and antiseptics for minor cuts. Serious wounds need a vet.' },
  'ear-care': { label: 'Ear care', blurb: 'Cleaners and drops for healthy ears.' },
  dental: { label: 'Dental care', blurb: 'Toothpastes, gels and chews for fresh breath and clean teeth.' },
  'eye-care': { label: 'Eye care', blurb: 'Gentle eye cleaners and drops.' },
  'home-hygiene': { label: 'Home hygiene', blurb: 'Floor cleaners and stain and odour removers for pet homes.' },
  'litter-odour': { label: 'Litter & odour', blurb: 'Cat litter and litter-box odour control.' },
  training: { label: 'Training aids', blurb: 'Potty training and behaviour aids.' },
  'puppy-growth': { label: 'Puppy growth', blurb: 'Food and supplements for growing puppies.' },
};
export const HOME_CONCERNS = ['ticks-fleas', 'skin-fur', 'itching', 'digestion', 'joints', 'immunity', 'bathing', 'odour'];
export const PETS = { dogs: { label: 'Dogs', key: 'dog' }, cats: { label: 'Cats', key: 'cat' } } as const;
export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export type Collection = { slug: string; title: string; h1: string; blurb: string; filter: (p: ShopProduct) => boolean };

export function collections(items: ShopProduct[]): Collection[] {
  const out: Collection[] = [];
  out.push({ slug: 'dogs', title: 'Dog medicines, food and care in Bangalore', h1: 'For dogs', blurb: 'Everything for your dog: tick and flea care, skin and fur, supplements, food and treats, delivered across Bangalore.', filter: (p) => p.pet_type === 'dog' || p.pet_type === 'both' });
  out.push({ slug: 'cats', title: 'Cat medicines, food and care in Bangalore', h1: 'For cats', blurb: 'Cat-safe care, litter, food and supplements, delivered across Bangalore.', filter: (p) => p.pet_type === 'cat' || p.pet_type === 'both' });
  for (const [k, v] of Object.entries(CONCERNS)) {
    out.push({ slug: k, title: `${v.label} for dogs and cats in Bangalore`, h1: v.label, blurb: v.blurb, filter: (p) => (p.concerns ?? []).includes(k) });
  }
  const brands = new Map<string, number>();
  for (const p of items) if (p.brand && p.brand !== 'Generic') brands.set(p.brand, (brands.get(p.brand) ?? 0) + 1);
  for (const [b, n] of brands) if (n >= 2) out.push({ slug: `brand-${slugify(b)}`, title: `${b} pet products in Bangalore`, h1: b, blurb: `${b} pet care available from the Mylopaws pharmacy, delivered across Bangalore.`, filter: (p) => p.brand === b });
  return out.filter((c) => items.some(c.filter));
}

export const brandList = (items: ShopProduct[]) => {
  const m = new Map<string, number>();
  for (const p of items) if (p.brand && p.brand !== 'Generic') m.set(p.brand, (m.get(p.brand) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

export const FREE_DELIVERY_MIN = 3000;
export const DELIVERY_FEE = 100;
export const VET_WHATSAPP = '918971500296';
export const shopLink = (text: string) => waLink(SHOP_WHATSAPP, text);
export const askLink = (title: string) => waLink(SHOP_WHATSAPP, `Hi Mylopaws, I'd like to order: ${title}`);
export const vetLink = (title?: string) => waLink(VET_WHATSAPP, title ? `Hi Dr Amrita, I'd like a consult about ${title} for my pet.` : 'Hi Dr Amrita, I have a question about a medicine for my pet.');
