'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from '../Icons';
import { Card, CONCERNS } from '@/lib/shop-core';
import { ProductCard } from './ProductCard';
import { track } from '@/lib/track';

type Sort = 'featured' | 'low' | 'high' | 'save';
const PAGE = 24;

export function ShopBrowser({ items, concernCounts }: { items: Card[]; concernCounts: [string, number][] }) {
  const sp = useSearchParams();
  const [q, setQ] = useState('');
  const [pet, setPet] = useState<string>(sp.get('pet') ?? 'all');
  const [concern, setConcern] = useState<string>(sp.get('concern') ?? 'all');
  const [cat, setCat] = useState<string>('all');
  const [brand, setBrand] = useState<string>(sp.get('brand') ?? 'all');
  const [sort, setSort] = useState<Sort>('featured');
  const [rxOnly, setRxOnly] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const first = useRef(true);

  const cats = useMemo(() => [...new Set(items.map((p) => p.c ?? 'Other'))].sort(), [items]);
  const brands = useMemo(() => [...new Set(items.map((p) => p.b).filter(Boolean) as string[])].sort(), [items]);

  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const out = items.filter((p) =>
      (pet === 'all' || p.pt === pet || p.pt === 'both') &&
      (concern === 'all' || p.cn.includes(concern)) &&
      (cat === 'all' || p.c === cat) &&
      (brand === 'all' || p.b === brand) &&
      (!rxOnly || p.rx) &&
      words.every((w) => `${p.t} ${p.b} ${p.c} ${p.cn.join(' ')}`.toLowerCase().includes(w)));
    const price = (p: Card) => p.p ?? Infinity;
    const sv = (p: Card) => (p.p && p.m ? p.m - p.p : 0);
    if (sort === 'low') out.sort((a, b) => price(a) - price(b));
    else if (sort === 'high') out.sort((a, b) => (b.p ?? 0) - (a.p ?? 0));
    else if (sort === 'save') out.sort((a, b) => sv(b) - sv(a));
    else out.sort((a, b) => Number(b.best) - Number(a.best) || Number(b.f) - Number(a.f) || a.r - b.r || a.t.localeCompare(b.t));
    return out;
  }, [items, q, pet, concern, cat, brand, sort, rxOnly]);

  useEffect(() => { setLimit(PAGE); }, [q, pet, concern, cat, brand, sort, rxOnly]);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => track('filter_apply', { pet, concern, category: cat, brand, sort, rx_only: rxOnly, search: q || undefined, results: shown.length }), 600);
    return () => clearTimeout(t);
  }, [pet, concern, cat, brand, sort, rxOnly, q, shown.length]);

  const pickConcern = (c: string) => { setConcern(c); if (c !== 'all') track('concern_select', { concern: c }); };
  const active = pet !== 'all' || concern !== 'all' || cat !== 'all' || brand !== 'all' || rxOnly || q;
  const reset = () => { setQ(''); setPet('all'); setConcern('all'); setCat('all'); setBrand('all'); setRxOnly(false); };

  return (
    <div id="catalogue">
      <div className="shop-bar">
        <div className="wrap">
          <label className="shop-search">
            <Search />
            <span className="sr-only">Search the shop</span>
            <input type="search" placeholder="Search tick care, shampoo, brand..." value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="shop-filters">
            <select aria-label="Pet" value={pet} onChange={(e) => setPet(e.target.value)}><option value="all">Dogs & cats</option><option value="dog">Dogs</option><option value="cat">Cats</option></select>
            <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)}><option value="all">All categories</option>{cats.map((c) => <option key={c}>{c}</option>)}</select>
            <select aria-label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)}><option value="all">All brands</option>{brands.map((b) => <option key={b}>{b}</option>)}</select>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}><option value="featured">Popular first</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="save">Biggest savings</option></select>
          </div>
          <div className="chiprow" role="group" aria-label="Shop by concern">
            <button className="chip" aria-pressed={concern === 'all'} onClick={() => pickConcern('all')}>All concerns</button>
            {concernCounts.map(([c, n]) => (
              <button key={c} className="chip" aria-pressed={concern === c} onClick={() => pickConcern(c)}>{CONCERNS[c]?.label ?? c}<small>{n}</small></button>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="shop-meta">
          <span>{shown.length} product{shown.length === 1 ? '' : 's'}</span>
          <label className="chk"><input type="checkbox" checked={rxOnly} onChange={(e) => setRxOnly(e.target.checked)} /> Prescription medicines only</label>
          {active && <button type="button" className="linkbtn" onClick={reset}>Clear filters</button>}
        </div>
        {shown.length === 0 ? (
          <div className="empty">Nothing matches yet. Message us on WhatsApp and we will usually source it within a day or two.</div>
        ) : (
          <>
            <div className="sp-grid">{shown.slice(0, limit).map((p) => <ProductCard key={p.h} p={p} list="Shop" />)}</div>
            {shown.length > limit && <div className="more-row"><button type="button" className="btn btn-ghost" onClick={() => setLimit((l) => l + PAGE * 2)}>Show more ({shown.length - limit} left)</button></div>}
          </>
        )}
      </div>
    </div>
  );
}
