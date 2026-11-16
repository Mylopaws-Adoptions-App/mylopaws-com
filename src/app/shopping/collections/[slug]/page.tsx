import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CtaBand, JsonLd, PageHero } from '@/components/Blocks';
import { ListView } from '@/components/shop/ProductBuy';
import { ProductCard } from '@/components/shop/ProductCard';
import { allProducts, collections, isRx, productPath, shopLink, toCard, CONCERNS } from '@/lib/shop';
import { breadcrumbSchema, meta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 900;
type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return collections(await allProducts()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = collections(await allProducts()).find((x) => x.slug === slug);
  if (!c) return {};
  return meta({ title: `${c.title} | Mylopaws`, description: c.blurb.slice(0, 155), path: `/shopping/collections/${slug}/` });
}

export default async function Collection({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const all = await allProducts();
  const c = collections(all).find((x) => x.slug === slug);
  if (!c) notFound();
  const items = all.filter(c.filter).sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller) || (a.sort_rank ?? 100) - (b.sort_rank ?? 100) || a.title.localeCompare(b.title));
  const related = Object.keys(CONCERNS).filter((k) => k !== slug && all.some((p) => (p.concerns ?? []).includes(k))).slice(0, 8);
  const cards = items.map(toCard);
  return (
    <>
      <PageHero sol="shopping" crumbs={[{ href: '/shopping/', label: 'Shopping' }, { label: c.h1 }]} eyebrow="Mylopaws Shopping" title={<>{c.h1}</>} lead={c.blurb} />
      <section className="section tight">
        <div className="wrap">
          <p className="muted small">{items.length} products. Free delivery over ₹3,000 across Bangalore, free pickup from HSR Layout. {items.some(isRx) && 'Prescription medicines need a vet prescription at checkout.'}</p>
          <div className="sp-grid">{cards.slice(0, 96).map((p) => <ProductCard key={p.h} p={p} list={c.h1} />)}</div>
          {cards.length > 96 && <p className="more-row"><Link className="btn btn-ghost" href="/shopping/#catalogue">Browse all in the shop</Link></p>}
          <div className="chiprow wrapchips" style={{ marginTop: 32 }}>
            {related.map((k) => <Link key={k} className="chip" href={`/shopping/collections/${k}/`} aria-pressed={false}>{CONCERNS[k].label}</Link>)}
          </div>
        </div>
      </section>
      <CtaBand title={<>Not sure what to pick? <em>Ask us.</em></>} text="Tell us about your pet and we will suggest the right product, or connect you to our vet." href={shopLink(`Hi Mylopaws, I need help choosing ${c.h1.toLowerCase()} products.`)} label="Message the pharmacy" />
      <ListView items={items.slice(0, 20).map((p) => ({ item_id: p.handle, item_name: p.title }))} name={c.h1} />
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Shopping', path: '/shopping/' }, { name: c.h1, path: `/shopping/collections/${slug}/` }]),
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.title, url: `${SITE.url}/shopping/collections/${slug}/`, mainEntity: { '@type': 'ItemList', itemListElement: items.filter((p) => !isRx(p)).slice(0, 30).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}${productPath(p.handle)}`, name: p.title })) } },
      ]} />
    </>
  );
}
