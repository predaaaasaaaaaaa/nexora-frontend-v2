// Tiny client-side logger.
//
// In dev: passes through to console (so DevTools shows everything).
// In prod: warn / error still go to console (browsers usually strip
//   them on minify anyway, and they're useful for ops who Cmd-Opt-J
//   into a user's session). info / debug are silenced — those tend to
//   contain object dumps with PII / tokens that don't belong in a
//   user's console.
//
// Drop-in replacement for `console.*`. Same arity, no return value.
//
// The reason this exists rather than just `console.error` everywhere:
//   1. We want ONE central place to wire Sentry / Datadog / PostHog
//      later — change one file, all callsites benefit.
//   2. We want to gracefully strip the chatty `info`/`debug` calls in
//      prod without grep'ing every file.

const isProd = process.env.NODE_ENV === 'production'

function noop() {}

function ship(level, args) {
  // Hook for a future Sentry / Datadog client. The shape is
  // (level, args[]) so we can adapt to any vendor without callsite
  // churn. Stays a no-op until wired.
}

function wrap(method, allowInProd) {
  if (!allowInProd && isProd) return noop
  return (...args) => {
    try {
      method.apply(console, args)
      ship(method === console.error ? 'error' : method === console.warn ? 'warn' : method === console.info ? 'info' : 'debug', args)
    } catch {
      /* never let the logger throw */
    }
  }
}

export const log = {
  debug: wrap(console.debug.bind(console), false),
  info:  wrap(console.info.bind(console),  false),
  warn:  wrap(console.warn.bind(console),  true),
  error: wrap(console.error.bind(console), true),
}
