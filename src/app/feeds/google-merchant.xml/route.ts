import { allProducts, imagesOf, isRx, mrp, productPath, sell } from '@/lib/shop';
import { SITE } from '@/lib/site';

/** Google Merchant Center product feed (RSS 2.0, g: namespace). Excludes prescription medicines, out-of-stock and unpriced items. */
export const revalidate = 86400; // refreshed daily
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const GCAT: Record<string, string> = {
  'Pet Food': 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Food',
  Treats: 'Animals & Pet Supplies > Pet Supplies > Dog Supplies > Dog Treats',
  'Shampoos & Conditioners': 'Animals & Pet Supplies > Pet Supplies > Pet Grooming Supplies > Pet Shampoos & Conditioners',
  'Litter & Home Care': 'Animals & Pet Supplies > Pet Supplies > Cat Supplies > Cat Litter',
  Antiparasitic: 'Animals & Pet Supplies > Pet Supplies > Pet Medicine > Pet Flea & Tick Control',
};
const DEFAULT_CAT = 'Animals & Pet Supplies > Pet Supplies';

export async function GET() {
  const items = (await allProducts()).filter((p) => !isRx(p) && sell(p) && imagesOf(p)[0] && p.category !== 'Prescription Medicines');
  const rows = items.map((p) => {
    const img = imagesOf(p);
    const price = sell(p)!, list = mrp(p);
    const desc = (p.short_desc ?? p.description ?? p.title).replace(/\s+/g, ' ').slice(0, 4900);
    return `<item>
<g:id>${esc(p.handle)}</g:id>
<g:title>${esc(p.title.slice(0, 150))}</g:title>
<g:description>${esc(desc)}</g:description>
<g:link>${SITE.url}${productPath(p.handle)}</g:link>
<g:image_link>${SITE.url}${img[0]}</g:image_link>
${img.slice(1, 5).map((i) => `<g:additional_image_link>${SITE.url}${i}</g:additional_image_link>`).join('\n')}
<g:availability>in_stock</g:availability>
${list && list > price ? `<g:price>${list.toFixed(2)} INR</g:price>\n<g:sale_price>${price.toFixed(2)} INR</g:sale_price>` : `<g:price>${price.toFixed(2)} INR</g:price>`}
<g:condition>new</g:condition>
${p.brand ? `<g:brand>${esc(p.brand)}</g:brand>` : ''}
${p.gtin ? `<g:gtin>${esc(p.gtin)}</g:gtin>` : '<g:identifier_exists>no</g:identifier_exists>'}
<g:google_product_category>${esc((p.category && GCAT[p.category]) || DEFAULT_CAT)}</g:google_product_category>
<g:product_type>${esc(p.category ?? 'Pet supplies')}</g:product_type>
${p.family ? `<g:item_group_id>${esc(p.family)}</g:item_group_id>` : ''}
${p.pack_size ? `<g:product_detail><g:attribute_name>Pack size</g:attribute_name><g:attribute_value>${esc(p.pack_size)}</g:attribute_value></g:product_detail>` : ''}
<g:shipping><g:country>IN</g:country><g:region>Karnataka</g:region><g:service>Standard</g:service><g:price>${price >= 3000 ? '0.00' : '100.00'} INR</g:price></g:shipping>
</item>`.replace(/\n{2,}/g, '\n');
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Mylopaws Pet Pharmacy</title>
<link>${SITE.url}/shopping/</link>
<description>Pet care products from Mylopaws, delivered in Bangalore</description>
${rows.join('\n')}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } });
}
