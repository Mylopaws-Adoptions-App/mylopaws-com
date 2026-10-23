import { LegalPage, legalMeta } from '@/lib/legal';

export const metadata = legalMeta('privacy-policy');
export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
