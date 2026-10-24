'use client';

import { useEffect, useRef } from 'react';
import { BOOK_LINES, bookLink } from '@/lib/site';
import { WhatsApp } from './Icons';

/** "Book" button that opens a small menu of the three WhatsApp lines. Works without JS (details/summary). */
export function BookMenu({ label = 'Book on WhatsApp', tone = 'primary', align = 'left', up = false }: { label?: string; tone?: 'primary' | 'yellow'; align?: 'left' | 'right'; up?: boolean }) {
  const el = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (e: Event) => {
      const d = el.current;
      if (!d?.open) return;
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !d.contains(e.target as Node)) d.open = false;
    };
    document.addEventListener('click', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, []);
  return (
    <details ref={el} className={`bookmenu${align === 'right' ? ' r' : ''}${up ? ' up' : ''}`}>
      <summary className={`btn btn-${tone}`}>
        <WhatsApp size={18} /> {label}
      </summary>
      <div className="bookmenu-panel" role="menu">
        <span className="bookmenu-h">Chat with the right team</span>
        <BookList />
      </div>
    </details>
  );
}

export function BookList() {
  return (
    <div className="booklist">
      {BOOK_LINES.map((l) => (
        <a key={l.intent} className="booklist-item" data-sol={l.intent} href={bookLink(l.intent)} target="_blank" rel="noopener" role="menuitem">
          <span className="booklist-ico"><WhatsApp size={20} /></span>
          <span className="booklist-txt">
            <b>{l.name}</b>
            <small>{l.sub} · {l.phone}</small>
          </span>
        </a>
      ))}
    </div>
  );
}
