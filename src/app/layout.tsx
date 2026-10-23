import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Scripts } from '@/components/Scripts';
import { JsonLd } from '@/components/Blocks';
import { SITE } from '@/lib/site';
import { orgSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Mylopaws: Pet Travel, Dermacare & Homes in Bangalore', template: '%s | Mylopaws' },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: SITE.themeColor, width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[orgSchema, websiteSchema]} />
        <Scripts />
      </body>
    </html>
  );
}
