import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { THERAPIES } from '@/lib/therapies';
import { TRAVEL } from '@/lib/travel';
import { allPosts, CATEGORIES } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-10-23');
  const u = (p: string, priority: number, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({ url: `${SITE.url}${p}`, lastModified, priority });
  return [
    u('/', 1),
    u('/travel/', 0.9), u('/dermacare/', 0.9), u('/homes/', 0.8), u('/shopping/', 0.7),
    ...TRAVEL.map((t) => u(`/${t.slug}/`, 0.8)),
    ...THERAPIES.map((t) => u(`/${t.slug}/`, 0.8)),
    u('/pawprints/', 0.7),
    ...Object.keys(CATEGORIES).map((c) => u(`/category/${c}/`, 0.5)),
    ...allPosts().map((p) => u(`/${p.slug}/`, 0.6, new Date(p.updated ?? p.date))),
    u('/bangalore-pet-sitters-directory/', 0.5),
    u('/about/', 0.5), u('/contact/', 0.6), u('/careers/', 0.4),
    ...['privacy-policy', 'terms-of-service', 'cancellation-refund-policy', 'shipping-delivery-policy', 'data-deletion'].map((s) => u(`/${s}/`, 0.2)),
  ];
}
