import { LegalPage, legalMeta } from '@/lib/legal';

export const metadata = legalMeta('cancellation-refund-policy');
export default function Page() {
  return <LegalPage slug="cancellation-refund-policy" />;
}
