import Link from 'next/link';
import type { ReactNode } from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { Arrow } from './Icons';

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((c, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span aria-hidden="true">/</span>
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero(props: { eyebrow?: string; title: ReactNode; lead?: ReactNode; crumbs?: { href?: string; label: string }[]; children?: ReactNode; long?: boolean; sol?: 'travel' | 'dermacare' | 'homes' | 'shopping' }) {
  return (
    <section className="page-hero" data-sol={props.sol}>
      <div className="wrap">
        {props.crumbs && <Crumbs items={props.crumbs} />}
        {props.eyebrow && <div className="eyebrow rise">{props.eyebrow}</div>}
        <h1 className={`rise d1${props.long ? ' long' : ''}`}>{props.title}</h1>
        {props.lead && <p className="lead rise d2">{props.lead}</p>}
        {props.children && <div className="rise d3">{props.children}</div>}
      </div>
    </section>
  );
}

export function CtaBand(props: { title: ReactNode; text: ReactNode; href: string; label: string; secondary?: { href: string; label: string } }) {
  return (
    <section className="section tight">
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
          </div>
          <div className="btn-row">
            <a className="btn btn-yellow" href={props.href}>{props.label} <Arrow /></a>
            {props.secondary && <Link className="btn btn-light" href={props.secondary.href}>{props.secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** Image slot: shows the photo if it exists in /public (fetched at build from Supabase), otherwise a branded panel. */
export function Slot({ caption, tone, src, alt }: { caption: string; tone?: 'y'; src?: string; alt?: string }) {
  if (src && !fs.existsSync(path.join(process.cwd(), 'public', src))) src = undefined;
  return (
    <div className={`slot${tone ? ` ${tone}` : ''}`} role={src ? undefined : 'presentation'}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? caption} loading="lazy" draggable={false} />
      )}
      {!src && <div className="slot-cap">{caption}</div>}
    </div>
  );
}

/** Returns the path if the brand photo exists in /public (fetched at build), else undefined. */
export function photo(src: string) {
  return fs.existsSync(path.join(process.cwd(), 'public', src)) ? src : undefined;
}

/** Protected brand photo (no drag, no long-press save). */
export function Photo({ src, alt, eager }: { src?: string; alt: string; eager?: boolean }) {
  if (!src) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} draggable={false} />;
}

/** Answer-first block for AI answer engines and skimmers: the question people ask, answered in two sentences. */
export function QuickAnswer({ q, children }: { q: string; children: ReactNode }) {
  return (
    <section className="quick" aria-label="Quick answer">
      <div className="wrap">
        <div className="quick-box">
          <span className="quick-tag">Quick answer</span>
          <h2>{q}</h2>
          <p>{children}</p>
        </div>
      </div>
    </section>
  );
}
