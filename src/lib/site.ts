// One place for every fact the site states. Change it here, not in pages.

export const SITE = {
  name: 'Mylopaws',
  url: 'https://mylopaws.com',
  tagline: 'Bringing solutions for pawfamilies.',
  vision: 'Create strong & tightly bonded pawfamilies.',
  verticals: 'Travel. Dermacare. Homes. Shopping.',
  description:
    'Mylopaws is a Bangalore pet solutions platform: dedicated pet-friendly cabs, specialist skin and fur Dermacare therapies, home-style cat boarding (Homes) and a pet pharmacy that delivers (Shopping).',
  email: 'customercare@mylopaws.com',
  locale: 'en_IN',
  themeColor: '#681947',
} as const;

export const CONTACT = {
  travel: { label: 'Mylopaws Travel', phone: '+91 90366 08453', wa: '919036608453', hours: 'Every day, 6 am to midnight' },
  dermacare: { label: 'Mylopaws Dermacare', phone: '+91 91489 35441', wa: '919148935441', hours: 'Monday to Saturday, 11 am to 6 pm' },
  homes: { label: 'Mylopaws Homes & Shopping', phone: '+91 90710 91699', wa: '919071091699', hours: 'Every day' },
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

export const SHOP_WHATSAPP = '919071091699';

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

export const VISION = 'Create strong & tightly bonded pawfamilies.';

/** The four solutions, in the order the site presents them. */
export const SOLUTIONS = [
  { key: 'travel', href: '/travel/', name: 'Travel', short: 'Pet-friendly cabs, city & outstation' },
  { key: 'dermacare', href: '/dermacare/', name: 'Dermacare', short: 'Skin & fur therapies' },
  { key: 'homes', href: '/homes/', name: 'Homes', short: 'Home-style cat boarding' },
  { key: 'shopping', href: '/shopping/', name: 'Shopping', short: 'Pet pharmacy, delivered' },
] as const;

export const NAV = [
  { href: '/travel/', label: 'Travel', sol: 'travel' },
  { href: '/dermacare/', label: 'Dermacare', sol: 'dermacare' },
  { href: '/homes/', label: 'Homes', sol: 'homes' },
  { href: '/shopping/', label: 'Shopping', sol: 'shopping' },
  { href: '/pawprints/', label: 'Pawprints' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;

export type Intent = 'travel' | 'dermacare' | 'homes' | 'shopping' | 'general';

const WA: Record<Intent, string> = {
  travel: CONTACT.travel.wa,
  dermacare: CONTACT.dermacare.wa,
  homes: CONTACT.homes.wa,
  shopping: CONTACT.homes.wa,
  general: CONTACT.homes.wa,
};
const HELLO: Record<Intent, string> = {
  travel: "Hi Mylopaws, I'd like to book a pet cab.",
  dermacare: "Hi Mylopaws, I'd like to book a Dermacare session for my pet.",
  homes: "Hi Mylopaws, I'd like to book a Homes stay for my cat.",
  shopping: "Hi Mylopaws, I'd like to order for my pet.",
  general: "Hi Mylopaws, I'd like to know more.",
};

/** Every booking CTA opens WhatsApp with the right team, pre-filled. */
export function bookLink(intent: Intent = 'general', text?: string) {
  return waLink(WA[intent], text ?? HELLO[intent]);
}

/** The three WhatsApp lines, for menus and contact blocks. */
export const BOOK_LINES = [
  { intent: 'travel' as const, name: 'Travel', sub: 'Pet cabs', phone: CONTACT.travel.phone },
  { intent: 'dermacare' as const, name: 'Dermacare', sub: 'Skin & fur therapies', phone: CONTACT.dermacare.phone },
  { intent: 'homes' as const, name: 'Homes & Shopping', sub: 'Cat stays & pharmacy', phone: CONTACT.homes.phone },
];

export const SOCIAL = {
  instagram: { url: 'https://www.instagram.com/mylopaws_/', handle: '@mylopaws_' },
  facebook: { url: 'https://www.facebook.com/mylopaws1', handle: 'mylopaws1' },
  google: { url: 'https://share.google/0NUhGFgr2R0X3RyAM', handle: 'Mylopaws Dermacare Centre' },
  linkedin: { url: 'https://www.linkedin.com/company/mylopaws/', handle: 'Mylopaws' },
} as const;

export function waLink(digits: string, text?: string) {
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
