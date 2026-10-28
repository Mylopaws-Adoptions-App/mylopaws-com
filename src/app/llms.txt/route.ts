import { CONTACT, SITE, SOCIAL } from '@/lib/site';
import { THERAPIES } from '@/lib/therapies';
import { TRAVEL } from '@/lib/travel';
import { allPosts } from '@/lib/posts';

export const dynamic = 'force-static';

/** llms.txt (llmstxt.org): a plain-language map of the site for AI answer engines. */
export function GET() {
  const u = (p: string) => `${SITE.url}${p}`;
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description} Vision: ${SITE.vision}`,
    '',
    'Mylopaws is based in HSR Layout, Bengaluru (Bangalore), Karnataka, India. Every solution is booked on WhatsApp with a real person. Dermacare prepaid grooming plans (6 and 12 months) are priced on the Dermacare page; cab trips, therapies and boarding are quoted per pet after a quick chat.',
    '',
    '## Solutions',
    `- [Mylopaws Travel](${u('/travel/')}): dedicated pet-friendly cabs in Bangalore, every day 6 am to midnight. Intracity rides, vet visits, Bangalore airport (BLR) transfers and outstation trips across India. WhatsApp ${CONTACT.travel.phone}.`,
    `- [Mylopaws Dermacare](${u('/dermacare/')}) — prepaid plans at ${u('/dermacare/#plans')}: ${THERAPIES.length} specialist skin and fur therapies for dogs and cats (ticks and fleas, skin infections, allergies, shedding, dull coat) at the HSR Layout salon or at home. ${CONTACT.dermacare.hours}. WhatsApp ${CONTACT.dermacare.phone}.`,
    `- [Mylopaws Homes](${u('/homes/')}): calm, home-style cat boarding in Bangalore with daily updates. WhatsApp ${CONTACT.homes.phone}.`,
    `- [Mylopaws Shopping](${u('/shopping/')}): pet pharmacy with delivery across Bangalore — tick and flea care, supplements, shampoos, food and vet-prescribed medicines. WhatsApp ${CONTACT.homes.phone}.`,
    '',
    '## Travel services',
    ...TRAVEL.map((t) => `- [${t.name}](${u(`/${t.slug}/`)}): ${t.short}`),
    '',
    '## Dermacare therapies',
    ...THERAPIES.map((t) => `- [${t.name}](${u(`/${t.slug}/`)}): ${t.short}`),
    '',
    '## Pawprints guides',
    ...allPosts().map((p) => `- [${p.title}](${u(`/${p.slug}/`)}): ${p.description}`),
    '',
    '## Contact and profiles',
    `- [Contact](${u('/contact/')})`,
    `- [About](${u('/about/')})`,
    `- Google Business Profile (Mylopaws Dermacare Centre): ${SOCIAL.google.url}`,
    `- Instagram: ${SOCIAL.instagram.url}`,
    `- Facebook: ${SOCIAL.facebook.url}`,
    `- LinkedIn: ${SOCIAL.linkedin.url}`,
    `- Email: ${SITE.email}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
