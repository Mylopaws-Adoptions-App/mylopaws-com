import Link from 'next/link';
import { Faq, JsonLd, PageHero, faqSchema } from '@/components/Blocks';
import { LeadForm } from '@/components/LeadForm';
import { appLink } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Bangalore Pet Sitters Directory: Find Trusted Sitters',
  description: 'How to find and vet a trusted in-home pet sitter in Bangalore, questions to ask, and how sitters can get listed in the Mylopaws directory.',
  path: '/bangalore-pet-sitters-directory/',
});

const FAQ = [
  { q: 'What is the difference between pet sitting and boarding?', a: 'A sitter cares for your pet in your own home, so routines stay the same. Boarding moves your pet to another space. Cats and senior pets often do better with less change.' },
  { q: 'How much do pet sitters charge in Bangalore?', a: 'It varies by area, number of visits a day, overnight stays and the number of pets. Ask for a written quote that lists exactly what is included.' },
  { q: 'Should I do a trial visit?', a: 'Yes. A short paid meet-and-greet shows you how the sitter handles your pet, and lets your pet get used to them.' },
];

export default function SittersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/pawprints/', label: 'Pawprints' }, { label: 'Pet sitters directory' }]}
        eyebrow="Mylopaws Cares"
        title={<>Finding a pet sitter you can <em>trust.</em></>}
        lead="We are rebuilding our directory of Bangalore pet sitters with freshly verified listings. Until it is back, here is how to choose a sitter well, and how sitters can apply to be listed."
      />
      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h2>Before you hand over your keys</h2>
            <ol>
              <li><strong>Meet in person first,</strong> at home, with your pet. Watch how they approach your pet, not just what they say.</li>
              <li><strong>Ask for two references</strong> from pet parents they have sat for recently, and call them.</li>
              <li><strong>Agree the routine in writing:</strong> feeding times, walks, litter, medication, and what happens if your pet stops eating.</li>
              <li><strong>Share your vet’s details</strong> and a nearby 24-hour clinic, and agree a spending limit for emergencies.</li>
              <li><strong>Ask for daily photo updates</strong> at a set time, so you know visits are happening.</li>
              <li><strong>Check how they get around.</strong> If your pet may need the vet, a pet-friendly cab like <Link href="/travel/">Mylopaws Travel</Link> helps.</li>
            </ol>
            <h3>Prefer a home-style stay instead?</h3>
            <p>For cats, <Link href="/homes/">Mylopaws Homes</Link> offers calm, routine-led boarding with updates.</p>
          </div>
          <div>
            <div className="card">
              <div className="eyebrow">For pet sitters</div>
              <h3>Get listed</h3>
              <p>Tell us your areas, the pets you sit and your experience. We verify every listing before it goes live.</p>
              <LeadForm kind="sitter_listing" cta="Apply to be listed" />
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="eyebrow">Questions</div>
          <Faq items={FAQ} />
          <p style={{ marginTop: 24 }}><a className="btn btn-primary" href={appLink('homes')}>Book Mylopaws Homes</a></p>
        </div>
      </section>
      <JsonLd data={[faqSchema(FAQ), breadcrumbSchema([{ name: 'Pawprints', path: '/pawprints/' }, { name: 'Pet sitters directory', path: '/bangalore-pet-sitters-directory/' }])]} />
    </>
  );
}
