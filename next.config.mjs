/** @type {import('next').NextConfig} */

// Old WordPress URLs that must keep working (Google and Bing have them indexed).
const legacy = [
  ['/blog/', '/pawprints/'],
  ['/home/', '/'],
  ['/mylopaws-home/', '/'],
  ['/shop/', '/shopping/'],
  ['/form/', '/contact/'],
  ['/contact-us/', '/contact/'],
  ['/about-us/', '/about/'],
  ['/terms/', '/terms-of-service/'],
  ['/terms-and-conditions/', '/terms-of-service/'],
  ['/privacy/', '/privacy-policy/'],
  ['/refund-policy/', '/cancellation-refund-policy/'],
  ['/category/mylopaws-cares/', '/category/new-pet-parent/'],
  ['/dog-scratching-ticks-fleas-skin-infections-bangalore/', '/dog-scratching-ticks-fleas-skin-infections-bangalore-2/'],
  ['/bringing-home-new-puppy-bangalore-first-day/', '/bringing-home-new-puppy-bangalore-first-day-2/'],
  ['/feed/', '/pawprints/'],
];

const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'sbajixyhyyjpgkxrhltc.supabase.co', pathname: '/storage/v1/object/public/**' }],
  },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: '/tag/:slug*', destination: '/pawprints/', permanent: true },
      { source: '/author/:slug*', destination: '/pawprints/', permanent: true },
      { source: '/category/uncategorized/', destination: '/pawprints/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=(self), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
