'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/** The phone menu. Closes when a link is tapped, on a tap outside, on Escape and on any page change. Still opens without JS. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const el = useRef<HTMLDetailsElement>(null);
  const path = usePathname();
  const close = () => { if (el.current?.open) el.current.open = false; };
  useEffect(close, [path]);
  useEffect(() => {
    const onDoc = (e: Event) => {
      const d = el.current;
      if (!d?.open) return;
      if (e instanceof KeyboardEvent) { if (e.key === 'Escape') d.open = false; return; }
      if (!d.contains(e.target as Node)) d.open = false;
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onDoc);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onDoc); };
  }, []);
  return (
    <details ref={el} className="menu" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) close(); }}>
      {children}
    </details>
  );
}
