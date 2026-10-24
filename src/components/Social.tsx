import { SOCIAL } from '@/lib/site';
import { Arrow, Facebook, Google, Instagram, LinkedIn } from './Icons';
import { Reveal } from './Motion';

const CARDS = [
  { key: 'instagram', cls: 'ig', icon: <Instagram size={30} />, name: 'Instagram', handle: SOCIAL.instagram.handle, line: 'Reels, rides and happy pawfamilies, every week.', cta: 'Follow us', url: SOCIAL.instagram.url },
  { key: 'facebook', cls: 'fb', icon: <Facebook size={30} />, name: 'Facebook', handle: SOCIAL.facebook.handle, line: 'Updates, offers and our pet parent community.', cta: 'Like our page', url: SOCIAL.facebook.url },
  { key: 'google', cls: 'gg', icon: <Google size={30} />, name: 'Google', handle: SOCIAL.google.handle, line: 'Reviews, photos, hours and directions to our HSR Layout centre.', cta: 'Read reviews & get directions', url: SOCIAL.google.url },
] as const;

/** Social hub: Instagram, Facebook and the Dermacare Centre's Google Business Profile. */
export function SocialHub({ title, lead }: { title?: React.ReactNode; lead?: string }) {
  return (
    <section className="section tight">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <div className="eyebrow">Find us everywhere</div>
            <h2>{title ?? <>Say hello, <em>anywhere.</em></>}</h2>
          </div>
          <p className="lead">{lead ?? 'Follow along for pet moments and tips, or see what Bangalore pet parents say about our Dermacare Centre.'}</p>
        </Reveal>
        <div className="social-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.key} delay={i * 110}>
              <a className={`social-card ${c.cls}`} href={c.url} target="_blank" rel="noopener" aria-label={`${c.name}: ${c.cta}`}>
                <span className="social-ico">{c.icon}</span>
                <span className="social-name">{c.name}</span>
                <span className="social-handle">{c.handle}</span>
                <span className="social-line">{c.line}</span>
                <span className="social-cta">{c.cta} <Arrow size={16} /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Compact icon row for the footer. */
export function SocialIcons() {
  const items = [
    { url: SOCIAL.instagram.url, label: 'Mylopaws on Instagram', icon: <Instagram size={19} /> },
    { url: SOCIAL.facebook.url, label: 'Mylopaws on Facebook', icon: <Facebook size={19} /> },
    { url: SOCIAL.google.url, label: 'Mylopaws Dermacare Centre on Google', icon: <Google size={19} /> },
    { url: SOCIAL.linkedin.url, label: 'Mylopaws on LinkedIn', icon: <LinkedIn size={18} /> },
  ];
  return (
    <div className="social-icons">
      {items.map((it) => (
        <a key={it.url} href={it.url} target="_blank" rel="noopener" aria-label={it.label}>{it.icon}</a>
      ))}
    </div>
  );
}
