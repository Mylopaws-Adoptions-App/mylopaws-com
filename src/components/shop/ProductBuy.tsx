'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { askLink, inr, productPath, vetLink } from '@/lib/shop-core';
import { useCart } from './CartProvider';
import { ecommerce, whatsappClick } from '@/lib/track';
import { WhatsApp } from '../Icons';
import { logSearchClick } from '@/lib/shop-search';

export type BuyProps = {
  handle: string; title: string; brand: string | null; category: string | null; pack: string | null;
  price: number | null; mrp: number | null; img: string; rx: boolean;
  variants: { handle: string; label: string; price: number | null }[];
  varLabel?: string;
};

export function ProductBuy(p: BuyProps) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const save = p.price && p.mrp && p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  useEffect(() => {
    ecommerce('view_item', [{ item_id: p.handle, item_name: p.title, item_brand: p.brand, item_category: p.category, item_variant: p.pack, price: p.price ?? 0, quantity: 1 }]);
  }, [p.handle, p.title, p.brand, p.category, p.pack, p.price]);

  return (
    <div className="pb">
      {p.variants.length > 1 && (
        <div className="pb-var" role="group" aria-label={p.varLabel ?? 'Pack size'}>
          <span className="pb-lab">{p.varLabel ?? 'Pack size'}</span>
          <div className="chiprow wrapchips">
            {p.variants.map((v) => (
              <Link key={v.handle} href={productPath(v.handle)} className="chip" aria-pressed={v.handle === p.handle} replace scroll={false}>{v.label}{v.price ? <small>{inr(v.price)}</small> : null}</Link>
            ))}
          </div>
        </div>
      )}
      {p.price ? (
        <>
          <div className="pb-price"><b>{inr(p.price)}</b>{save >= 3 && p.mrp && <><s>{inr(p.mrp)}</s><span className="tag g">{save}% off</span></>}<small>Inclusive of all taxes</small></div>
          <div className="pb-row">
            <div className="qty" aria-label="Quantity">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase">+</button>
            </div>
            <button type="button" className="btn btn-primary pb-add" onClick={() => { logSearchClick(p.handle, true); add({ handle: p.handle, title: p.title, price: p.price!, mrp: p.mrp, img: p.img, rx: p.rx, brand: p.brand, category: p.category, pack: p.pack, qty }); }}>Add to cart</button>
          </div>
        </>
      ) : (
        <p className="muted">Price on request. Message us and we will confirm today&rsquo;s price.</p>
      )}
      <div className="pb-alt">
        <a className="btn btn-ghost" href={askLink(`${p.title}${p.pack ? ` (${p.pack})` : ''}`)} onClick={() => whatsappClick('product', p.title)}><WhatsApp size={18} /> Ask on WhatsApp</a>
        {p.rx && <a className="btn btn-ghost" href={vetLink(p.title)} onClick={() => whatsappClick('product', p.title, 'vet_consult_click')}>Talk to our vet</a>}
      </div>
      {p.rx && (
        <div className="rxbox">
          <b>Prescription required</b>
          <p>You will upload your vet&rsquo;s prescription at checkout, before payment. Don&rsquo;t have one? Our vet, Dr Amrita, can consult on WhatsApp for ₹650.</p>
        </div>
      )}
    </div>
  );
}

export function ListView({ items, name }: { items: { item_id: string; item_name: string; price?: number }[]; name: string }) {
  useEffect(() => { ecommerce('view_item_list', items.slice(0, 20), { item_list_name: name }); }, [items, name]);
  return null;
}
