import Link from 'next/link';
import { Arrow, Bag, Car, Home, Leaf, Paw } from '@/components/Icons';
import { CtaBand, Faq, JsonLd, Photo, faqSchema, photo } from '@/components/Blocks';
import { CountUp, Reveal, TiltLink } from '@/components/Motion';
import { VideoHero } from '@/components/VideoHero';
import { HERO_CLIPS } from '@/lib/media';
import { appLink } from '@/lib/site';
import { meta } from '@/lib/seo';
import { allPosts, CATEGORIES } from '@/lib/posts';
import { THERAPIES } from '@/lib/therapies';
import { catalogue } from '@/lib/shop';

export const revalidate = 3600;

export const metadata = meta({
  title: 'Mylopaws Bangalore: Pet Travel, Dermacare, Homes & Shop',
  description: 'Pet-friendly cabs, skin and fur therapies, home-style cat boarding and a pet pharmacy in Bangalore. One platform for strong, tightly bonded pawfamilies.',
  path: '/',
});

const FAQ = [
  { q: 'What is Mylopaws?', a: 'Mylopaws is a Bangalore pet solutions platform. Our vision is to create strong and tightly bonded pawfamilies, so we solve the moments that get in the way: getting your pet somewhere, keeping their skin and fur healthy, caring for them when you travel, and getting the right products to your door.' },
  { q: 'Which areas of Bangalore do you serve?', a: 'Mylopaws Travel covers all of Bangalore and outstation trips across India. Dermacare runs from our salon in HSR Layout, with doorstep sessions in many areas. Homes is in Bangalore, and the pet pharmacy delivers across the city.' },
  { q: 'How do I book?', a: 'Book Travel, Dermacare or Homes on the Mylopaws app at mylopaws.app. Our team confirms every booking with you on WhatsApp.' },
  { q: 'Why don’t you show prices on the site?', a: 'Every pet, route, skin condition and prescription is different. We quote once we know what your pet needs, so there are no surprises later.' },
  { q: 'Do you work with cats too?', a: 'Yes. Cats ride in our cabs, get Dermacare therapies, shop from the pharmacy, and Mylopaws Homes is currently focused on cat boarding.' },
];

