import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Scripts } from '@/components/Scripts';
import { JsonLd } from '@/components/Blocks';
import { SITE } from '@/lib/site';
import { orgSchema, websiteSchema } from '@/lib/seo';

// Latin Montserrat is self-hosted and preloaded with a size-matched fallback, so the headline does not jump when it loads.
// Latin-ext (the rupee sign) still comes from @fontsource in globals.css.
const mont = localFont({
  src: [
    { path: '../../node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../node_modules/@fontsource/montserrat/files/montserrat-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../../node_modules/@fontsource/montserrat/files/montserrat-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-mont',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

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
    <html lang="en-IN" className={mont.variable}>
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
