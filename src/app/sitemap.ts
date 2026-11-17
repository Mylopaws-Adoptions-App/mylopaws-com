import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { THERAPIES } from '@/lib/therapies';
import { TRAVEL } from '@/lib/travel';
import { allPosts, CATEGORIES } from '@/lib/posts';
import { allProducts, collections, isRx, productPath, sell } from '@/lib/shop';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await allProducts();
  const now = new Date('2026-11-05');
  const u = (p: string, priority: number, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({ url: `${SITE.url}${p}`, lastModified, priority });
  return [
    u('/', 1),
    u('/travel/', 0.9), u('/dermacare/', 0.9), u('/homes/', 0.8), u('/shopping/', 0.7),
    ...TRAVEL.map((t) => u(`/${t.slug}/`, 0.8)),
    ...THERAPIES.map((t) => u(`/${t.slug}/`, 0.8)),
    ...collections(products).map((c) => u(`/shopping/collections/${c.slug}/`, 0.6)),
    ...products.filter((p) => !isRx(p) && sell(p)).map((p) => u(productPath(p.handle), 0.5)),
    u('/pawprints/', 0.7),
    ...Object.keys(CATEGORIES).map((c) => u(`/category/${c}/`, 0.5)),
    ...allPosts().map((p) => u(`/${p.slug}/`, 0.6, new Date(p.updated ?? p.date))),
    u('/bangalore-pet-sitters-directory/', 0.5),
    u('/about/', 0.5), u('/contact/', 0.6), u('/work-with-us/', 0.5),
    ...['privacy-policy', 'terms-of-service', 'cancellation-refund-policy', 'shipping-delivery-policy', 'data-deletion'].map((s) => u(`/${s}/`, 0.2)),
  ];
}
