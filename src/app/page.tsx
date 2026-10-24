import Link from 'next/link';
import { Arrow, Car, Home, Leaf, Bag, Shield, Paw } from '@/components/Icons';
import { CtaBand, Faq, JsonLd, Slot, faqSchema } from '@/components/Blocks';
import { appLink } from '@/lib/site';
import { meta } from '@/lib/seo';
import { allPosts, CATEGORIES } from '@/lib/posts';
import { THERAPIES } from '@/lib/therapies';

export const metadata = meta({
  title: 'Mylopaws: Pet Travel, Dermacare & Homes in Bangalore',
  description: 'Pet-friendly cabs, specialist skin and fur therapies and home-style cat boarding in Bangalore. Mylopaws: bringing solutions for pawfamilies.',
  path: '/',
});

const FAQ = [
  { q: 'Which areas of Bangalore do you serve?', a: 'Mylopaws Travel covers all of Bangalore and outstation trips across India. Dermacare runs from our salon in HSR Layout, with doorstep sessions in many areas. Homes is in Bangalore.' },
  { q: 'How do I book?', a: 'Book any service on the Mylopaws app at mylopaws.app. Our team confirms every booking with you on WhatsApp.' },
  { q: 'Why don’t you show prices on the site?', a: 'Every pet, route and skin condition is different. We quote on WhatsApp once we know what your pet needs, so there are no surprises later.' },
  { q: 'Do you work with cats too?', a: 'Yes. Cats ride in our cabs, get Dermacare therapies, and Mylopaws Homes is currently focused on cat boarding.' },
];

