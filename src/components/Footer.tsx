import Link from 'next/link';
import { CONTACT, SITE, SOLUTIONS, bookLink } from '@/lib/site';
import { Wordmark } from './Logo';
import { BookMenu } from './BookMenu';
import { SocialIcons } from './Social';

export function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Wordmark />
            <p style={{ maxWidth: '36ch', margin: 0, color: '#cdb8c5' }}>
              A solutions platform for Bangalore&rsquo;s pawfamilies: {SOLUTIONS.map((s) => s.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}. Made in Bengaluru.
            </p>
            <SocialIcons />
            <div style={{ marginTop: 20 }}>
              <BookMenu label="Book on WhatsApp" tone="yellow" up />
            </div>
          </div>
          <div>
            <h2 className="foot-h">Solutions</h2>
            <ul>
              <li><Link href="/travel/">Travel: pet cabs</Link></li>
              <li><Link href="/dermacare/">Dermacare: skin &amp; fur</Link></li>
              <li><Link href="/homes/">Homes: cat boarding</Link></li>
              <li><Link href="/shopping/">Shopping: pet pharmacy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="foot-h">Read</h2>
            <ul>
              <li><Link href="/pawprints/">Pawprints blog</Link></li>
              <li><Link href="/pet-friendly-resorts-near-bangalore/">Pet-friendly resorts</Link></li>
              <li><Link href="/bangalore-pet-sitters-directory/">Pet sitters directory</Link></li>
              <li><Link href="/about/">About Mylopaws</Link></li>
              <li><Link href="/careers/">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="foot-h">Reach us</h2>
            <ul>
              <li><a href={`tel:${CONTACT.travel.phone.replace(/\s/g, '')}`}>Travel {CONTACT.travel.phone}</a></li>
              <li><a href={`tel:${CONTACT.dermacare.phone.replace(/\s/g, '')}`}>Dermacare {CONTACT.dermacare.phone}</a></li>
              <li><a href={`tel:${CONTACT.homes.phone.replace(/\s/g, '')}`}>Homes &amp; Shopping {CONTACT.homes.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Link href="/contact/">HSR Layout, Bengaluru</Link></li>
            </ul>
          </div>
        </div>
        <p className="foot-vision" aria-hidden="true">Strong, tightly bonded <span>pawfamilies.</span></p>
        <div className="foot-base">
          <span>&copy; {y} Mylopaws. All rights reserved.</span>
          <span>
            <Link href="/privacy-policy/">Privacy</Link> &middot; <Link href="/terms-of-service/">Terms</Link> &middot;{' '}
            <Link href="/cancellation-refund-policy/">Refunds</Link> &middot; <Link href="/shipping-delivery-policy/">Delivery</Link> &middot;{' '}
            <Link href="/data-deletion/">Data deletion</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
