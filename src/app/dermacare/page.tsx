import Link from 'next/link';
import { CtaBand, Faq, JsonLd, PageHero, Slot, faqSchema } from '@/components/Blocks';
import { Arrow, Clock, Pin } from '@/components/Icons';
import { THERAPIES } from '@/lib/therapies';
import { CONTACT, bookLink } from '@/lib/site';
import { breadcrumbSchema, dermacareSchema, meta } from '@/lib/seo';
import { SocialHub } from '@/components/Social';

export const metadata = meta({
  title: 'Mylopaws Dermacare: Skin & Fur Specialists for Pets',
  description: '12 specialist skin and fur therapies for dogs and cats in Bangalore: ticks, infections, allergies, dandruff, shedding. HSR Layout salon and doorstep.',
  path: '/dermacare/',
});

const GROUPS = [
  { name: 'Infections & parasites', slugs: ['therapy-skin-infection-recovery', 'therapy-tick-flea-elimination', 'therapy-odour-control'] },
  { name: 'Itching & sensitivity', slugs: ['therapy-sensitive-skin-relief', 'therapy-oatmeal-skin-relief', 'therapy-aloe-cooling', 'therapy-neem-therapy'] },
  { name: 'Dryness, shedding & shine', slugs: ['therapy-deep-hydration', 'therapy-de-shedding', 'therapy-fur-revival-shine'] },
  { name: 'Care & maintenance', slugs: ['therapy-herbal-detox', 'therapy-puppy-grooming'] },
];

const FAQ = [
  { q: 'How is Dermacare different from grooming?', a: 'Grooming tidies fur. Dermacare starts with the skin: we assess what is causing itching, smell, flakes or shedding, and pick the therapy that treats it.' },
  { q: 'Which therapy does my pet need?', a: 'You do not have to know. Book a session and our specialist assesses your pet first, then recommends the right therapy.' },
  { q: 'Do you come home?', a: 'Yes, doorstep sessions are available in many areas of Bangalore. Our salon in HSR Layout is best for longer therapies.' },
  { q: 'Do you treat cats?', a: 'Yes. We adjust products, handling and timing for cats and for anxious pets.' },
  { q: 'Is a vet still needed?', a: 'For open wounds, bleeding, sudden hair loss or a pet who seems unwell, see a vet first. We tell you honestly when something needs a vet.' },
];

export default function DermacarePage() {
  const by = Object.fromEntries(THERAPIES.map((t) => [t.slug, t]));
  return (
    <>
      <PageHero sol="dermacare"
        crumbs={[{ label: 'Dermacare' }]}
        eyebrow="Mylopaws Dermacare · HSR Layout"
        title={<>Skin &amp; fur, <em>treated together.</em></>}
        lead="Twelve specialist therapies for the problems regular baths don’t fix: ticks, infections, allergies, dandruff, shedding and dull fur. For dogs and cats, at our salon or at your door."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={bookLink('dermacare')}>Book a therapy <Arrow /></a>
          <a className="btn btn-ghost" href="#therapies">See all 12 therapies</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap split">
          <div>
            <div className="eyebrow">Our approach</div>
            <h2>Itching is a <em>skin</em> problem, not a grooming one.</h2>
            <p className="lead">Most salons wash the fur and send your pet home smelling nice. A day later the scratching is back. We work the other way round.</p>
            <div className="steps" style={{ marginTop: 24 }}>
              <div className="step"><div><h3>Assess</h3><p>A specialist checks skin, fur, ears and paws before anything else.</p></div></div>
              <div className="step"><div><h3>Treat the cause</h3><p>We match one of 12 therapies to what we find, not a one-size package.</p></div></div>
              <div className="step"><div><h3>Keep it that way</h3><p>Home-care advice and a sensible rhythm for follow-ups.</p></div></div>
            </div>
          </div>
          <Slot src="/images/vet-cat.webp" alt="A vet inspecting a cat" caption="Twelve therapies. One question first: what is your pet’s skin telling us?" />
        </div>
      </section>

      <section className="section alt" id="therapies">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">The 12 therapies</div>
              <h2>Find the one for <em>your</em> pet.</h2>
            </div>
            <p className="lead">Not sure? Book any session and our specialist recommends the right therapy after a skin check.</p>
          </div>
          {GROUPS.map((g) => (
            <div key={g.name} style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>{g.name}</h3>
              <div className="grid grid-3">
                {g.slugs.map((s) => by[s]).filter(Boolean).map((t) => (
                  <Link key={t.slug} className="card" href={`/${t.slug}/`}>
                    <h3>{t.name}</h3>
                    <p>{t.short}</p>
                    <span className="more">Learn more <Arrow size={14} /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section ink pattern">
        <div className="wrap split">
          <div>
            <div className="eyebrow">Visit the salon</div>
            <h2>Mylopaws Dermacare, <em>HSR Layout.</em></h2>
            <p style={{ display: 'flex', gap: 10 }}><Pin /> {CONTACT.address.street}, {CONTACT.address.locality} {CONTACT.address.postalCode}</p>
            <p style={{ display: 'flex', gap: 10 }}><Clock /> {CONTACT.dermacare.hours}</p>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <a className="btn btn-yellow" href={bookLink('dermacare')}>Book a slot <Arrow /></a>
              <a className="btn btn-light" href={`https://www.google.com/maps/search/?api=1&query=${CONTACT.address.lat},${CONTACT.address.lng}`} rel="noopener" target="_blank">Get directions</a>
            </div>
          </div>
          <div className="stats" style={{ background: 'rgba(255,255,255,.12)' }}>
            <div className="stat"><b>12</b><span>specialist therapies</span></div>
            <div className="stat"><b>2</b><span>ways to book: salon or doorstep</span></div>
            <div className="stat"><b>6</b><span>days a week, 11 am to 6 pm</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Questions</div>
            <h2>Dermacare, <em>answered.</em></h2>
            <p className="lead">Want to understand your pet&rsquo;s skin first? Read <Link href="/how-to-read-dog-skin-guide-bangalore/">how to read your dog&rsquo;s skin</Link>.</p>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <SocialHub title={<>See what pet parents <em>say.</em></>} lead="Read reviews of the Mylopaws Dermacare Centre on Google, get directions to HSR Layout, or follow our before-and-afters on Instagram." />
      <CtaBand title={<>Your pet&rsquo;s skin is <em>talking.</em></>} text="Book a Dermacare session and our specialist will tell you what it is saying." href={bookLink('dermacare')} label="Book Dermacare" />
      <JsonLd data={[dermacareSchema(THERAPIES.map((t) => ({ name: t.name, slug: t.slug }))), faqSchema(FAQ), breadcrumbSchema([{ name: 'Dermacare', path: '/dermacare/' }])]} />
    </>
  );
}
