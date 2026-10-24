import { JsonLd, PageHero } from '@/components/Blocks';
import { Clock, Mail, Phone, Pin } from '@/components/Icons';
import { LeadForm } from '@/components/LeadForm';
import { CONTACT, SITE, appLink, waLink } from '@/lib/site';
import { breadcrumbSchema, meta } from '@/lib/seo';

export const metadata = meta({
  title: 'Contact Mylopaws: Travel, Dermacare & Homes, Bangalore',
  description: 'Reach Mylopaws Travel and Dermacare on WhatsApp or phone, visit our HSR Layout salon, or send us a message. Bengaluru pet services.',
  path: '/contact/',
});

export default function ContactPage() {
  const map = `https://www.google.com/maps/search/?api=1&query=${CONTACT.address.lat},${CONTACT.address.lng}`;
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title={<>Talk to a <em>real</em> person.</>}
        lead="The fastest way to book is the Mylopaws app. For questions, our teams reply on WhatsApp."
      >
        <a className="btn btn-primary" href={appLink('general')}>Book on the app</a>
      </PageHero>
      <section className="section">
        <h2 className="sr-only">Ways to reach us</h2>
        <div className="wrap grid grid-3">
          <div className="card">
            <span className="tag">Travel</span>
            <h3>Pet cabs</h3>
            <p style={{ display: 'flex', gap: 10 }}><Phone /> <a href={`tel:${CONTACT.travel.phone.replace(/\s/g, '')}`}>{CONTACT.travel.phone}</a></p>
            <p style={{ display: 'flex', gap: 10 }}><Clock /> {CONTACT.travel.hours}</p>
            <a className="btn btn-ghost" href={waLink(CONTACT.travel.wa, 'Hi Mylopaws Travel, I need a pet-friendly cab.')}>WhatsApp Travel</a>
          </div>
          <div className="card">
            <span className="tag y">Dermacare</span>
            <h3>Skin &amp; fur therapies</h3>
            <p style={{ display: 'flex', gap: 10 }}><Phone /> <a href={`tel:${CONTACT.dermacare.phone.replace(/\s/g, '')}`}>{CONTACT.dermacare.phone}</a></p>
            <p style={{ display: 'flex', gap: 10 }}><Clock /> {CONTACT.dermacare.hours}</p>
            <a className="btn btn-ghost" href={waLink(CONTACT.dermacare.wa, 'Hi Mylopaws Dermacare, I would like to book a therapy.')}>WhatsApp Dermacare</a>
          </div>
          <div className="card">
            <span className="tag b">Salon &amp; office</span>
            <h3>HSR Layout</h3>
            <p style={{ display: 'flex', gap: 10 }}><Pin /> {CONTACT.address.street}, {CONTACT.address.locality}, {CONTACT.address.region} {CONTACT.address.postalCode}</p>
            <p style={{ display: 'flex', gap: 10 }}><Mail /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <a className="btn btn-ghost" href={map} target="_blank" rel="noopener">Open in Google Maps</a>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <div className="eyebrow">Write to us</div>
            <h2>Send a <em>message.</em></h2>
            <p className="lead">Partnerships, feedback, press or anything else. We reply within one working day.</p>
            <p className="muted">Grievances and data requests: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See our <a href="/data-deletion/">data deletion</a> page.</p>
          </div>
          <div className="card"><LeadForm kind="contact" topics={['Travel', 'Dermacare', 'Homes', 'Shop & pharmacy', 'Partnership', 'Feedback', 'Something else']} /></div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: 'Contact', path: '/contact/' }])} />
    </>
  );
}
