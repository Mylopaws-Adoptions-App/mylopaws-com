import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd, PageHero } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { CATEGORIES, postsIn, type CategorySlug } from '@/lib/posts';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((cat) => ({ cat }));
}

type Props = { params: Promise<{ cat: string }> };

export async function generateMetadata({ params }: Props) {
  const { cat } = await params;
  const c = CATEGORIES[cat as CategorySlug];
  if (!c) return {};
  return meta({ title: `${c.name}: Pet Care Guides for Bangalore | Pawprints`.slice(0, 65), description: c.blurb, path: `/category/${cat}/` });
}

export default async function CategoryPage({ params }: Props) {
  const { cat } = await params;
  const c = CATEGORIES[cat as CategorySlug];
  if (!c) notFound();
  const list = postsIn(cat as CategorySlug);
  return (
    <>
      <PageHero crumbs={[{ href: '/pawprints/', label: 'Pawprints' }, { label: c.name }]} eyebrow="Pawprints" title={c.name} lead={c.blurb} />
      <section className="section">
        <h2 className="sr-only">Articles in {c.name}</h2>
        <div className="wrap grid grid-3">
          {list.map((p, i) => (
            <Link key={p.slug} className="card" href={`/${p.slug}/`}>
              {cat === 'new-pet-parent' && <span className="num">Step {i + 1}</span>}
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="more">{p.readMins} min read <Arrow size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: 'Pawprints', path: '/pawprints/' }, { name: c.name, path: `/category/${cat}/` }])} />
    </>
  );
}
