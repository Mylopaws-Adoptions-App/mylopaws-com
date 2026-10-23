import { LegalPage, legalMeta } from '@/lib/legal';

export const metadata = legalMeta('shipping-delivery-policy');
export default function Page() {
  return <LegalPage slug="shipping-delivery-policy" />;
}
