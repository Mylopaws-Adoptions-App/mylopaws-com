import { PageHero } from '@/components/Blocks';
import { CartView } from '@/components/shop/CartView';
import { meta } from '@/lib/seo';

export const metadata = meta({ title: 'Your cart and checkout | Mylopaws Shopping', description: 'Review your Mylopaws Shopping cart and pay securely. Free delivery on orders over ₹3,000 across Bangalore.', path: '/shopping/cart/', noindex: true });

export default function CartPage() {
  return (
    <>
      <PageHero sol="shopping" crumbs={[{ href: '/shopping/', label: 'Shopping' }, { label: 'Cart' }]} title={<>Your <em>cart</em></>} />
      <section className="section tight"><CartView /></section>
    </>
  );
}
