/**
 * The one place that decides a product's ID outside the site. Merchant Center caps <g:id> at 50 characters, so the
 * feed, the Meta Pixel / Conversions API content_ids, and the GA4 / Google Ads item_id all go through this.
 * Page URLs keep the full slug; only the ID is shortened. Short slugs are returned unchanged.
 */
const MAX = 50;
const cut = (s: string, n: number) => s.slice(0, n).replace(/-+$/, '');
const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36).padStart(5, '0').slice(0, 5); };

/** Long slugs whose first 50 characters are identical to another product's get a short stable suffix.
 * Add a slug here if the feed ever logs "feedId collision". */
const COLLIDING = new Set([
  'proviboost-syrup-essential-amino-acids-and-vitamin-200-ml',
  'proviboost-syrup-essential-amino-acids-and-vitamin-500-ml',
]);

export function feedId(slug: string): string {
  if (slug.length <= MAX) return slug;
  return COLLIDING.has(slug) ? `${cut(slug, MAX - 6)}-${hash(slug)}` : cut(slug, MAX);
}

/** Dev/feed guard: returns the slugs that share an ID after shortening. */
export function feedIdCollisions(slugs: string[]): string[] {
  const seen = new Map<string, string>(), bad: string[] = [];
  for (const s of slugs) { const id = feedId(s); if (seen.has(id) && seen.get(id) !== s) bad.push(s); else seen.set(id, s); }
  return bad;
}
