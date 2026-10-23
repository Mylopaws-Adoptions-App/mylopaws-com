import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CtaBand, Faq, JsonLd, PageHero, faqSchema } from '@/components/Blocks';
import { Arrow, Clock, Leaf, Car } from '@/components/Icons';
import { THERAPIES, therapyBySlug, type Therapy } from '@/lib/therapies';
import { TRAVEL, travelBySlug, type TravelService } from '@/lib/travel';
import { allPosts, postBySlug, CATEGORIES, fmtDate, type Post } from '@/lib/posts';
import { SITE, appLink } from '@/lib/site';
import { breadcrumbSchema, meta, serviceSchema } from '@/lib/seo';

// Old WordPress pages and posts all lived at the site root: /<slug>/. One route serves them all.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...THERAPIES.map((t) => t.slug), ...TRAVEL.map((t) => t.slug), ...allPosts().map((p) => p.slug)].map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = therapyBySlug(slug);
  if (t) return meta({ title: t.title, description: t.description, path: `/${slug}/` });
  const tr = travelBySlug(slug);
  if (tr) return meta({ title: tr.title, description: tr.description, path: `/${slug}/` });
  const p = postBySlug(slug);
  if (p) return meta({ title: p.seoTitle, description: p.description, path: `/${slug}/`, type: 'article', published: p.date });
  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const t = therapyBySlug(slug);
  if (t) return <TherapyPage t={t} />;
  const tr = travelBySlug(slug);
  if (tr) return <TravelPage t={tr} />;
  const p = postBySlug(slug);
  if (p) return <PostPage p={p} />;
  notFound();
}

