/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// API host the browser is allowed to reach. Defaults to the prod backend so
// a missing env var doesn't silently produce a permissive '*' connect-src.
const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '').replace(/\/$/, '')
  || 'https://api.nexora-ai.org';

const SUPABASE_ORIGIN = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://*.supabase.co';

// Content Security Policy.
//
// Notes / accepted relaxations:
// - 'unsafe-inline' on script-src is needed for the Paddle init script and
//   Next.js's runtime injection. We could move to nonces but that requires
//   per-request nonce minting — pragmatic later.
// - 'unsafe-eval' is added in DEV ONLY. Turbopack / react-server-dom-turbopack
//   uses eval() to reconstruct source maps and stack frames from RSC payloads.
//   Production builds never need it.
// - 'unsafe-inline' on style-src is unavoidable today: nearly every component
//   uses React `style={...}` props and `<style jsx>` blocks.
// - DEV also needs ws:/wss: in connect-src for Turbopack HMR.
// - frame-ancestors 'none' covers the same threat as X-Frame-Options DENY
//   (clickjacking) for browsers that honor CSP.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDev && "'unsafe-eval'",
  'https://cdn.paddle.com',
  'https://*.paddle.com',
  'https://*.profitwell.com',
  'https://public.profitwell.com',
  'https://*.stripe.com',
  'https://*.stripe.network',
].filter(Boolean).join(' ');

const connectSrc = [
  "'self'",
  API_ORIGIN,
  SUPABASE_ORIGIN,
  'https://*.supabase.co',
  'https://*.paddle.com',
  'https://*.profitwell.com',
  'https://*.stripe.com',
  'https://*.stripe.network',
  isDev && 'ws:',
  isDev && 'wss:',
  isDev && 'http://localhost:*',
].filter(Boolean).join(' ');

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.paddle.com https://*.paddle.com https://*.stripe.com https://*.stripe.network",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  `connect-src ${connectSrc}`,
  "frame-src 'self' https://*.paddle.com https://*.stripe.com https://*.stripe.network",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Only force HTTPS upgrades in production — dev runs on http://localhost.
  ...(!isDev ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  // Force HTTPS for two years and include subdomains. preload requires
  // the domain to be submitted at hstspreload.org first.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Stop browsers from MIME-sniffing a response to a different content type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Belt-and-braces with frame-ancestors above.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Don't leak full URLs to third parties on outbound clicks.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable the powerful APIs the app doesn't use, so a future XSS can't
  // tap them either.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self "https://*.paddle.com")' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
