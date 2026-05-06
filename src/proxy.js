// Edge proxy (renamed from middleware in Next 16).
//
// Today this is a soft cookie-based gate on dashboard routes. With the
// current setup (@supabase/supabase-js, default localStorage storage)
// the cookie is rarely there, so this is a hint, not a hard gate. The
// real defense is the per-API-call Bearer-token check on the backend.
//
// Migrate the auth flow to @supabase/ssr if you want this to be a
// hard edge gate.
//
// Notes on this implementation:
// - We DO NOT use the `config.matcher` regex. In Next 16 / Turbopack a
//   complex matcher caused App Router to mis-route (every page returned
//   404). Filter inside the function instead — it's a few microseconds
//   per request and impossible to misconfigure.

import { NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/analytics', '/coach', '/scheduler', '/ideas', '/settings']
const SUPABASE_COOKIE_RE = /^(sb-|supabase-)/

function looksAuthenticated(req) {
  for (const cookie of req.cookies.getAll()) {
    if (SUPABASE_COOKIE_RE.test(cookie.name)) return true
  }
  return false
}

function isProtected(pathname) {
  return PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(`${p}/`))
}

export function proxy(req) {
  const { pathname } = req.nextUrl
  if (!isProtected(pathname)) return NextResponse.next()

  if (!looksAuthenticated(req)) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
