import Link from 'next/link';
import { Suspense } from 'react';
import { CtaBand, Faq, JsonLd, PageHero, QuickAnswer, faqSchema } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { Reveal } from '@/components/Motion';
import { BundleCard, type BundleView } from '@/components/shop/BundleCard';
import { ListView } from '@/components/shop/ProductBuy';
import { ProductCard } from '@/components/shop/ProductCard';
import { ShopBrowser } from '@/components/shop/ShopBrowser';
import { allProducts, bundles, brandList, collections, imagesOf, isRx, sell, mrp, shopLink, slugify, toCard, vaccineLink, vetLink, CONCERNS, HOME_CONCERNS } from '@/lib/shop';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const revalidate = 900; // catalogue refreshes from Supabase every 15 minutes

export const metadata = meta({
  title: 'Mylopaws Shopping: Pet Food, Grooming & Care in Bangalore',
  description: 'Everything your dog or cat needs: food, treats, grooming, hygiene, tick and flea care, supplements and vet medicines. Free delivery over ₹3,000 in Bangalore.',
  path: '/shopping/',
});

const FAQ = [
  { q: 'Is delivery free?', a: 'Delivery is free across Bangalore on orders of ₹3,000 or more, and ₹100 below that. Pickup from our HSR Layout store is always free.' },
  { q: 'Do I need an account to order?', a: 'No. Check out as a guest with your name and mobile number. We send order updates on WhatsApp.' },
  { q: 'How do prescription medicines work?', a: 'Prescription-only products need a valid vet prescription. You upload a photo or PDF at checkout before paying, and our team checks it before packing. No prescription? Our vet, Dr Amrita, can consult on WhatsApp for ₹650.' },
  { q: 'Do you sell vaccines?', a: 'Vaccines are not sold online because they need cold-chain storage and a vet to administer them. Message us on WhatsApp and we will arrange the vaccination for your dog or cat.' },
  { q: 'When will my order arrive?', a: 'We run one delivery across Bangalore each evening (5 to 8 pm, Monday to Saturday). Orders paid before 1 pm go out the same evening.' },
  { q: 'Are the products genuine?', a: 'Yes. We source from the brands and their authorised distributors, and check expiry before packing.' },
];

