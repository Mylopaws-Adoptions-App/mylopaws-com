import Link from 'next/link';
import { CtaBand, PageHero, Slot, JsonLd } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { appLink } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const metadata = meta({
  title: 'About Mylopaws: A Solutions Platform for Pawfamilies',
  description: 'Mylopaws builds practical solutions for Bangalore’s pet parents: pet-friendly cabs, specialist skin and fur care, home-style boarding and a pet pharmacy.',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        eyebrow="About Mylopaws"
        title={<>We started with the <em>everyday</em> problems.</>}
        lead="A cab that refuses your dog. Itching that a bath doesn’t fix. Nobody you trust when you have to travel. Mylopaws exists to solve the ordinary, frustrating parts of raising a pet in Bangalore."
      />
      <section className="section">
        <div className="wrap split">
          <div>
            <div className="eyebrow">What we believe</div>
            <h2>Pets are <em>family.</em> Services should act like it.</h2>
            <p className="lead">We call our customers pawfamilies, because that is how they live. Every Mylopaws service is designed around what a pet and their people actually need, not what is easiest to sell.</p>
            <ul className="ticks" style={{ marginTop: 22 }}>
              <li><strong>Solve the cause.</strong> Skin problems get treated, not perfumed.</li>
              <li><strong>Never refuse a pet.</strong> Our cabs are booked for them, every time.</li>
              <li><strong>Be honest.</strong> If something needs a vet, we say so.</li>
              <li><strong>Stay reachable.</strong> Real people on WhatsApp, before and after every booking.</li>
            </ul>
          </div>
          <Slot caption="Bringing solutions for pawfamilies." />
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">What we do</div>
              <h2>One platform, <em>three</em> verticals.</h2>
            </div>
          </div>
          <div className="grid grid-3">
            <Link className="card" href="/travel/"><span className="num">Travel</span><h3>Pet-friendly cabs</h3><p>City rides, vet visits, airport transfers and outstation trips across India.</p><span className="more">Explore <Arrow size={14} /></span></Link>
            <Link className="card" href="/dermacare/"><span className="num">Dermacare</span><h3>Skin &amp; fur specialists</h3><p>Twelve therapies at our HSR Layout salon and at your door.</p><span className="more">Explore <Arrow size={14} /></span></Link>
            <Link className="card" href="/homes/"><span className="num">Homes</span><h3>Home-style boarding</h3><p>Calm, routine-led stays, starting with cats.</p><span className="more">Explore <Arrow size={14} /></span></Link>
          </div>
          <p className="muted" style={{ marginTop: 24 }}>We also run a <Link href="/shopping/">pet pharmacy and shop</Link> that delivers across Bangalore, and publish free guides on <Link href="/pawprints/">Pawprints</Link>.</p>
        </div>
      </section>
      <CtaBand title={<>Come say <em>hello.</em></>} text="Book a service on the app, or visit our Dermacare salon in HSR Layout." href={appLink('general')} label="Open the app" secondary={{ href: '/contact/', label: 'Contact us' }} />
      <JsonLd data={breadcrumbSchema([{ name: 'About', path: '/about/' }])} />
    </>
  );
}
