'use client';

import { useEffect } from 'react';

/** Turns the post's "Show map" tiles into real Google Maps embeds when tapped. */
export function MapLoader() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>('.map-load');
      if (!btn) return;
      const src = btn.dataset.src ?? '';
      if (!src.startsWith('https://www.google.com/maps')) return;
      const f = document.createElement('iframe');
      f.src = src;
      f.title = `Map: ${btn.dataset.title ?? ''}`;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      btn.parentElement?.replaceChildren(f);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
