import { CtaBand, Faq, JsonLd, PageHero, faqSchema } from '@/components/Blocks';
import { Arrow } from '@/components/Icons';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Motion';
import { CONTACT, SITE, bookLink } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Work with Mylopaws: Franchise, Cat Boarding & Brand Partners',
  description: 'Partner with Mylopaws in Bangalore: open a Mylopaws Dermacare Centre franchise, become a cat boarding partner in North Bengaluru, or sell your pet brand through Mylopaws Shopping.',
  path: '/work-with-us/',
});

/** Every partner enquiry opens WhatsApp on the founder's number, pre-filled with the right topic. */
const wa = (text: string) => bookLink('general', text);

const WAYS = [
  {
    tag: 'Franchise',
    title: 'A Mylopaws Dermacare Centre',
    text: 'Run a Mylopaws Dermacare Centre in your city: our skin and fur therapy model, built around 12 specialist therapies, with the Mylopaws brand behind you.',
    you: [
      'An entrepreneur or pet-care professional ready to run a centre full-time',
      'A suitable commercial space in your city',
      'Patience and real care for dogs and cats',
      'Capital to set up and run the centre',
    ],
    cta: 'Ask about a franchise',
    msg: "Hi Mylopaws, I'm interested in a Mylopaws Dermacare Centre franchise. My city is: ",
  },
  {
    tag: 'Boarding partner',
    title: 'Cat boarding partner, North Bengaluru',
    text: 'Host cats the Mylopaws Homes way: a calm, home-style space, the routine each cat already knows, and WhatsApp updates for their parents.',
    you: [
      'A quiet, safe home or space in North Bengaluru',
      'Cat-only surroundings, no cages and no crowding',
      'Comfortable handling cats of every temperament',
      'Time to send photo and message updates through the day',
    ],
    cta: 'Become a boarding partner',
    msg: "Hi Mylopaws, I'd like to become a cat boarding partner in North Bengaluru. My area is: ",
  },
  {
    tag: 'Brand partner',
    title: 'Sell your brand on Mylopaws',
    text: 'Put your pet products in front of Bangalore pet parents on Mylopaws Shopping, with ordering on WhatsApp and delivery across the city.',
    you: [
      'Pet food, treats, grooming, care or accessories',
      'Authentic, properly labelled products with a clear MRP',
      'Reliable stock and sturdy packaging',
      'Open to starting with a pilot range',
    ],
    cta: 'List your brand',
    msg: "Hi Mylopaws, I'd like to sell my brand through Mylopaws. My brand and products: ",
  },
];

const ROLES = [
  {
    title: 'Head, Shopping & Retail',
    type: 'Full-time · HSR Layout, Bengaluru · Reports to the Founder & CEO',
    summary: 'Own Mylopaws Shopping end to end: the pet store that delivers across Bangalore. You will run the range, pricing, brand partners, stock and delivery, and grow it online and on WhatsApp, with the P&L in your hands.',
    does: [
      'Run the Shopping and Retail P&L: sales, gross margin, stock turns and working capital',
      'Own the range and pricing: what we stock, at what price, and when we add or drop a product',
      'Source and manage brand and distributor partners; negotiate terms, supply and margin',
      'Keep stock accurate and orders moving with our warehouse and delivery team, from order to doorstep',
      'Grow orders through the website, WhatsApp, Google Shopping and social, together with marketing',
      'Raise repeat orders and customer satisfaction: reviews, returns, support and refunds',
      'Shape the retail roadmap, including in-centre retail and partner outlets',
      'Hire, lead and coach the Shopping and delivery team',
    ],
    you: [
      '7+ years in retail, e-commerce or consumer brands, including 2+ years running a category, store or P&L',
      'Strong with numbers: margins, pricing, inventory and unit economics',
      'Experience negotiating with vendors and managing supply and logistics',
      'Hands-on with online selling: catalogue, marketplace or D2C, plus basic ads and analytics',
      'A leader who also gets into the detail, and enjoys building from a small base',
      'A pet owner or genuine animal lover (a big plus); English fluency, Kannada or Hindi a bonus',
    ],
  },
  {
    title: 'Warehouse & Delivery Executive',
    type: 'Full-time · HSR Layout, Bengaluru',
    summary: 'Keep our pet shop running: receive and organise stock, pack orders carefully and hand them to our courier partner for delivery across Bangalore.',
    you: ['Own a two-wheeler and a valid licence', 'Know Bangalore’s roads well', 'Careful with medicines, cold-chain and fragile items', 'Comfortable with WhatsApp and simple stock apps', 'Kannada, Hindi or English; more is a bonus'],
  },
  {
    title: 'Dermacare Specialist & Business Associate',
    type: 'Full-time · HSR Layout salon and doorstep',
    summary: 'Deliver our skin and fur therapies to dogs and cats, assess skin before every session, and help pet parents choose the right care.',
    you: ['Hands-on grooming or pet care experience', 'Calm, patient handling of anxious pets', 'Interest in skin and coat health (we train you on our protocols)', 'Good with people: explaining, advising, following up', 'Willing to travel for doorstep sessions'],
  },
];

