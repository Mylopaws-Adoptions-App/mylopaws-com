import Link from 'next/link';
import { CtaBand, JsonLd, PageHero } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { Reveal } from '@/components/Motion';
import { ShopCatalogue } from '@/components/ShopCatalogue';
import { SHOP_WHATSAPP, appLink, waLink } from '@/lib/site';
import { catalogue, shopLink } from '@/lib/shop';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const revalidate = 3600; // catalogue refreshes hourly from Supabase

export const metadata = meta({
  title: 'Mylopaws Pet Pharmacy & Shop: Delivered in Bangalore',
  description: 'Tick and flea care, supplements, shampoos, food and vet-prescribed medicines, delivered across Bangalore. Order from the Mylopaws pet pharmacy.',
  path: '/shopping/',
});

export default async function ShoppingPage() {
  const items = await catalogue();
  const orderBase = SHOP_WHATSAPP ? waLink(SHOP_WHATSAPP) : appLink('shopping');
  return (
    <>
      <PageHero
        sol="shopping"
        crumbs={[{ label: 'Shopping' }]}
        eyebrow="Mylopaws Shopping"
        title={<>The pet pharmacy that <em>delivers.</em></>}
        lead="Tick and flea care, supplements, shampoos, food and vet-prescribed medicines, delivered across Bangalore or ready to collect from HSR Layout."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={shopLink('Hi Mylopaws, I want to order for my pet.')}>Order now <Arrow /></a>
          <a className="btn btn-ghost" href="#catalogue">Browse {items.length ? `${items.length} products` : 'the catalogue'}</a>
        </div>
      </PageHero>
      <section className="section tight">
        <h2 className="sr-only">How ordering works</h2>
        <div className="wrap grid grid-3">
          <Reveal className="card flat" delay={0}><span className="tag b">Delivery</span><h3>Delivered across Bangalore</h3><p>Batched delivery runs across the city, or free pickup from our HSR Layout store. See our <Link href="/shipping-delivery-policy/">delivery policy</Link>.</p></Reveal>
          <Reveal className="card flat" delay={100}><span className="tag g">Prescriptions</span><h3>Vet-prescribed medicines</h3><p>Prescription-only products need a valid vet prescription, which you share with us before payment.</p></Reveal>
          <Reveal className="card flat" delay={200}><span className="tag y">Pricing</span><h3>Prices on request</h3><p>Ask for today&rsquo;s price on anything you see. We aim to beat the big apps on everything we stock.</p></Reveal>
        </div>
      </section>
      <section id="catalogue" style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
        {items.length === 0 ? (
          <div className="wrap"><div className="empty">Our catalogue is updating. Message us for what you need.</div></div>
        ) : (
          <ShopCatalogue items={items} orderBase={orderBase} orderIsWhatsApp={Boolean(SHOP_WHATSAPP)} />
        )}
      </section>
      <CtaBand title={<>Can&rsquo;t find it? <em>Ask us.</em></>} text="We can usually source what your vet prescribes within a day or two." href={shopLink('Hi Mylopaws, can you get this for my pet?')} label="Message the pharmacy" />
      <JsonLd data={breadcrumbSchema([{ name: 'Shopping', path: '/shopping/' }])} />
    </>
  );
}