function RelatedPosts({ slugs }: { slugs: string[] }) {
  const posts = slugs.map(postBySlug).filter(Boolean) as Post[];
  if (!posts.length) return null;
  return (
    <section className="section tight">
      <div className="wrap">
        <div className="eyebrow">Read on Pawprints</div>
        <div className="grid grid-3" style={{ marginTop: 8 }}>
          {posts.map((p) => (
            <Link key={p.slug} className="card" href={`/${p.slug}/`}>
              <span className="tag">{CATEGORIES[p.category].name}</span>
              <h3>{p.title}</h3>
              <span className="more">{p.readMins} min read <Arrow size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TherapyPage({ t }: { t: Therapy }) {
  const others = (t.suitsWith ?? []).map(therapyBySlug).filter(Boolean) as Therapy[];
  return (
    <>
      <PageHero
        crumbs={[{ href: '/dermacare/', label: 'Dermacare' }, { label: t.name }]}
        eyebrow="Mylopaws Dermacare therapy"
        title={t.name}
        lead={t.intro}
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={appLink('dermacare')}>Book this therapy <Arrow /></a>
          <Link className="btn btn-ghost" href="/dermacare/">All therapies</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Is this for your pet?</div>
            <h2>Signs it may <em>help.</em></h2>
            <ul className="ticks">{t.signs.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="card">
            <Leaf size={30} />
            <h3>At a glance</h3>
            <p><strong>Session:</strong> {t.duration}</p>
            <p><strong>How often:</strong> {t.rhythm}</p>
            <p><strong>Where:</strong> Our salon in HSR Layout, or at your door in many areas of Bangalore.</p>
            <p><strong>Price:</strong> Quoted on WhatsApp after a quick chat about your pet.</p>
          </div>
        </div>
      </section>

      <section className="section ink pattern">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">The experience</div>
              <h2>Three phases, <em>one</em> specialist.</h2>
            </div>
            <p className="lead">Our protocols are our own and refined over hundreds of sessions. Here is what your pet goes through, in brief.</p>
          </div>
          <div className="steps">
            {t.phases.map((ph) => (
              <div className="step" key={ph.name}><div><h3>{ph.name}</h3><p>{ph.text}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <div className="eyebrow">What to expect</div>
            <h2>After the <em>session.</em></h2>
            <ul className="ticks">{t.expect.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <div className="eyebrow">Questions</div>
            <Faq items={t.faq} />
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section tight alt">
          <div className="wrap">
            <div className="eyebrow">Often paired with</div>
            <div className="grid grid-2" style={{ marginTop: 8 }}>
              {others.map((o) => (
                <Link key={o.slug} className="card" href={`/${o.slug}/`}>
                  <h3>{o.name}</h3>
                  <p>{o.short}</p>
                  <span className="more">Learn more <Arrow size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedPosts slugs={t.posts ?? []} />
      <CtaBand
        title={<>Book {t.name.split(' ').slice(0, 3).join(' ')} <em>today.</em></>}
        text="Book on the Mylopaws app and our Dermacare team confirms the slot, and your quote, on WhatsApp."
        href={appLink('dermacare')}
        label="Book on the app"
        secondary={{ href: '/dermacare/', label: 'Compare therapies' }}
      />
      <JsonLd
        data={[
          serviceSchema(t.name, `/${t.slug}/`, t.description, `${SITE.url}/dermacare/#business`),
          faqSchema(t.faq),
          breadcrumbSchema([{ name: 'Dermacare', path: '/dermacare/' }, { name: t.name, path: `/${t.slug}/` }]),
        ]}
      />
    </>
  );
}

function TravelPage({ t }: { t: TravelService }) {
  const siblings = TRAVEL.filter((x) => x.slug !== t.slug);
  return (
    <>
      <PageHero crumbs={[{ href: '/travel/', label: 'Travel' }, { label: t.name }]} eyebrow="Mylopaws Travel" title={t.name} lead={t.intro}>
        <div className="btn-row">
          <a className="btn btn-primary" href={appLink('travel')}>Book a pet cab <Arrow /></a>
          <Link className="btn btn-ghost" href="/travel/">All Travel services</Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="wrap">
          <div className="grid grid-2">
            {t.points.map((pt, i) => (
              <div className="card" key={pt.h}>
                <span className="num">0{i + 1}</span>
                <h3>{pt.h}</h3>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Popular for</div>
            <h2>Trips we <em>run</em> every week.</h2>
            <ul className="ticks">{t.forWho.map((s) => <li key={s}>{s}</li>)}</ul>
            <p className="muted" style={{ marginTop: 24, display: 'flex', gap: 10, alignItems: 'center' }}><Clock /> Every day, 6 am to midnight</p>
          </div>
          <div>
            <div className="eyebrow">Questions</div>
            <Faq items={t.faq} />
          </div>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap">
          <div className="eyebrow">More from Travel</div>
          <div className="grid grid-3" style={{ marginTop: 8 }}>
            {siblings.map((s) => (
              <Link key={s.slug} className="card" href={`/${s.slug}/`}>
                <Car size={28} />
                <h3>{s.name}</h3>
                <p>{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <RelatedPosts slugs={t.posts} />
      <CtaBand
        title={<>Ready when <em>you</em> are.</>}
        text="Book on the Mylopaws app. We confirm the route, timing and quote on WhatsApp."
        href={appLink('travel')}
        label="Book a pet cab"
      />
      <JsonLd data={[serviceSchema(t.name, `/${t.slug}/`, t.description, `${SITE.url}/travel/#service`), faqSchema(t.faq), breadcrumbSchema([{ name: 'Travel', path: '/travel/' }, { name: t.name, path: `/${t.slug}/` }])]} />
    </>
  );
}

function PostPage({ p }: { p: Post }) {
  const cat = CATEGORIES[p.category];
  const more = allPosts().filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const vertical = cat.vertical;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    mainEntityOfPage: `${SITE.url}/${p.slug}/`,
    author: { '@type': 'Organization', name: 'Mylopaws', url: SITE.url },
    publisher: { '@id': `${SITE.url}/#org` },
    articleSection: cat.name,
    inLanguage: 'en-IN',
  };
  return (
    <>
      <PageHero crumbs={[{ href: '/pawprints/', label: 'Pawprints' }, { href: `/category/${p.category}/`, label: cat.name }]} eyebrow={cat.name} title={p.title} long>
        <div className="post-meta">
          <span>{fmtDate(p.updated ?? p.date)}</span><span aria-hidden="true">·</span><span>{p.readMins} min read</span><span aria-hidden="true">·</span><span>By the Mylopaws team</span>
        </div>
      </PageHero>
      <section className="section tight">
        <div className="wrap post-layout">
          <article className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
          <aside className="post-aside">
            {vertical === 'travel' && (
              <div className="card mag">
                <h3>Need a pet cab?</h3>
                <p>Dedicated pet-friendly cabs across Bangalore and outstation, 6 am to midnight.</p>
                <a className="btn btn-yellow" href={appLink('travel')}>Book Travel</a>
              </div>
            )}
            {vertical === 'dermacare' && (
              <div className="card mag">
                <h3>Skin trouble?</h3>
                <p>12 specialist skin and fur therapies at our HSR Layout salon or at your door.</p>
                <a className="btn btn-yellow" href={appLink('dermacare')}>Book Dermacare</a>
              </div>
            )}
            {vertical === 'general' && (
              <div className="card mag">
                <h3>New pet parent?</h3>
                <p>Gentle puppy grooming, pet cabs to the vet, and a pet pharmacy that delivers.</p>
                <a className="btn btn-yellow" href={appLink('general')}>Open the app</a>
              </div>
            )}
            {more.length > 0 && (
              <div className="card flat">
                <h3>More in {cat.name}</h3>
                {more.map((m) => (
                  <Link key={m.slug} href={`/${m.slug}/`} style={{ fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.4 }}>{m.title}</Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
      {p.faq && p.faq.length > 0 && (
        <section className="section tight alt">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="eyebrow">Quick answers</div>
            <Faq items={p.faq} />
          </div>
        </section>
      )}
      <JsonLd data={[article, breadcrumbSchema([{ name: 'Pawprints', path: '/pawprints/' }, { name: cat.name, path: `/category/${p.category}/` }, { name: p.title, path: `/${p.slug}/` }]), ...(p.faq?.length ? [faqSchema(p.faq)] : [])]} />
    </>
  );
}
