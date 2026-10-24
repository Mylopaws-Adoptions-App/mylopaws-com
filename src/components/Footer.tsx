import Link from 'next/link';
import { CONTACT, SITE, appLink } from '@/lib/site';

export function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h2 className="foot-h">Mylopaws</h2>
            <p style={{ maxWidth: '34ch', margin: 0 }}>{SITE.tagline} {SITE.verticals} Made in Bengaluru, for Bengaluru&rsquo;s pawfamilies.</p>
            <p style={{ marginTop: 18 }}>
              <a className="btn btn-yellow" href={appLink('general')}>Book on the app</a>
            </p>
          </div>
          <div>
            <h2 className="foot-h">Services</h2>
            <ul>
              <li><Link href="/travel/">Travel: pet cabs</Link></li>
              <li><Link href="/dermacare/">Dermacare: skin &amp; fur</Link></li>
              <li><Link href="/homes/">Homes: cat boarding</Link></li>
              <li><Link href="/shopping/">Pet pharmacy &amp; shop</Link></li>
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
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Link href="/contact/">HSR Layout, Bengaluru</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-word" aria-hidden="true">pawfamilies<span>.</span></div>
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
