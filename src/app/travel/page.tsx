import Link from 'next/link';
import { CtaBand, Faq, JsonLd, PageHero, Slot, faqSchema } from '@/components/Blocks';
import { Arrow, Car, Clock } from '@/components/Icons';
import { TRAVEL } from '@/lib/travel';
import { CONTACT, appLink } from '@/lib/site';
import { breadcrumbSchema, meta, travelSchema } from '@/lib/seo';
import { postsIn } from '@/lib/posts';

export const metadata = meta({
  title: 'Mylopaws Travel: Pet-Friendly Cabs in Bangalore',
  description: 'Dedicated pet cabs in Bangalore for dogs and cats: city rides, vet visits, airport transfers and outstation trips. 6 am to midnight. Book Mylopaws Travel.',
  path: '/travel/',
});

const FAQ = [
  { q: 'Why not just take a regular cab?', a: 'Many ride-hailing drivers refuse or cancel when they see a pet, and their cars are not prepared for one. Our cabs are booked for pets, every time.' },
  { q: 'What are your hours?', a: 'Every day from 6 am to midnight. For earlier or later trips, ask us and we will try to arrange it.' },
  { q: 'Can I travel with my pet?', a: 'Yes, most pet parents ride along. We can also take your pet alone to the salon, boarding or family.' },
  { q: 'How much does it cost?', a: 'It depends on distance, timing and the pet. Book on the app and we confirm a quote on WhatsApp before the trip.' },
  { q: 'Do you go outside Bangalore?', a: 'Yes, anywhere in India by road, from weekend getaways to full relocations.' },
];

export default function TravelPage() {
  const posts = postsIn('travel').slice(0, 3);
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Travel' }]}
        eyebrow="Mylopaws Travel · Bangalore"
        title={<>Pet cabs that <em>never</em> refuse a dog.</>}
        lead="Dedicated pet-friendly cabs across Bangalore and to anywhere in India. Prepared vehicles, patient drivers, and a trip planned around your pet."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={appLink('travel')}>Book a pet cab <Arrow /></a>
          <a className="btn btn-ghost" href={`tel:${CONTACT.travel.phone.replace(/\s/g, '')}`}>Call {CONTACT.travel.phone}</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Four ways we move pets</div>
              <h2>Wherever your pet <em>needs</em> to go.</h2>
            </div>
            <p className="lead">City rides, the vet, the airport or a road trip across states. Same prepared cabs, same patient drivers.</p>
          </div>
          <div className="grid grid-4">
            {TRAVEL.map((t, i) => (
              <Link key={t.slug} className="card" href={`/${t.slug}/`}>
                <span className="num">0{i + 1}</span>
                <h3>{t.name}</h3>
                <p>{t.short}</p>
                <span className="more">Details <Arrow size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <Slot src="/images/travel-air.webp" alt="Travelling with a pet" caption="Seat covers, space for crates, and a driver who expected fur." />
          <div>
            <div className="eyebrow">What makes it different</div>
            <h2>A cab built for the <em>passenger</em> with four legs.</h2>
            <ul className="ticks" style={{ marginTop: 20 }}>
              <li>Booked for pets, so no refusals or gate cancellations</li>
              <li>Seat protection, ventilation and room for crates and carriers</li>
              <li>Drivers trained to handle anxious, large and senior pets</li>
              <li>Breaks for water and walks on longer trips</li>
              <li>Dogs of every size, and cats in carriers</li>
            </ul>
            <p className="muted" style={{ marginTop: 22, display: 'flex', gap: 10, alignItems: 'center' }}><Clock /> {CONTACT.travel.hours}</p>
          </div>
        </div>
      </section>

      <section className="section ink pattern">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">How booking works</div>
            <h2>Three steps, <em>no</em> surprises.</h2>
          </div>
          <div className="steps">
            <div className="step"><div><h3>Book on the Mylopaws app</h3><p>Pick-up, drop, date and a few details about your pet.</p></div></div>
            <div className="step"><div><h3>Confirm on WhatsApp</h3><p>Our Travel team confirms timing and your quote.</p></div></div>
            <div className="step"><div><h3>Ride</h3><p>Your driver arrives prepared. You track the trip and we stay reachable.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Questions</div>
            <h2>Travel, <em>answered.</em></h2>
            <p className="lead">Planning a trip out of town? Start with our <Link href="/outstation-travel-pet-bangalore-checklist/">outstation checklist</Link> and <Link href="/pet-friendly-resorts-near-bangalore/">pet-friendly resorts guide</Link>.</p>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <section className="section tight alt">
        <div className="wrap">
          <div className="eyebrow">Travel guides on Pawprints</div>
          <div className="grid grid-3" style={{ marginTop: 8 }}>
            {posts.map((p) => (
              <Link key={p.slug} className="card" href={`/${p.slug}/`}>
                <Car size={26} />
                <h3>{p.title}</h3>
                <span className="more">{p.readMins} min read <Arrow size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={<>Where are you <em>headed?</em></>} text="Book on the app and we will plan the ride around your pet." href={appLink('travel')} label="Book a pet cab" />
      <JsonLd data={[travelSchema, faqSchema(FAQ), breadcrumbSchema([{ name: 'Travel', path: '/travel/' }])]} />
    </>
  );
}
