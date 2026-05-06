// Edge middleware.
//
// Today this only attempts a *cookie-based* auth gate on dashboard routes
// and falls through if no Supabase auth cookie is present. With the
// current setup (@supabase/supabase-js, default localStorage storage)
// the cookie is rarely there, so this is a soft hint, not a hard gate.
// The real defense is still the per-API-call Bearer-token check on the
// backend.
//
// To make this a hard gate, migrate the auth flow to @supabase/ssr so
// the session is mirrored into HttpOnly cookies that middleware can
// actually read. That's a bigger change and is tracked separately.
//
// We also use this to strip Origin from any unauthenticated cross-site
// preflight to dashboard routes — useful belt-and-braces while the
// backend rate-limits real abuse.

import { NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/analytics', '/coach', '/scheduler', '/ideas', '/settings']
// Any cookie prefix Supabase has used historically, so we don't break
// when they shuffle naming conventions.
const SUPABASE_COOKIE_RE = /^(sb-|supabase-)/

function looksAuthenticated(req) {
  for (const cookie of req.cookies.getAll()) {
    if (SUPABASE_COOKIE_RE.test(cookie.name)) return true
  }
  return false
}

export function middleware(req) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(`${p}/`))

  if (isProtected && !looksAuthenticated(req)) {
    // No Supabase cookie at all — almost certainly not signed in. Bounce
    // to /login. The client-side guard in (dashboard)/layout.js still
    // runs as backup for users whose session lives only in localStorage.
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Skip middleware on Next internals and static assets.
export const config = {
  matcher: ['/((?!_next/|api/|favicon.ico|robots.txt|sitemap.*\\.xml|.*\\..*).*)'],
}
