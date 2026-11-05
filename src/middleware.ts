import { NextResponse, type NextRequest } from 'next/server';

// Leftovers from the old WordPress / WooCommerce site and its hack. They have no replacement,
// so we answer 410 Gone, which tells Google to drop them faster than a plain 404.
const GONE = [
  /^\/brand-a-z(\/|$)/,
  /^\/(baby-clothing|bathing-care|toys-activity|travel-essentials)(\/|$)/,
  /^\/blog-(layout|types)/,
  /^\/category\/blog-/,
  /^\/wp-json(\/|$)/,
  /^\/wp-includes(\/|$)/,
  /^\/wp-admin(\/|$)/,
  /^\/clientlog/,
  /\.html$/,
];

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (GONE.some((r) => r.test(p))) return new NextResponse('Gone', { status: 410, headers: { 'content-type': 'text/plain', 'x-robots-tag': 'noindex' } });
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/|images/|video/|favicon|icon|apple-icon|opengraph-image|llms.txt|robots.txt|sitemap.xml|.*\\.(?:txt|xml|png|jpg|jpeg|svg|webp|webm|mp4|ico|js|css|woff2?)$).*)', '/wp-includes/:path*'] };
