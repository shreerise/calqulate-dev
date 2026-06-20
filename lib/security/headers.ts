import type { NextResponse } from "next/server";

/**
 * Applies hardened security headers for the Vitals product surfaces.
 *
 * NOTE: The Vitals pages (/service, /dashboard, /login, /signup) render inside
 * the shared site root layout, which injects Google Tag Manager, AdSense and
 * Microsoft Clarity. The CSP below therefore allows those origins in addition
 * to Stripe, Cloudflare Turnstile and your Supabase project — otherwise those
 * shared scripts would be blocked on the product pages. This middleware is
 * scoped (see middleware.ts matcher) to the Vitals routes only, so the rest of
 * calqulate.net is unaffected.
 */
export function applySecurityHeaders(res: NextResponse): NextResponse {
  const supabaseHost = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/^https?:\/\//, "");

  const csp = [
    "default-src 'self'",
    // Next.js needs inline/eval; Stripe + Turnstile + Google + Clarity scripts allowed.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://challenges.cloudflare.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://googleads.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' https://${supabaseHost} wss://${supabaseHost} https://api.stripe.com https://challenges.cloudflare.com https://www.google-analytics.com https://*.googlesyndication.com https://*.google.com https://*.clarity.ms https://c.bing.com`,
    "frame-src https://js.stripe.com https://hooks.stripe.com https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://*.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  return res;
}
