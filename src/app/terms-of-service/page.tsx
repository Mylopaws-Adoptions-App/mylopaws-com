import { LegalPage, legalMeta } from '@/lib/legal';

export const metadata = legalMeta('terms-of-service');
export default function Page() {
  return <LegalPage slug="terms-of-service" />;
}
