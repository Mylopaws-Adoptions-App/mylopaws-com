import { JsonLd, PageHero } from '@/components/Blocks';
import { LeadForm } from '@/components/LeadForm';
import { CONTACT, SITE } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Careers at Mylopaws: Pet Care Jobs in Bangalore',
  description: 'Join Mylopaws in Bangalore. Open roles: Warehouse & Delivery Executive, and Dermacare Specialist & Business Associate. Apply online.',
  path: '/careers/',
});

const ROLES = [
  {
    title: 'Warehouse & Delivery Executive',
    type: 'Full-time · HSR Layout, Bengaluru',
    summary: 'Keep our pet pharmacy and shop running: receive and organise stock, pack orders carefully, and deliver across Bangalore on our evening runs.',
    you: ['Own a two-wheeler and a valid licence', 'Know Bangalore’s roads well', 'Careful with medicines, cold-chain and fragile items', 'Comfortable with WhatsApp and simple stock apps', 'Kannada, Hindi or English; more is a bonus'],
  },
  {
    title: 'Dermacare Specialist & Business Associate',
    type: 'Full-time · HSR Layout salon and doorstep',
    summary: 'Deliver our skin and fur therapies to dogs and cats, assess skin before every session, and help pet parents choose the right care.',
    you: ['Hands-on grooming or pet care experience', 'Calm, patient handling of anxious pets', 'Interest in skin and coat health (we train you on our protocols)', 'Good with people: explaining, advising, following up', 'Willing to travel for doorstep sessions'],
  },
];

export default function CareersPage() {
  const jobs = ROLES.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: r.title,
    description: `${r.summary} Requirements: ${r.you.join('; ')}.`,
    employmentType: 'FULL_TIME',
    datePosted: '2026-10-23',
    hiringOrganization: { '@type': 'Organization', name: 'Mylopaws', sameAs: SITE.url },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: CONTACT.address.street, addressLocality: CONTACT.address.locality, addressRegion: CONTACT.address.region, postalCode: CONTACT.address.postalCode, addressCountry: 'IN' } },
  }));
  return (
    <>
      <PageHero crumbs={[{ label: 'Careers' }]} eyebrow="Careers" title={<>Work with <em>pets,</em> every day.</>} lead="We are a small team building practical pet care for Bangalore. If you love animals and like getting things done, we would love to hear from you." />
      <section className="section">
        <h2 className="sr-only">Open roles</h2>
        <div className="wrap grid grid-2">
          {ROLES.map((r) => (
            <article className="card" key={r.title}>
              <span className="tag">{r.type}</span>
              <h3>{r.title}</h3>
              <p>{r.summary}</p>
              <ul className="ticks" style={{ marginTop: 10 }}>{r.you.map((y) => <li key={y} style={{ fontSize: '0.95rem' }}>{y}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section alt" id="apply">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Apply</div>
            <h2>Tell us about <em>you.</em></h2>
            <p className="lead">Pick a role, tell us a little about yourself and attach your CV if you have one. We read every application and reply on WhatsApp or email.</p>
          </div>
          <div className="card"><LeadForm kind="careers" topics={ROLES.map((r) => r.title).concat('Something else')} withCv cta="Send application" /></div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobs).replace(/</g, '\\u003c') }} />
      <JsonLd data={breadcrumbSchema([{ name: 'Careers', path: '/careers/' }])} />
    </>
  );
}
