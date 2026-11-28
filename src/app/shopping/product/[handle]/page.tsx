import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CtaBand, JsonLd, PageHero } from '@/components/Blocks';
import { Gallery } from '@/components/shop/Gallery';
import { ProductBuy } from '@/components/shop/ProductBuy';
import { ProductCard } from '@/components/shop/ProductCard';
import { absUrl, allProducts, imagesOf, productDescription, inr, isRx, mrp, productPath, sell, shopLink, toCard, isClothing, sizeRank, listable, vetLink, CONCERNS } from '@/lib/shop';
import { breadcrumbSchema, meta } from '@/lib/seo';
import { CONTACT, SITE } from '@/lib/site';

export const revalidate = 900;
type Params = { handle: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await allProducts();
  return all.filter((p) => p.featured || p.bestseller).slice(0, 80).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const p = (await allProducts()).find((x) => x.handle === handle);
  if (!p) return {};
  const desc = (productDescription(p) || `${p.title} from Mylopaws Shopping, delivered in Bangalore.`).replace(/\s+/g, ' ').slice(0, 150);
  const img = imagesOf(p)[0];
  return meta({
    title: `${p.title} | Buy online in Bangalore`.slice(0, 65), description: `${desc}`.slice(0, 155), path: productPath(handle),
    image: img ? absUrl(img) : undefined, imageAlt: p.title, noindex: isRx(p),
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { handle } = await params;
  const all = await allProducts();
  const p = all.find((x) => x.handle === handle);
  if (!p) notFound();
  const rx = isRx(p);
  const price = sell(p), m = mrp(p);
  const images = imagesOf(p);
  const family = p.family ? all.filter((x) => x.family === p.family) : [p];
  const variants = family.map((x) => ({ handle: x.handle, label: x.variant_label ?? x.pack_size ?? 'Standard', price: sell(x) })).sort((a, b) => (a.price ?? 0) - (b.price ?? 0) || sizeRank(a.label) - sizeRank(b.label));
  const wear = isClothing(p.category);
  const related = wear ? listable(all).filter((x) => isClothing(x.category) && x.family !== p.family).slice(0, 4) : all.filter((x) => x.handle !== p.handle && x.family !== p.family && (x.concerns ?? []).some((c) => (p.concerns ?? []).includes(c)) && (x.pet_type === p.pet_type || x.pet_type === 'both' || p.pet_type === 'both')).slice(0, 4);
  const concerns = (p.concerns ?? []).filter((c) => CONCERNS[c]);
  const about = productDescription(p);
  const url = `${SITE.url}${productPath(handle)}`;

  const schema = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.title, url, sku: p.handle,
    ...(images.length ? { image: images.map(absUrl) } : {}),
    ...(about ? { description: about } : {}),
    ...(p.brand ? { brand: { '@type': 'Brand', name: p.brand } } : {}),
    ...(p.gtin ? { gtin: p.gtin } : {}),
    category: p.category ?? undefined,
    // Mirrors the Merchant feed: sale price as the Offer price, MRP as the strikethrough list price, same stock flag.
    ...(price && !rx ? {
      offers: {
        '@type': 'Offer', url, priceCurrency: 'INR', price: price.toFixed(2),
        ...(m && m > price ? { priceSpecification: { '@type': 'UnitPriceSpecification', priceType: 'https://schema.org/StrikethroughPrice', price: m.toFixed(2), priceCurrency: 'INR' } } : {}),
        availability: p.in_stock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        ...(p.in_store === true ? { availableAtOrFrom: { '@type': 'Place', name: `${SITE.name}, HSR Layout`, address: { '@type': 'PostalAddress', streetAddress: CONTACT.address.street, addressLocality: CONTACT.address.locality, addressRegion: CONTACT.address.region, postalCode: CONTACT.address.postalCode, addressCountry: CONTACT.address.country } } } : {}),
      },
    } : {}),
  };

  return (
    <>
      <PageHero sol="shopping" crumbs={[{ href: '/shopping/', label: 'Shopping' }, ...(p.category ? [{ href: '/shopping/#catalogue', label: p.category }] : []), { label: p.title }]} title={<span className="pdp-title">{p.title}</span>} />
      <section className="section tight">
        <div className="wrap pdp">
          <Gallery images={images} alt={p.title} />
          <div>
            {p.brand && <p className="sp-brand">{p.brand}{p.pack_size ? ` · ${p.pack_size}` : ''}</p>}
            {about && <p className="lead-sm">{about}</p>}
            <ProductBuy handle={p.handle} title={p.title} brand={p.brand} category={p.category} pack={p.pack_size} price={price} mrp={m} img={images[0] ?? ''} rx={rx} variants={variants} varLabel={wear ? 'Size' : 'Pack size'} />
            {p.in_store === true && (
              <div className="pickup">
                <b>Pick up today at Mylopaws, HSR Layout</b>
                <address>{CONTACT.address.street}, {CONTACT.address.locality} {CONTACT.address.postalCode}</address>
                <a href={`https://www.google.com/maps/search/?api=1&query=${CONTACT.address.lat},${CONTACT.address.lng}`} rel="noopener" target="_blank">Open in Google Maps</a>
              </div>
            )}
            <ul className="trust">
              <li>Free delivery over ₹3,000 across Bangalore, otherwise ₹100</li>
              <li>Free pickup from our HSR Layout store</li>
              <li>Genuine products, packed by the Mylopaws team</li>
              <li>Order updates on WhatsApp, no login needed</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section tight alt">
        <div className="wrap pdp-info">
          {(p.benefits?.length ?? 0) > 0 && <div><h2>Key benefits</h2><ul className="ticks">{p.benefits!.map((b) => <li key={b}>{b}</li>)}</ul></div>}
          {p.how_to_use && <div><h2>How to use</h2><p>{p.how_to_use}</p></div>}
          <div>
            <h2>Product details</h2>
            <dl className="specs">
              {p.brand && <><dt>Brand</dt><dd>{p.brand}</dd></>}
              {p.pack_size && <><dt>Pack size</dt><dd>{p.pack_size}</dd></>}
              {p.pet_type && <><dt>For</dt><dd>{p.pet_type === 'both' ? 'Dogs and cats' : p.pet_type === 'dog' ? 'Dogs' : 'Cats'}</dd></>}
              {p.life_stage && p.life_stage !== 'all' && <><dt>Life stage</dt><dd>{p.life_stage[0].toUpperCase() + p.life_stage.slice(1)}</dd></>}
              {p.category && <><dt>Category</dt><dd>{p.category}</dd></>}
              {p.country_of_origin && <><dt>Country of origin</dt><dd>{p.country_of_origin}</dd></>}
              {m && price && <><dt>MRP</dt><dd>{inr(m)} (inclusive of all taxes)</dd></>}
            </dl>
            {concerns.length > 0 && <p className="chiprow wrapchips">{concerns.map((c) => <Link key={c} className="chip" href={`/shopping/collections/${c}/`} aria-pressed={false}>{CONCERNS[c].label}</Link>)}</p>}
          </div>
        </div>
      </section>
      <section className="section tight">
        <div className="wrap vetstrip">
          <div><h2>Not sure this is right for your pet?</h2><p>Talk to our vet, Dr Amrita, on WhatsApp. Consults are ₹650. For anything serious, please see a vet first.</p></div>
          <a className="btn btn-yellow" href={vetLink(p.title)}>Talk to our vet</a>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section tight"><div className="wrap"><h2>You may also like</h2><div className="sp-grid">{related.map((x) => <ProductCard key={x.handle} p={toCard(x)} list="Related" />)}</div></div></section>
      )}
      <CtaBand title={<>Questions about <em>{p.brand ?? 'this product'}</em>?</>} text="Message the Mylopaws Shopping team. We usually reply within the hour." href={shopLink(`Hi Mylopaws, I have a question about ${p.title}.`)} label="Chat on WhatsApp" />
      <JsonLd data={[schema, breadcrumbSchema([{ name: 'Shopping', path: '/shopping/' }, { name: p.title, path: productPath(handle) }])]} />
    </>
  );
}
