'use client';

import Link from 'next/link';
import { Bag } from '../Icons';
import { useCart } from './CartProvider';

export function CartLink() {
  const { count, ready } = useCart();
  return (
    <Link href="/shopping/cart/" className="cart-link" aria-label={`Cart${ready && count ? `, ${count} item${count === 1 ? '' : 's'}` : ''}`}>
      <Bag size={22} />
      {ready && count > 0 && <span className="cart-badge">{count > 99 ? '99+' : count}</span>}
    </Link>
  );
}