export default async function HomePage() {
  const posts = allPosts().slice(0, 3);
  const products = (await catalogue()).length;
  const productStat = products >= 50 ? Math.floor(products / 50) * 50 : 0;

  const nodes = [
    { href: '/travel/', sol: 'travel', title: 'Travel', sub: 'Cabs that expect a dog', icon: <Car size={24} /> },
    { href: '/dermacare/', sol: 'dermacare', title: 'Dermacare', sub: 'Skin & fur, treated', icon: <Leaf size={24} /> },
    { href: '/homes/', sol: 'homes', title: 'Homes', sub: 'A home while you travel', icon: <Home size={24} /> },
    { href: '/shopping/', sol: 'shopping', title: 'Shopping', sub: 'Pharmacy, delivered', icon: <Bag size={24} /> },
  ];

  return (
    <>
      <VideoHero
        clips={HERO_CLIPS}
        eyebrow="Mylopaws: A Solution Driven Platform"
        title="Create strong & tightly bonded"
        accent="pawfamilies."
        lead="Everything that keeps you and your pet close, solved in one place: a cab that welcomes your dog, therapies that heal the skin, a calm home when you travel, and the right medicines at your door."
        actions={
          <>
            <a className="btn btn-yellow" href={appLink('general')}>Book on the Mylopaws app <Arrow /></a>
            <a className="btn btn-light" href="#solutions">Explore the solutions</a>
          </>
        }
        tabs={nodes.map((n) => ({ sol: n.sol, href: n.href, name: n.title, short: n.sub, icon: n.icon }))}
      />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) =>
            ['Cabs that never refuse a dog', `${THERAPIES.length} specialist skin & fur therapies`, 'Home-style cat boarding', 'Vet-prescribed medicines, delivered', 'Booked on one app', 'Confirmed on WhatsApp', 'Made in Bengaluru'].map((t) => (
              <span key={`${k}-${t}`}><Paw /> {t}</span>
            )),
          )}
        </div>
      </div>

      <section className="section" id="solutions">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">Four solutions, one promise</div>
              <h2>Built around the <em>bond</em>, not the booking.</h2>
            </div>
            <p className="lead">The moments that strain life with a pet are practical ones. We built a dedicated solution for each, run by people who specialise in it.</p>
          </Reveal>
          <div className="bento">
            <TiltLink href="/travel/" className="sol" sol="travel" ariaLabel="Mylopaws Travel: pet-friendly cabs">
              <div>
                <div className="sol-top">
                  <span className="sol-ico"><Car size={26} /></span>
                  <span className="sol-go"><Arrow /></span>
                </div>
                <h3 style={{ marginTop: 22 }}>Travel</h3>
                <p>Dedicated pet cabs and drivers who expect fur, crates and the occasional nervous passenger. Vet visits, airport runs and road trips across India.</p>
                <div className="chips"><span>City rides</span><span>Vet visits</span><span>Airport (BLR)</span><span>Outstation</span></div>
              </div>
              {photo('/images/travel-hiker.webp') && <div className="sol-photo"><Photo src={photo('/images/travel-hiker.webp')} alt="A hiker on a trail with two dogs" /></div>}
            </TiltLink>
            <TiltLink href="/dermacare/" className="sol" sol="dermacare" ariaLabel="Mylopaws Dermacare: skin and fur therapies">
              <div className="sol-top">
                <span className="sol-ico"><Leaf size={26} /></span>
                <span className="sol-go"><Arrow /></span>
              </div>
              <div>
                <h3>Dermacare</h3>
                <p>{THERAPIES.length} therapies for ticks, infections, allergies, shedding and dull fur. HSR Layout salon or at your door.</p>
              </div>
            </TiltLink>
            <TiltLink href="/homes/" className="sol" sol="homes" ariaLabel="Mylopaws Homes: home-style cat boarding">
              <div className="sol-top">
                <span className="sol-ico"><Home size={26} /></span>
                <span className="sol-go"><Arrow /></span>
              </div>
              <div>
                <h3>Homes</h3>
                <p>A calm, home-style stay for your cat while you are away: familiar food, quiet spaces and updates every day.</p>
              </div>
            </TiltLink>
            <TiltLink href="/shopping/" className="sol wide" sol="shopping" ariaLabel="Mylopaws Shopping: pet pharmacy">
              <div>
                <div className="sol-top" style={{ justifyContent: 'flex-start' }}>
                  <span className="sol-ico"><Bag size={26} /></span>
                </div>
                <h3 style={{ marginTop: 22 }}>Shopping</h3>
                <p>A pet pharmacy that delivers: tick and flea care, supplements, shampoos, food and vet-prescribed medicines, across Bangalore or ready to collect in HSR Layout.</p>
                <div className="chips"><span>Antiparasitic</span><span>Supplements</span><span>Skin &amp; fur care</span><span>Prescription medicines</span></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span className="btn btn-primary">Browse the pharmacy <Arrow /></span>
              </div>
            </TiltLink>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="stats">
              <div className="stat"><CountUp value={4} /><span>solutions on one platform</span></div>
              <div className="stat"><CountUp value={THERAPIES.length} /><span>specialist skin &amp; fur therapies</span></div>
              <div className="stat"><CountUp value={18} suffix=" hrs" /><span>a day of pet cabs, 6 am to midnight</span></div>
              {productStat ? (
                <div className="stat"><CountUp value={productStat} suffix="+" /><span>pet pharmacy products in stock</span></div>
              ) : (
                <div className="stat"><b>1</b><span>app to book it all</span></div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section ink">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">Why pawfamilies stay with us</div>
              <h2>Solutions, not <em>services.</em></h2>
            </div>
            <p className="lead">A service does a job. A solution removes the reason you were worried in the first place.</p>
          </Reveal>
          <div className="pillars">
            <Reveal className="pillar" delay={0}>
              <b>01</b>
              <h3>Specialists for each need</h3>
              <p>Drivers who handle pets every day. Dermacare specialists who read skin before they touch it. A pharmacy that stocks what vets prescribe.</p>
            </Reveal>
            <Reveal className="pillar" delay={120}>
              <b>02</b>
              <h3>Built for Bangalore</h3>
              <p>Monsoon ticks, apartment life, airport runs at 4 am and weekend drives to Coorg. Our solutions are shaped by how this city lives with pets.</p>
            </Reveal>
            <Reveal className="pillar" delay={240}>
              <b>03</b>
              <h3>One app, one team</h3>
              <p>Book any solution on the Mylopaws app and a real person confirms it with you on WhatsApp. No call centres, no surprises.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <div className="slot">
              <Photo src={photo('/images/vet-dog.webp')} alt="A specialist examining a dog's skin" />
              <div className="slot-cap">Itching isn&rsquo;t a grooming problem. It&rsquo;s a skin problem.</div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="eyebrow">How it works</div>
            <h2>Three steps to a <em>calmer</em> pet.</h2>
            <div className="steps" style={{ marginTop: 24 }}>
              <div className="step"><div><h3>Pick a solution on the app</h3><p>Travel, Dermacare or Homes. Tell us about your pet and what you need.</p></div></div>
              <div className="step"><div><h3>We confirm on WhatsApp</h3><p>A specialist checks the details, answers questions and shares a quote.</p></div></div>
              <div className="step"><div><h3>Your pet is looked after</h3><p>The right person, the right vehicle or the right therapy, with updates along the way.</p></div></div>
            </div>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href={appLink('general')}>Open the Mylopaws app <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">Pawprints</div>
              <h2>Fresh from the <em>blog.</em></h2>
            </div>
            <p><Link className="btn btn-ghost" href="/pawprints/">All articles <Arrow /></Link></p>
          </Reveal>
          <div className="grid grid-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link className="card" href={`/${p.slug}/`} style={{ height: '100%' }}>
                  <span className="tag">{CATEGORIES[p.category].name}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="more">{p.readMins} min read <Arrow size={14} /></span>
                </Link>
              </Reveal>
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
        title={<>Your pawfamily, <em>sorted.</em></>}
        text="Book Travel, Dermacare or Homes in a couple of taps. We confirm everything with you on WhatsApp."
        href={appLink('general')}
        label="Open the Mylopaws app"
        secondary={{ href: '/shopping/', label: 'Visit the pharmacy' }}
      />
      <JsonLd data={faqSchema(FAQ)} />
    </>
  );
}
