import Link from 'next/link';
import { QuickAnswer, CtaBand, Faq, JsonLd, PageHero, Slot, faqSchema } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { bookLink } from '@/lib/site';
import { breadcrumbSchema, meta, serviceSchema } from '@/lib/seo';

export const metadata = meta({
  title: 'Mylopaws Homes: Home-Style Cat Boarding in Bangalore',
  description: 'Home-style cat boarding in Bangalore. Calm spaces, familiar routines and daily updates while you are away. Book Mylopaws Homes.',
  path: '/homes/',
});

const FAQ = [
  { q: 'Do you board dogs?', a: 'Mylopaws Homes is focused on cats right now. Tell us about your dog on WhatsApp and we will let you know when dog stays open.' },
  { q: 'What should I pack?', a: 'Your cat’s usual food, litter preference, any medication, and something that smells of home, like a blanket or toy.' },
  { q: 'Will I get updates?', a: 'Yes. You get photo and message updates on WhatsApp during the stay.' },
  { q: 'What does my cat need before a stay?', a: 'Up-to-date vaccinations and deworming, and a quick chat with us about temperament, diet and health.' },
  { q: 'Can you pick my cat up?', a: 'Yes. Mylopaws Travel can collect and drop your cat in a carrier.' },
];

export default function HomesPage() {
  return (
    <>
      <PageHero sol="homes"
        crumbs={[{ label: 'Homes' }]}
        eyebrow="Mylopaws Homes · Cat boarding"
        title={<>A home, <em>not</em> a kennel.</>}
        lead="Home-style boarding for cats in Bangalore. Quiet spaces, the routine your cat already knows, and updates that let you actually enjoy your trip."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={bookLink('homes')}>Book a stay <Arrow /></a>
          <Link className="btn btn-ghost" href="/travel/">Add a pick-up</Link>
        </div>
      </PageHero>
      <QuickAnswer q="Where can I leave my cat when I travel from Bangalore?">Mylopaws Homes offers calm, home-style cat boarding in Bangalore: familiar food, quiet spaces and daily updates while you are away. Book on WhatsApp at +91 90710 91699.</QuickAnswer>
      <section className="section">
        <div className="wrap split">
          <Slot src="/images/cat-dog-sleeping.webp" alt="A cat and a dog sleeping close together" caption="Cats don’t like change. So we change as little as possible." tone="y" />
          <div>
            <div className="eyebrow">Why cats first</div>
            <h2>Built for the most <em>particular</em> guests.</h2>
            <p className="lead">Cats find cages, noise and strange routines stressful. Homes is designed around what keeps them calm.</p>
            <ul className="ticks" style={{ marginTop: 20 }}>
              <li>Calm, home-style spaces, never rows of cages</li>
              <li>Your cat&rsquo;s own food, schedule and litter habits</li>
              <li>Quiet, cat-only surroundings</li>
              <li>Photo and message updates on WhatsApp</li>
              <li>Pick-up and drop with Mylopaws Travel</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section ink pattern">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">How a stay works</div>
            <h2>From booking to <em>homecoming.</em></h2>
          </div>
          <div className="steps">
            <div className="step"><div><h3>Message us on WhatsApp</h3><p>Dates, your cat&rsquo;s details and any special needs.</p></div></div>
            <div className="step"><div><h3>A quick chat</h3><p>We confirm on WhatsApp and go over food, health and temperament.</p></div></div>
            <div className="step"><div><h3>Settle in</h3><p>Drop off, or we pick up. We keep your cat&rsquo;s routine as close to home as we can.</p></div></div>
            <div className="step"><div><h3>Stay in touch</h3><p>Updates through the stay, then a calm ride home.</p></div></div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Questions</div>
            <h2>Homes, <em>answered.</em></h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>
      <CtaBand title={<>Going away? <em>We&rsquo;ve</em> got them.</>} text="Message us on WhatsApp and we will confirm everything with you." href={bookLink('homes')} label="Book Homes" />
      <JsonLd data={[serviceSchema('Mylopaws Homes: home-style cat boarding', '/homes/', 'Home-style cat boarding in Bangalore.'), faqSchema(FAQ), breadcrumbSchema([{ name: 'Homes', path: '/homes/' }])]} />
    </>
  );
}
