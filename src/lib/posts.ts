import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export const CATEGORIES = {
  travel: { name: 'Travel', blurb: 'Pet cabs, airport runs, outstation road trips and pet-friendly getaways from Bangalore, with checklists to keep your dog or cat calm.', vertical: 'travel' as const },
  'skin-fur-care': { name: 'Skin & Fur Care', blurb: 'Tick season, itching, hair fall, neem therapy and monsoon skin care: practical skin and fur guides for Bangalore dogs and cats.', vertical: 'dermacare' as const },
  'new-pet-parent': { name: 'Mylopaws Cares', blurb: 'Your first year with a new puppy in Bangalore, step by step: the first day, vaccinations, potty training, bathing and socialising.', vertical: 'general' as const },
} as const;
export type CategorySlug = keyof typeof CATEGORIES;

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: CategorySlug;
  order?: number;
  featured?: boolean;
  readMins: number;
  html: string;
  faq?: { q: string; a: string }[];
};

const DIR = path.join(process.cwd(), 'content', 'posts');

/** YAML turns 2026-10-23 into a Date; keep plain YYYY-MM-DD strings. */
export const ymd = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
let cache: Post[] | null = null;

marked.use({ gfm: true });

function load(): Post[] {
  if (cache) return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
  cache = files
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).filter(Boolean).length;
      const slug = f.replace(/\.md$/, '');
      if (!(data.category in CATEGORIES)) throw new Error(`${f}: unknown category ${data.category}`);
      return {
        slug,
        title: String(data.title),
        seoTitle: String(data.seoTitle ?? data.title),
        description: String(data.description),
        excerpt: String(data.excerpt ?? data.description),
        date: ymd(data.date),
        updated: data.updated ? ymd(data.updated) : undefined,
        category: data.category as CategorySlug,
        order: data.order ? Number(data.order) : undefined,
        featured: Boolean(data.featured),
        readMins: Math.max(3, Math.round(words / 220)),
        // External links open safely; internal links stay relative.
        html: (marked.parse(content) as string).replace(/<a href="(https?:\/\/(?!mylopaws\.com)[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"'),
        faq: Array.isArray(data.faq) ? data.faq : undefined,
      } satisfies Post;
    })
    .sort((a, b) => (a.date !== b.date ? (a.date < b.date ? 1 : -1) : Number(b.featured) - Number(a.featured) || a.slug.localeCompare(b.slug)));
  return cache;
}

export const allPosts = () => load();
export const postBySlug = (slug: string) => load().find((p) => p.slug === slug);
export const postsIn = (cat: CategorySlug) => {
  const list = load().filter((p) => p.category === cat);
  return cat === 'new-pet-parent' ? [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)) : list;
};
export const fmtDate = (d: string) => new Date(d + 'T00:00:00+05:30').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
