'use client';

import { useMemo, useState } from 'react';
import { animated, useTransition, useReducedMotion } from '@react-spring/web';
import { Arrow, Search } from './Icons';
import type { Product } from '@/lib/shop';

export function ShopCatalogue({ items, orderBase, orderIsWhatsApp }: { items: Product[]; orderBase: string; orderIsWhatsApp: boolean }) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<string>('All');
  const [q, setQ] = useState('');
  const cats = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of items) m.set(p.category ?? 'Other', (m.get(p.category ?? 'Other') ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);
  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((p) => (cat === 'All' || p.category === cat) && words.every((w) => `${p.title} ${p.category}`.toLowerCase().includes(w)));
  }, [items, cat, q]);
  const transitions = useTransition(shown.slice(0, 120), {
    keys: (p) => p.handle,
    from: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 0, immediate: true },
    trail: reduce ? 0 : 12,
    config: { tension: 260, friction: 26 },
  });
  const order = (title: string) => {
    if (!orderIsWhatsApp) return orderBase;
    const u = new URL(orderBase);
    u.searchParams.set('text', `Hi Mylopaws, I'd like to order: ${title}`);
    return u.toString();
  };
  return (
    <>
      <div className="shop-bar">
        <div className="wrap">
          <label className="shop-search">
            <Search />
            <span className="sr-only">Search the pharmacy</span>
            <input type="search" placeholder="Search tick care, shampoo, supplements..." value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="chiprow" role="group" aria-label="Filter by category">
            <button className="chip" aria-pressed={cat === 'All'} onClick={() => setCat('All')}>All<small>{items.length}</small></button>
            {cats.map(([c, n]) => (
              <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}<small>{n}</small></button>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap">
        {shown.length === 0 ? (
          <div className="empty">Nothing matches yet. Message us and we will usually source it within a day or two.</div>
        ) : (
          <>
            <div className="prod-grid">
              {transitions((style, p) => (
                <animated.a className="prod" href={order(p.title)} style={{ opacity: style.opacity, transform: style.y.to((v) => `translateY(${v}px)`) }}>
                  <span className="prod-img">
                    {p.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.title} loading="lazy" width={240} height={240} draggable={false} />
                    )}
                  </span>
                  <span className="cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  {p.rx_required && <span className="tag y">Prescription needed</span>}
                  <span className="ask">Ask &amp; order <Arrow size={14} /></span>
                </animated.a>
              ))}
            </div>
            {shown.length > 120 && <p className="muted" style={{ marginTop: 20 }}>Showing 120 of {shown.length}. Search or pick a category to narrow it down.</p>}
          </>
        )}
      </div>
    </>
  );
}