const roleMsg = (title: string) => `Hi Mylopaws, I'd like to apply for the ${title} role. A little about me: `;

const jobSchemas = ROLES.map((r) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: r.title,
  description: `${r.summary}${r.does ? ` Responsibilities: ${r.does.join('; ')}.` : ''} Requirements: ${r.you.join('; ')}.`,
  employmentType: 'FULL_TIME',
  datePosted: r.does ? '2026-11-17' : '2026-10-23',
  hiringOrganization: { '@type': 'Organization', name: 'Mylopaws', sameAs: SITE.url },
  jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', streetAddress: CONTACT.address.street, addressLocality: CONTACT.address.locality, addressRegion: CONTACT.address.region, postalCode: CONTACT.address.postalCode, addressCountry: 'IN' } },
}));

const FAQ = [
  { q: 'What does a Dermacare franchise involve?', a: 'You run a Mylopaws Dermacare Centre using our therapy protocols and brand. Investment, space and support depend on the city and the format, so we walk through the details on a call rather than quote a number here.' },
  { q: 'Which areas do you need cat boarding partners in?', a: 'North Bengaluru right now. If you are somewhere else in the city, message us anyway and we will note it for later.' },
  { q: 'What kinds of brands do you take?', a: 'Pet food, treats, grooming and care products for dogs and cats. Share your range and we will tell you what fits. Medicines need a valid licence and prescription handling, so we talk about those separately.' },
  { q: 'How do I get started?', a: 'Send us a WhatsApp message on the button for the option you want. Tell us a little about yourself or your brand. We read every message and reply on WhatsApp.' },
  { q: 'I am looking for a job, not a partnership.', a: 'See the open roles above: Head, Shopping & Retail; Warehouse & Delivery Executive; and Dermacare Specialist & Business Associate. Apply on WhatsApp, or send your CV with the form.' },
];

