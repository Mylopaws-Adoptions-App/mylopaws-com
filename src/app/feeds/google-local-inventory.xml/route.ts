import { feedId } from '@/lib/feed-id';
import { merchantItems, priceTags } from '@/lib/shop';
import { SITE } from '@/lib/site';

/**
 * Google Merchant Center local inventory feed (RSS 2.0, g: namespace): products on the shelf in the store with
 * same-day pickup. It is a strict subset of the main feed (same filter, same g:id, same price tags) limited to
 * shop_products.in_store = true. Add a product with:
 *   update public.shop_products set in_store = true where handle in ('slug', ...);
 * g:store_code must match the store code in the Google Business Profile, set in Vercel as LOCAL_STORE_CODE.
 * No g:quantity is sent. Without LOCAL_STORE_CODE the feed is valid but empty.
 */
export const revalidate = 3600;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const store = (process.env.LOCAL_STORE_CODE ?? '').trim();
  if (!store) console.error('google-local-inventory: LOCAL_STORE_CODE is not set, serving an empty feed');
  const items = store ? (await merchantItems()).filter((p) => p.in_store === true) : [];
  const rows = items.map((p) => [
    '<item>',
    `<g:store_code>${esc(store)}</g:store_code>`,
    `<g:id>${esc(feedId(p.handle))}</g:id>`,
    ...priceTags(p),
    '<g:availability>in_stock</g:availability>',
    '<g:pickup_method>buy</g:pickup_method>',
    '<g:pickup_sla>same_day</g:pickup_sla>',
    '</item>',
  ].join('\n'));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Mylopaws Local Inventory</title>
<link>${SITE.url}/shopping/</link>
<description>In-store availability and same-day pickup for Mylopaws products</description>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rows.join('\n')}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' } });
}
