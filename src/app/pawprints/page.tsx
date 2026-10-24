import Link from 'next/link';
import { CtaBand, JsonLd, PageHero } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { CATEGORIES, postsIn, type CategorySlug } from '@/lib/posts';
import { bookLink } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Pawprints: Pet Care Blog for Bangalore Pawfamilies',
  description: 'Travel guides, skin and fur care, and new pet parent advice for Bangalore dog and cat owners, from the Mylopaws team.',
  path: '/pawprints/',
});

export default function PawprintsPage() {
  const cats = Object.keys(CATEGORIES) as CategorySlug[];
  return (
    <>
      <PageHero crumbs={[{ label: 'Pawprints' }]} eyebrow="The Mylopaws blog" title={<>Paw<em>prints.</em></>} lead="Guides and honest advice for Bangalore’s pet families: from a puppy’s first day to outstation road trips and skin health.">
        <div className="btn-row">
          {cats.map((c) => <a key={c} className="btn btn-ghost" href={`#${c}`}>{CATEGORIES[c].name}</a>)}
        </div>
      </PageHero>
      {cats.map((c, i) => {
        const list = postsIn(c);
        const [first, ...rest] = list;
        return (
          <section key={c} id={c} className={`section${i % 2 ? ' alt' : ''}`}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <div className="eyebrow">{list.length} articles</div>
                  <h2>{CATEGORIES[c].name}</h2>
                </div>
                <p className="lead">{CATEGORIES[c].blurb} <Link href={`/category/${c}/`}>View all <Arrow size={14} className="" /></Link></p>
              </div>
              <div className="grid grid-3">
                {first && (
                  <Link className="card mag" href={`/${first.slug}/`} style={{ gridRow: 'span 2' }}>
                    <span className="tag y">{c === 'new-pet-parent' ? 'Start here' : 'Featured'}</span>
                    <h3 style={{ fontSize: '1.7rem' }}>{first.title}</h3>
                    <p>{first.excerpt}</p>
                    <span className="more" style={{ color: 'var(--yellow)' }}>{first.readMins} min read <Arrow size={14} /></span>
                  </Link>
                )}
                {rest.map((p, j) => (
                  <Link key={p.slug} className="card" href={`/${p.slug}/`}>
                    {c === 'new-pet-parent' && <span className="num">Step {j + 2}</span>}
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="more">{p.readMins} min read <Arrow size={14} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <CtaBand title={<>Reading is good. <em>Booking</em> is better.</>} text="Pet cabs, skin and fur therapies, cat stays and a pet pharmacy, a WhatsApp message away." href={bookLink('general')} label="Chat on WhatsApp" />
      <JsonLd data={breadcrumbSchema([{ name: 'Pawprints', path: '/pawprints/' }])} />
    </>
  );
}
