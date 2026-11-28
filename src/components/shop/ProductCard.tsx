'use client';

import Link from 'next/link';
import { Card, askLink, inr, productPath } from '@/lib/shop-core';
import { useCart, toItem } from './CartProvider';
import { ecommerce, track, whatsappClick } from '@/lib/track';
import { logSearchClick } from '@/lib/shop-search';
import { feedId } from '@/lib/feed-id';

export function ProductCard({ p, list }: { p: Card; list?: string }) {
  const { add, lines, setQty, remove } = useCart();
  const line = lines.find((l) => l.key === `h:${p.h}`);
  const save = p.p && p.m && p.m > p.p ? Math.round((1 - p.p / p.m) * 100) : 0;
  return (
    <article className="sp">
      <Link href={productPath(p.h)} className="sp-link" onClick={() => { logSearchClick(p.h); track('select_item', { item_list_name: list, items: [{ item_id: feedId(p.h), item_name: p.t }] }); }}>
        <span className="sp-img">
          {save >= 3 && <span className="sp-save">{save}% off</span>}
          {p.i && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.i} alt={p.t} loading="lazy" width={240} height={240} draggable={false} />
          )}
        </span>
        <span className="sp-brand">{p.b ?? p.c}</span>
        <h3>{p.t}</h3>
        {p.rx && <span className="tag y">Prescription required</span>}
      </Link>
      <div className="sp-foot">
        {p.p ? (
          <>
            <div className="sp-price"><b>{inr(p.p)}</b>{save >= 3 && p.m && <s>{inr(p.m)}</s>}</div>
            {p.sz ? (
              <Link href={productPath(p.h)} className="btn btn-primary sp-add" onClick={() => logSearchClick(p.h, true)}>Choose size</Link>
            ) : (
            line ? (
              <div className="sp-step" role="group" aria-label={`${p.t} quantity in cart`}>
                <button type="button" aria-label="Remove one" onClick={() => (line.qty <= 1 ? remove(line.key) : setQty(line.key, line.qty - 1))}>−</button>
                <span aria-live="polite"><b>{line.qty}</b> in cart</span>
                <button type="button" aria-label="Add one" disabled={line.qty >= 20} onClick={() => { setQty(line.key, line.qty + 1); ecommerce('add_to_cart', [toItem({ ...line, qty: 1 })]); }}>+</button>
              </div>
            ) : (
            <button
              type="button"
              className="btn btn-primary sp-add"
              onClick={() => { logSearchClick(p.h, true); add({ handle: p.h, title: p.t, price: p.p!, mrp: p.m, img: p.i, rx: p.rx, brand: p.b, category: p.c, pack: p.pk }); }}
            >
              Add to cart
            </button>
            )
            )}
          </>
        ) : (
          <a className="btn btn-ghost sp-add" href={askLink(p.t)} onClick={() => whatsappClick('card', p.t)}>Ask on WhatsApp</a>
        )}
      </div>
    </article>
  );
}
