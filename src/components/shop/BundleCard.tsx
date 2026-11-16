'use client';

import { inr } from '@/lib/shop-core';
import { useCart } from './CartProvider';

export type BundleView = { slug: string; title: string; blurb: string | null; disc: number; items: { title: string; qty: number; price: number; mrp: number | null; img: string }[] };

const r2 = (n: number) => Math.round(n * 100) / 100;

export function BundleCard({ b }: { b: BundleView }) {
  const { add } = useCart();
  const price = r2(b.items.reduce((t, i) => t + r2(i.price * (1 - b.disc / 100)) * i.qty, 0));
  const was = r2(b.items.reduce((t, i) => t + (i.mrp ?? i.price) * i.qty, 0));
  const imgs = b.items.map((i) => i.img).filter(Boolean).slice(0, 4);
  return (
    <article className="bundle">
      <div className="bundle-imgs">{imgs.map((s, n) => /* eslint-disable-next-line @next/next/no-img-element */ <img key={n} src={s} alt="" width={80} height={80} loading="lazy" />)}</div>
      <h3>{b.title}</h3>
      {b.blurb && <p className="muted small">{b.blurb}</p>}
      <ul>{b.items.map((i) => <li key={i.title}>{i.qty} × {i.title}</li>)}</ul>
      <div className="sp-price"><b>{inr(price)}</b>{was > price && <s>{inr(was)}</s>}<span className="tag g">Bundle: save {Math.round((1 - price / was) * 100)}%</span></div>
      <button type="button" className="btn btn-primary" onClick={() => add({ bundle: b.slug, title: b.title, price, mrp: was, img: imgs[0] ?? '', rx: false })}>Add bundle to cart</button>
    </article>
  );
}
