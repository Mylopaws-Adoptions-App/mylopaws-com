import { Suspense } from 'react';
import { PageHero } from '@/components/Blocks';
import { OrderView } from '@/components/shop/OrderView';
import { meta } from '@/lib/seo';

export const metadata = meta({ title: 'Your Mylopaws order | Mylopaws Shopping', description: 'Track your Mylopaws pet pharmacy order. We update you on WhatsApp at every step.', path: '/shopping/order/', noindex: true });

export default function OrderPage() {
  return (
    <>
      <PageHero sol="shopping" crumbs={[{ href: '/shopping/', label: 'Shopping' }, { label: 'Your order' }]} title={<>Your <em>order</em></>} />
      <section className="section tight"><Suspense fallback={<div className="wrap"><div className="empty">Loading...</div></div>}><OrderView /></Suspense></section>
    </>
  );
}
