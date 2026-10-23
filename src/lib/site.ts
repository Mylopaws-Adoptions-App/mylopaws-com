// One place for every fact the site states. Change it here, not in pages.

export const SITE = {
  name: 'Mylopaws',
  url: 'https://mylopaws.com',
  tagline: 'Bringing solutions for pawfamilies.',
  verticals: 'Travel. Dermacare. Homes.',
  description:
    'Mylopaws is a Bangalore pet solutions platform: dedicated pet-friendly cabs, specialist skin and fur Dermacare therapies, and home-style pet Homes.',
  email: 'customercare@mylopaws.com',
  // Locked rule: every booking CTA goes to the Mylopaws app.
  app: 'https://www.mylopaws.app',
  locale: 'en_IN',
  themeColor: '#691A47',
} as const;

export const CONTACT = {
  travel: { label: 'Mylopaws Travel', phone: '+91 90366 08453', wa: '919036608453', hours: 'Every day, 6 am to midnight' },
  dermacare: { label: 'Mylopaws Dermacare', phone: '+91 91489 35441', wa: '919148935441', hours: 'Monday to Saturday, 11 am to 6 pm' },
  address: {
    street: '764/A, 22nd Cross, Parangipalya Main Road, 2nd Sector, HSR Layout',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560102',
    country: 'IN',
    lat: 12.9073152,
    lng: 77.692928,
  },
} as const;

export const SHOP_WHATSAPP = (process.env.NEXT_PUBLIC_SHOP_WHATSAPP ?? '').replace(/\D/g, '');

export const ANALYTICS = {
  ga4: 'G-F6T11C7GTB',
  ads: 'AW-958815128',
} as const;

export const ANANNYA_AGENT_ID = 'agent_9501ka16zka0e8jsct7dqtvvmvkc';

export const SUPABASE = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://sbajixyhyyjpgkxrhltc.supabase.co',
  // Publishable (anon) key: public by design, protected by row-level security.
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiYWppeHloeXlqcGdreHJobHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNzUzNjEsImV4cCI6MjA5ODY1MTM2MX0.rhGIYMQj4CM-1YvVZ26qCtBKz_C9mI-ERhbg6ISXyvg',
} as const;

export const NAV = [
  { href: '/travel/', label: 'Travel' },
  { href: '/dermacare/', label: 'Dermacare' },
  { href: '/homes/', label: 'Homes' },
  { href: '/pawprints/', label: 'Pawprints' },
  { href: '/about/', label: 'About' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function appLink(intent: 'travel' | 'dermacare' | 'homes' | 'general' = 'general') {
  const u = new URL(SITE.app);
  u.searchParams.set('utm_source', 'mylopaws.com');
  u.searchParams.set('utm_medium', 'website');
  u.searchParams.set('utm_campaign', intent);
  return u.toString();
}

export function waLink(digits: string, text?: string) {
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
