'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { applyConsent, captureAttribution, getConsent, loadMetaPixel } from '@/lib/track';

/** DPDP-style notice: analytics always on (anonymous); advertising cookies and the Meta Pixel only after "Accept". */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    captureAttribution();
    const c = getConsent();
    if (c === null) setOpen(true);
    else if (c === 'granted') loadMetaPixel();
  }, []);
  if (!open) return null;
  const choose = (v: 'granted' | 'denied') => { applyConsent(v); setOpen(false); };
  return (
    <div className="consent" role="dialog" aria-label="Cookie preferences">
      <p>We use cookies to run the shop and measure what works. With your OK we also use advertising cookies to show you relevant Mylopaws offers. See our <Link href="/privacy-policy/">privacy policy</Link>.</p>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>Accept all</button>
        <button type="button" className="btn btn-ghost" onClick={() => choose('denied')}>Essential only</button>
      </div>
    </div>
  );
}
