import type { Metadata } from 'next';
import { CONTACT, SITE, SOCIAL } from './site';

/** Page metadata with canonical, Open Graph and Twitter. Titles 30–65 chars, descriptions ≤155 (Bing rules). */
export function meta(opts: { title: string; description: string; path: string; type?: 'website' | 'article'; published?: string; noindex?: boolean }): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: opts.type ?? 'website',
      ...(opts.published ? { publishedTime: opts.published } : {}),
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const addr = {
  '@type': 'PostalAddress',
  streetAddress: CONTACT.address.street,
  addressLocality: CONTACT.address.locality,
  addressRegion: CONTACT.address.region,
  postalCode: CONTACT.address.postalCode,
  addressCountry: CONTACT.address.country,
};

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#org`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/images/mylopaws-logo.png`,
  email: SITE.email,
  slogan: `${SITE.tagline} ${SITE.verticals}`,
  description: SITE.description,
  areaServed: { '@type': 'City', name: 'Bengaluru' },
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560102', addressCountry: 'IN' },
  knowsAbout: ['Pet-friendly cabs', 'Pet travel in Bangalore', 'Dog skin care', 'Tick and flea treatment', 'Cat boarding', 'Pet pharmacy'],
  sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url, SOCIAL.linkedin.url, SOCIAL.google.url],
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'Mylopaws Travel bookings', telephone: CONTACT.travel.phone.replace(/\s/g, ''), areaServed: 'IN' },
    { '@type': 'ContactPoint', contactType: 'Mylopaws Dermacare bookings', telephone: CONTACT.dermacare.phone.replace(/\s/g, ''), areaServed: 'IN' },
    { '@type': 'ContactPoint', contactType: 'Mylopaws Homes & Shopping', telephone: CONTACT.homes.phone.replace(/\s/g, ''), areaServed: 'IN' },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': `${SITE.url}/#org` },
  inLanguage: 'en-IN',
};

export function dermacareSchema(therapies: { name: string; slug: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'PetStore'],
    '@id': `${SITE.url}/dermacare/#business`,
    name: 'Mylopaws Dermacare',
    url: `${SITE.url}/dermacare/`,
    telephone: CONTACT.dermacare.phone.replace(/\s/g, ''),
    email: SITE.email,
    address: addr,
    geo: { '@type': 'GeoCoordinates', latitude: CONTACT.address.lat, longitude: CONTACT.address.lng },
    areaServed: { '@type': 'City', name: 'Bengaluru' },
    parentOrganization: { '@id': `${SITE.url}/#org` },
    sameAs: [SOCIAL.google.url, SOCIAL.instagram.url],
    hasMap: SOCIAL.google.url,
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '11:00', closes: '18:00' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mylopaws Dermacare therapies',
      itemListElement: therapies.map((t) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t.name, url: `${SITE.url}/${t.slug}/` } })),
    },
  };
}

export const travelSchema = {
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  '@id': `${SITE.url}/travel/#service`,
  name: 'Mylopaws Travel: pet-friendly cabs',
  url: `${SITE.url}/travel/`,
  provider: { '@id': `${SITE.url}/#org` },
  telephone: CONTACT.travel.phone.replace(/\s/g, ''),
  areaServed: [{ '@type': 'City', name: 'Bengaluru' }, { '@type': 'Country', name: 'India' }],
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '06:00', closes: '23:59' },
};

export function serviceSchema(name: string, path: string, description: string, provider = `${SITE.url}/#org`) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    url: `${SITE.url}${path}`,
    description,
    provider: { '@id': provider },
    areaServed: { '@type': 'City', name: 'Bengaluru' },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
  };
}