export default async function ShoppingPage() {
  const [items, bs] = await Promise.all([allProducts(), bundles()]);
  const byHandle = new Map(items.map((p) => [p.handle, p]));
  const cards = items.map(toCard);
  const picks = items.filter((p) => p.featured && sell(p)).slice(0, 8);
  const best = items.filter((p) => p.bestseller && sell(p) && !picks.includes(p)).slice(0, 8);
  const conCount = new Map<string, number>();
  for (const p of items) for (const c of p.concerns ?? []) if (CONCERNS[c]) conCount.set(c, (conCount.get(c) ?? 0) + 1);
  const concernCounts = [...conCount.entries()].sort((a, b) => b[1] - a[1]);
  const brands = brandList(items).slice(0, 12);
  const bundleViews: BundleView[] = bs.map((b) => ({
    slug: b.slug, title: b.title, blurb: b.blurb, disc: b.discount_pct,
    items: b.items.map((i) => { const p = byHandle.get(i.handle); return p && sell(p) ? { title: p.title, qty: i.qty, price: sell(p)!, mrp: mrp(p), img: imagesOf(p)[0] ?? '' } : null; }).filter((x): x is NonNullable<typeof x> => !!x),
  })).filter((b) => b.items.length === bs.find((x) => x.slug === b.slug)!.items.length && b.items.length > 0);
  const cols = collections(items);
  void cols;

  return (
    <>
      <PageHero
        sol="shopping"
        crumbs={[{ label: 'Shopping' }]}
        eyebrow="Mylopaws Shopping"
        title={<>Everything your pet needs, <em>delivered.</em></>}
        lead="Food and treats, grooming, hygiene, tick and flea care, supplements and vet medicines from brands you trust. Free delivery over ₹3,000 across Bangalore, or free pickup from HSR Layout."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href="#catalogue">Shop now <Arrow /></a>
          <a className="btn btn-ghost" href={shopLink('Hi Mylopaws, I need help choosing for my pet.')}>Ask on WhatsApp</a>
        </div>
      </PageHero>
      <QuickAnswer q="Where can I buy pet supplies with delivery in Bangalore?">Mylopaws Shopping is a one-stop pet store that delivers across Bangalore (free over ₹3,000) or is ready to collect free from HSR Layout: food and treats, grooming and hygiene, tick and flea care, supplements and vet medicines. No account needed, and updates come on WhatsApp.</QuickAnswer>

      <section className="section tight">
        <h2 className="sr-only">Why shop with Mylopaws</h2>
        <div className="wrap trustrow">
          <div><b>Free delivery over ₹3,000</b><span>₹100 below that, across Bangalore</span></div>
          <div><b>Free HSR Layout pickup</b><span>Collect when we message you</span></div>
          <div><b>Vet-checked prescriptions</b><span>Upload before you pay</span></div>
          <div><b>Secure checkout</b><span>UPI, cards, netbanking via Razorpay</span></div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2>Shop by concern</h2>
          <div className="tiles">
            {HOME_CONCERNS.filter((c) => conCount.has(c)).map((c) => (
              <Reveal key={c}><Link className="tile" href={`/shopping/collections/${c}/`}><b>{CONCERNS[c].label}</b><span>{conCount.get(c)} products</span></Link></Reveal>
            ))}
          </div>
          <div className="pets-row">
            <Link className="btn btn-ghost" href="/shopping/collections/dogs/">Shop for dogs</Link>
            <Link className="btn btn-ghost" href="/shopping/collections/cats/">Shop for cats</Link>
          </div>
        </div>
      </section>

      {picks.length > 0 && (
        <section className="section tight alt">
          <div className="wrap"><h2>Our picks</h2><div className="sp-grid">{picks.map((p) => <ProductCard key={p.handle} p={toCard(p)} list="Our picks" />)}</div></div>
        </section>
      )}
      {best.length > 0 && (
        <section className="section tight">
          <div className="wrap"><h2>Bestsellers</h2><div className="sp-grid">{best.map((p) => <ProductCard key={p.handle} p={toCard(p)} list="Bestsellers" />)}</div></div>
        </section>
      )}
      {bundleViews.length > 0 && (
        <section className="section tight mint">
          <div className="wrap"><h2>Bundles that save</h2><p className="muted">Everything you need in one go, with a bundle discount.</p><div className="bundles">{bundleViews.map((b) => <BundleCard key={b.slug} b={b} />)}</div></div>
        </section>
      )}

      <section className="section tight">
        <div className="wrap vetstrip">
          <div><h2>Need a vaccination?</h2><p>Vaccines are not sold online. Message us on WhatsApp and we will arrange the right vaccine for your dog or cat.</p></div>
          <a className="btn btn-yellow" href={vaccineLink()}>Book a vaccine on WhatsApp</a>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap vetstrip">
          <div><h2>Talk to our vet</h2><p>Not sure what your pet needs, or need a prescription? Dr Amrita is on WhatsApp every day. Consults are ₹650.</p></div>
          <a className="btn btn-yellow" href={vetLink()}>Talk to our vet</a>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2>Shop by brand</h2>
          <div className="chiprow wrapchips">{brands.map(([b, n]) => <Link key={b} className="chip" href={n >= 2 ? `/shopping/collections/brand-${slugify(b)}/` : '/shopping/#catalogue'} aria-pressed={false}>{b}<small>{n}</small></Link>)}</div>
        </div>
      </section>

      <section id="shop" style={{ paddingBottom: 'clamp(40px, 6vw, 72px)' }}>
        <div className="wrap"><h2 style={{ marginBottom: 14 }}>All products</h2></div>
        {items.length === 0 ? (
          <div className="wrap"><div className="empty">Our catalogue is updating. Message us for what you need.</div></div>
        ) : (
          <Suspense fallback={<div className="wrap"><div className="empty">Loading the shop...</div></div>}>
            <ShopBrowser items={cards} concernCounts={concernCounts} />
          </Suspense>
        )}
      </section>

      <section className="section tight alt"><div className="wrap"><h2>Shopping FAQs</h2><Faq items={FAQ} /></div></section>
      <CtaBand title={<>Can&rsquo;t find it? <em>Ask us.</em></>} text="Tell us what you need. If it is not on the shop yet, we can usually source it within a day or two." href={shopLink('Hi Mylopaws, can you get this for my pet?')} label="Message the shop" />
      <ListView items={picks.map((p) => ({ item_id: p.handle, item_name: p.title, price: sell(p) ?? 0 }))} name="Our picks" />
      <JsonLd data={[breadcrumbSchema([{ name: 'Shopping', path: '/shopping/' }]), faqSchema(FAQ)]} />
    </>
  );
}
void isRx;
