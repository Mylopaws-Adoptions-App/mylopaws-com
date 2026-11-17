import { absUrl, feedProducts, imagesOf, isRx, mrp, productDescription, productPath, sell } from '@/lib/shop';
import { SITE } from '@/lib/site';

/**
 * Google Merchant Center product feed (RSS 2.0, g: namespace).
 * Only products with feed_eligible = true in shop_products (grooming, food, treats, litter, home care, non-medicinal
 * supplements). Medicines, antiparasitics and therapeutic diets are never flagged. Prices and stock come from the same
 * rows as the product pages. Delivery rules live in Merchant Center, so there is no per-item g:shipping.
 */
export const revalidate = 3600;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const DEFAULT_CAT = 'Animals & Pet Supplies > Pet Supplies';

export async function GET() {
  const items = (await feedProducts()).filter((p) => !isRx(p) && sell(p) && imagesOf(p)[0] && productDescription(p));
  const rows = items.map((p) => {
    const img = imagesOf(p).map(absUrl);
    const price = sell(p)!, list = mrp(p);
    const gtin = (p.gtin ?? '').replace(/\D/g, '');
    return [
      '<item>',
      `<g:id>${esc(p.handle)}</g:id>`,
      `<g:title>${esc(p.title.slice(0, 150))}</g:title>`,
      `<g:description>${esc(productDescription(p).slice(0, 4900))}</g:description>`,
      `<g:link>${SITE.url}${productPath(p.handle)}</g:link>`,
      `<g:image_link>${esc(img[0])}</g:image_link>`,
      ...img.slice(1, 6).map((i) => `<g:additional_image_link>${esc(i)}</g:additional_image_link>`),
      `<g:availability>${p.in_stock === false ? 'out_of_stock' : 'in_stock'}</g:availability>`,
      ...(list && list > price ? [`<g:price>${list.toFixed(2)} INR</g:price>`, `<g:sale_price>${price.toFixed(2)} INR</g:sale_price>`] : [`<g:price>${price.toFixed(2)} INR</g:price>`]),
      '<g:condition>new</g:condition>',
      ...(p.brand ? [`<g:brand>${esc(p.brand)}</g:brand>`] : []),
      gtin.length >= 8 ? `<g:gtin>${gtin}</g:gtin>` : '<g:identifier_exists>no</g:identifier_exists>',
      `<g:google_product_category>${esc(p.feed_google_category || DEFAULT_CAT)}</g:google_product_category>`,
      `<g:product_type>${esc(p.feed_product_type || 'Pet Supplies')}</g:product_type>`,
      ...(p.family ? [`<g:item_group_id>${esc(p.family)}</g:item_group_id>`] : []),
      ...(p.pack_size ? [`<g:product_detail><g:attribute_name>Pack size</g:attribute_name><g:attribute_value>${esc(p.pack_size)}</g:attribute_value></g:product_detail>`] : []),
      '</item>',
    ].join('\n');
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Mylopaws Shopping</title>
<link>${SITE.url}/shopping/</link>
<description>Pet food, grooming and care products from Mylopaws, delivered in Bangalore</description>
${rows.join('\n')}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' } });
}
