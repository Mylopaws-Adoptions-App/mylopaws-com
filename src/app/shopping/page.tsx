import Link from 'next/link';
import { CtaBand, JsonLd, PageHero } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { SHOP_WHATSAPP, SUPABASE, appLink, waLink } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const revalidate = 3600; // catalogue refreshes hourly from Supabase

export const metadata = meta({
  title: 'Mylopaws Pet Pharmacy & Shop: Delivered in Bangalore',
  description: 'Tick and flea care, supplements, shampoos, food and vet-prescribed medicines, delivered across Bangalore. Order from the Mylopaws pet pharmacy on WhatsApp.',
  path: '/shopping/',
});

type Product = { handle: string; title: string; category: string | null; image_url: string | null; rx_required: boolean | null };

async function catalogue(): Promise<Product[]> {
  try {
    const url = `${SUPABASE.url}/rest/v1/shop_products?select=handle,title,category,image_url,rx_required&available=eq.true&in_stock=eq.true&category=neq.Vaccines&order=category.asc,title.asc`;
    const res = await fetch(url, { headers: { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` }, next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return (await res.json()) as Product[];
  } catch {
    return [];
  }
}

export default async function ShoppingPage() {
  const items = await catalogue();
  const order = (h: string) => (SHOP_WHATSAPP ? waLink(SHOP_WHATSAPP, `Hi Mylopaws, I'd like to order: ${h}`) : appLink('general'));
  const byCat = new Map<string, Product[]>();
  for (const p of items) {
    const c = p.category ?? 'Other';
    if (!byCat.has(c)) byCat.set(c, []);
    byCat.get(c)!.push(p);
  }
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Shop' }]}
        eyebrow="Mylopaws pet pharmacy"
        title={<>The pet pharmacy that <em>delivers.</em></>}
        lead="Tick and flea care, supplements, shampoos, food and vet-prescribed medicines, delivered across Bangalore or ready to collect from HSR Layout. Order and ask questions on WhatsApp."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={SHOP_WHATSAPP ? waLink(SHOP_WHATSAPP, 'Hi Mylopaws, I want to order for my pet.') : appLink('general')}>Order on WhatsApp <Arrow /></a>
          <a className="btn btn-ghost" href="#catalogue">Browse {items.length ? `${items.length} products` : 'the catalogue'}</a>
        </div>
      </PageHero>
      <section className="section tight alt">
        <h2 className="sr-only">How ordering works</h2>
        <div className="wrap grid grid-3">
          <div className="card flat"><h3>Delivered across Bangalore</h3><p>Evening delivery runs, or free pickup from our HSR Layout store. See our <Link href="/shipping-delivery-policy/">delivery policy</Link>.</p></div>
          <div className="card flat"><h3>Prescription medicines</h3><p>Prescription-only products need a valid vet prescription, which you share on WhatsApp before payment.</p></div>
          <div className="card flat"><h3>Prices on request</h3><p>Ask on WhatsApp for today&rsquo;s price. We aim to beat the big apps on everything we stock.</p></div>
        </div>
      </section>
      <section className="section" id="catalogue">
        <div className="wrap">
          {items.length === 0 && <p className="lead">Our catalogue is updating. Message us on WhatsApp for what you need.</p>}
          {[...byCat.entries()].map(([cat, list]) => (
            <div key={cat} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: '1.7rem' }}>{cat} <span className="muted" style={{ fontSize: '1rem', fontFamily: 'var(--body)' }}>({list.length})</span></h2>
              <div className="grid grid-4">
                {list.map((p) => (
                  <a key={p.handle} className="card" style={{ padding: 16 }} href={order(p.title)}>
                    {p.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.title} loading="lazy" width={240} height={240} style={{ width: '100%', aspectRatio: '1', objectFit: 'contain', background: '#fff', borderRadius: 12 }} />
                    )}
                    <h3 style={{ fontSize: '1rem', fontFamily: 'var(--body)', fontWeight: 500 }}>{p.title}</h3>
                    {p.rx_required && <span className="tag y">Prescription needed</span>}
                    <span className="more">Order <Arrow size={14} /></span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title={<>Can&rsquo;t find it? <em>Ask us.</em></>} text="We can usually source what your vet prescribes within a day or two." href={SHOP_WHATSAPP ? waLink(SHOP_WHATSAPP, 'Hi Mylopaws, can you get this for my pet?') : appLink('general')} label="Message the pharmacy" />
      <JsonLd data={breadcrumbSchema([{ name: 'Shop', path: '/shopping/' }])} />
    </>
  );
}
