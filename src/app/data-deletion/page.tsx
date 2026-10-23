import { LegalPage, legalMeta } from '@/lib/legal';

export const metadata = legalMeta('data-deletion');
export default function Page() {
  return <LegalPage slug="data-deletion" />;
}