export default function HomePage() {
  const posts = allPosts().slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <div className="eyebrow rise">Bangalore&rsquo;s pet solutions platform</div>
            <h1 className="rise d1">
              Bringing solutions for <em>pawfamilies.</em>
            </h1>
            <p className="lead rise d2">
              Dedicated pet cabs that never refuse a dog. Skin and fur therapies that treat the cause, not the smell. A home-style stay when you have to be away.
            </p>
            <div className="btn-row rise d3">
              <a className="btn btn-primary" href={appLink('general')}>Book on the Mylopaws app <Arrow /></a>
              <Link className="btn btn-ghost" href="/dermacare/">Explore Dermacare</Link>
            </div>
            <div className="hero-note rise d4">
              <span>Pet cabs 6 am to midnight</span>
              <span>12 specialist therapies</span>
              <span>Cats welcome everywhere</span>
            </div>
          </div>
          <div className="tickets rise d2">
            <Link className="ticket" href="/travel/">
              <span className="ticket-icon"><Car size={28} /></span>
              <span><span className="ticket-title">Travel</span><br /><span className="ticket-sub">Pet-friendly cabs, city &amp; outstation</span></span>
              <span className="ticket-go"><Arrow /></span>
            </Link>
            <Link className="ticket" href="/dermacare/">
              <span className="ticket-icon"><Leaf size={28} /></span>
              <span><span className="ticket-title">Dermacare</span><br /><span className="ticket-sub">Skin &amp; fur therapies, HSR Layout</span></span>
              <span className="ticket-go"><Arrow /></span>
            </Link>
            <Link className="ticket" href="/homes/">
              <span className="ticket-icon"><Home size={28} /></span>
              <span><span className="ticket-title">Homes</span><br /><span className="ticket-sub">Home-style cat boarding</span></span>
              <span className="ticket-go"><Arrow /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Three verticals, one promise</div>
              <h2>Built around what Bangalore pet parents <em>actually</em> struggle with.</h2>
            </div>
            <p className="lead">Getting a dog into a cab. Itching that baths don&rsquo;t fix. Finding someone you trust when you travel. We built a service for each.</p>
          </div>
          <div className="grid grid-3">
            <Link className="card" href="/travel/">
              <span className="num">01 · Travel</span>
              <h3>A cab that is ready for your pet</h3>
              <p>Dedicated vehicles and drivers who expect fur, crates and the occasional nervous passenger. Across Bangalore and to anywhere in India.</p>
              <span className="more">Pet cabs <Arrow size={14} /></span>
            </Link>
            <Link className="card" href="/dermacare/">
              <span className="num">02 · Dermacare</span>
              <h3>Skin &amp; fur, treated together</h3>
              <p>{THERAPIES.length} specialist therapies for ticks, infections, allergies, shedding and dull fur, at our HSR Layout salon or at your door.</p>
              <span className="more">See therapies <Arrow size={14} /></span>
            </Link>
            <Link className="card" href="/homes/">
              <span className="num">03 · Homes</span>
              <h3>A home, not a kennel</h3>
              <p>Home-style boarding with a calm routine, starting with cats: quiet spaces, familiar food and updates while you are away.</p>
              <span className="more">About Homes <Arrow size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Slot src="/images/vet-dog.webp" alt="A vet examining a dog" caption="Itching isn’t a grooming problem. It’s a skin problem." />
          <div>
            <div className="eyebrow">Mylopaws Dermacare</div>
            <h2>Most pet salons wash the fur. <em>We treat the skin.</em></h2>
            <p className="lead">Ticks, fungal patches, dandruff, heavy shedding, the smell that comes back a day after a bath. Each has a cause, and each has a therapy built for it.</p>
            <ul className="ticks" style={{ margin: '24px 0 30px' }}>
              <li>Skin assessment before any treatment</li>
              <li>Therapies for dogs and cats, puppies and seniors</li>
              <li>Salon in HSR Layout, doorstep sessions across Bangalore</li>
            </ul>
            <div className="btn-row">
              <a className="btn btn-primary" href={appLink('dermacare')}>Book a therapy <Arrow /></a>
              <Link className="btn btn-ghost" href="/dermacare/">All 12 therapies</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section ink pattern">
        <div className="wrap split reverse">
          <Slot src="/images/travel-hiker.webp" alt="A hiker with two dogs outdoors" caption="No refusals. No cancellations at the gate." tone="y" />
          <div>
            <div className="eyebrow">Mylopaws Travel</div>
            <h2>Every trip starts with a driver who <em>expected</em> a dog.</h2>
            <div className="steps" style={{ marginTop: 28 }}>
              <div className="step"><div><h3>Book on the app</h3><p>Tell us the pet, the pick-up and where you are going.</p></div></div>
              <div className="step"><div><h3>We confirm on WhatsApp</h3><p>Route, timing and a quote that fits your trip.</p></div></div>
              <div className="step"><div><h3>Ride calm</h3><p>A prepared cab, a patient driver and breaks when your pet needs them.</p></div></div>
            </div>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <a className="btn btn-yellow" href={appLink('travel')}>Book a pet cab <Arrow /></a>
              <Link className="btn btn-light" href="/travel/">How Travel works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Also from Mylopaws</div>
              <h2>Care that goes <em>beyond</em> a booking.</h2>
            </div>
          </div>
          <div className="grid grid-3">
            <Link className="card flat" href="/shopping/">
              <Bag size={30} />
              <h3>Pet pharmacy &amp; shop</h3>
              <p>Tick and flea care, supplements, shampoos and vet-prescribed medicines, delivered across Bangalore.</p>
              <span className="more">Browse the catalogue <Arrow size={14} /></span>
            </Link>
            <Link className="card flat" href="/pawprints/">
              <Paw size={30} />
              <h3>Pawprints</h3>
              <p>Guides for Bangalore pet parents: tick season, first cab rides, puppy vaccinations and pet-friendly getaways.</p>
              <span className="more">Read the blog <Arrow size={14} /></span>
            </Link>
            <Link className="card flat" href="/bangalore-pet-sitters-directory/">
              <Shield size={30} />
              <h3>Pet sitters directory</h3>
              <p>How to find and vet an in-home pet sitter in Bangalore, and how to get listed if you are one.</p>
              <span className="more">Open the directory <Arrow size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Pawprints</div>
              <h2>Fresh from the <em>blog.</em></h2>
            </div>
            <p><Link className="btn btn-ghost" href="/pawprints/">All articles <Arrow /></Link></p>
          </div>
          <div className="grid grid-3">
            {posts.map((p) => (
              <Link key={p.slug} className="card" href={`/${p.slug}/`}>
                <span className="tag">{CATEGORIES[p.category].name}</span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="more">{p.readMins} min read <Arrow size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Questions</div>
            <h2>Good to <em>know.</em></h2>
            <p className="lead">Can&rsquo;t find your answer? Our team replies on WhatsApp.</p>
            <Link className="btn btn-ghost" href="/contact/">Contact us</Link>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <CtaBand
        title={<>Your pet, <em>sorted.</em></>}
        text="Book Travel, Dermacare or Homes in a couple of taps. We confirm everything with you on WhatsApp."
        href={appLink('general')}
        label="Open the Mylopaws app"
        secondary={{ href: '/contact/', label: 'Talk to us' }}
      />
      <JsonLd data={faqSchema(FAQ)} />
    </>
  );
}