const PILLARS = [
  { b: '4', h: 'Solutions, one brand', p: 'Travel, Dermacare, Homes and Shopping. Partners join a brand Bangalore pet parents already use.' },
  { b: '12', h: 'Specialist therapies', p: 'A defined approach to skin and fur care, with the skin assessed first and not guessed.' },
  { b: '1', h: 'Chat to book', p: 'Customers book and order on WhatsApp, the way they already talk to everyone else.' },
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Work with us' }]}
        eyebrow="Work with us"
        title={<>Grow with <em>Mylopaws.</em></>}
        lead="We are building the pet solutions platform for Bangalore: pet-friendly cabs, specialist skin and fur care, home-style cat boarding and a pet store that delivers. Now there are three ways to build it with us."
      >
        <div className="btn-row">
          <a className="btn btn-primary" href={wa("Hi Mylopaws, I'd like to explore working with Mylopaws.")}>Message us on WhatsApp <Arrow /></a>
          <a className="btn btn-ghost" href="#ways">See the three ways</a>
          <a className="btn btn-ghost" href="#role">We are hiring</a>
        </div>
      </PageHero>

      <section className="section" id="ways">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Three ways to partner</div>
              <h2>Pick the one that <em>fits you.</em></h2>
            </div>
            <p className="lead">Each button opens WhatsApp with a message ready to send. Add your city, area or brand and press send.</p>
          </div>
          <div className="grid grid-3">
            {WAYS.map((w, i) => (
              <Reveal key={w.tag} delay={i * 120}>
                <article className="card" style={{ height: '100%' }}>
                  <span className="tag">{w.tag}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <p style={{ margin: '16px 0 0', fontWeight: 700, color: 'var(--mag)' }}>Who we are looking for</p>
                  <ul className="ticks" style={{ marginTop: 12 }}>
                    {w.you.map((y) => <li key={y} style={{ fontSize: '0.95rem' }}>{y}</li>)}
                  </ul>
                  <div className="btn-row" style={{ marginTop: 'auto', paddingTop: 22 }}>
                    <a className="btn btn-primary" href={wa(w.msg)}>{w.cta} <Arrow /></a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="role">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Open roles</div>
              <h2>Join the <em>team.</em></h2>
            </div>
            <p className="lead">Three roles open in Bengaluru, from a senior head of Shopping to hands-on pet care. Apply on WhatsApp, or send your CV with the form below.</p>
          </div>
          <div className="grid grid-2">
            {ROLES.map((r) => (
              <article className="card" key={r.title} style={r.does ? { gridColumn: '1 / -1' } : undefined}>
                <span className="tag">{r.type}</span>
                <h3>{r.title}</h3>
                <p>{r.summary}</p>
                {r.does ? (
                  <div className="grid grid-2" style={{ marginTop: 14, alignItems: 'start' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--mag)' }}>What you will do</p>
                      <ul className="ticks" style={{ marginTop: 12 }}>{r.does.map((d) => <li key={d} style={{ fontSize: '0.95rem' }}>{d}</li>)}</ul>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--mag)' }}>What we are looking for</p>
                      <ul className="ticks" style={{ marginTop: 12 }}>{r.you.map((y) => <li key={y} style={{ fontSize: '0.95rem' }}>{y}</li>)}</ul>
                    </div>
                  </div>
                ) : (
                  <ul className="ticks" style={{ marginTop: 10 }}>{r.you.map((y) => <li key={y} style={{ fontSize: '0.95rem' }}>{y}</li>)}</ul>
                )}
                <div className="btn-row" style={{ marginTop: r.does ? 24 : 'auto', paddingTop: r.does ? 0 : 22 }}>
                  <a className="btn btn-primary" href={wa(roleMsg(r.title))}>Apply on WhatsApp <Arrow /></a>
                </div>
              </article>
            ))}
          </div>

          <div className="split" id="apply" style={{ alignItems: 'start', marginTop: 56 }}>
            <div>
              <div className="eyebrow">Send your CV</div>
              <h2>Tell us about <em>you.</em></h2>
              <p className="lead">Pick a role, tell us a little about yourself and attach your CV if you have one. We read every application and reply on WhatsApp or email.</p>
            </div>
            <div className="card"><LeadForm kind="careers" topics={ROLES.map((r) => r.title).concat('Something else')} withCv cta="Send application" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">How it works</div>
            <h2>From a message to <em>a start.</em></h2>
            <p className="lead">No long forms. We would rather talk first.</p>
          </div>
          <div className="steps">
            <div className="step"><div><h3>Message us on WhatsApp</h3><p>Tell us which of the three you are interested in, and a little about you or your brand.</p></div></div>
            <div className="step"><div><h3>Talk to the founder</h3><p>A short call. We explain how it works and you tell us what you are looking for.</p></div></div>
            <div className="step"><div><h3>Start small</h3><p>We agree a simple plan and begin with a pilot, so both sides learn before scaling.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section ink pattern">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow">Why Mylopaws</div>
              <h2>Built for pets, <em>run by pet people.</em></h2>
            </div>
          </div>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <Reveal className="pillar" key={p.h} delay={i * 120}>
                <b>{p.b}</b>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Questions</div>
            <h2>Before you <em>message us.</em></h2>
            <p className="lead">Something not covered? Ask on WhatsApp at {CONTACT.homes.phone}. Looking for a job instead? See the <a href="#role" style={{ textDecoration: 'underline' }}>open roles</a>.</p>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <CtaBand
        title={<>Let&rsquo;s build something <em>good for pets.</em></>}
        text="Franchise, boarding or brand: send us a message and we will take it from there."
        href={wa("Hi Mylopaws, I'd like to explore working with Mylopaws.")}
        label="Message us on WhatsApp"
      />

      <JsonLd data={[breadcrumbSchema([{ name: 'Work with us', path: '/work-with-us/' }]), faqSchema(FAQ), ...jobSchemas]} />
    </>
  );
}
