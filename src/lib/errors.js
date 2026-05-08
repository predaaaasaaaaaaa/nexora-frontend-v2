// Map common API/Auth errors to friendly user messages.
//
// Why: throwing raw error.message back into the UI leaks internals and
// reads like a bug report ("PGRST116", "fetch failed", a Supabase
// constraint name). This wrapper keeps the original on the console for
// debugging while showing the user something actionable.

import { log } from './log'

const KNOWN = [
  { match: /Invalid login credentials/i,   msg: 'Invalid email or password.' },
  { match: /Email not confirmed/i,         msg: 'Please confirm your email first — check your inbox.' },
  { match: /User already registered/i,     msg: 'An account with this email already exists.' },
  { match: /Network|Failed to fetch/i,     msg: 'Network problem — check your connection and try again.' },
  { match: /API not configured/i,          msg: 'The app is misconfigured. Please refresh, or contact support.' },
  { match: /No checkout token/i,           msg: 'Could not start checkout. Please sign in again.' },
  { match: /Conversation not found/i,      msg: 'That conversation no longer exists.' },
  { match: /limit_reached/i,               msg: 'You have reached your plan limit. Upgrade to keep going.' },
  { match: /feature_locked/i,              msg: 'That feature is on a paid plan.' },
  { match: /plan_check_failed/i,           msg: 'Could not verify your plan. Please try again shortly.' },
  // Backend-specific codes that previously collapsed to the generic
  // "Something went wrong" fallback. Each one is actionable for the
  // user — keep the wording specific so they know what to do next.
  { match: /youtube_quota_exhausted/i,     msg: 'YouTube API quota for the day has been used up. Please try again in a few hours.' },
  { match: /email_not_verified/i,          msg: 'Please verify your email — check your inbox for the confirmation link.' },
  { match: /captcha_failed/i,              msg: 'Verification failed. Please refresh the page and try again.' },
  { match: /request_timeout/i,             msg: 'The request took too long. Please check your connection and try again.' },
  { match: /Session expired/i,             msg: 'Your session expired. Please sign in again.' },
]

export function friendlyError(err, fallback = 'Something went wrong. Please try again.') {
  if (!err) return fallback
  const raw = typeof err === 'string' ? err : (err.message || err.error || '')
  if (typeof window !== 'undefined') log.error('[error]', err)
  for (const k of KNOWN) {
    if (k.match.test(raw)) return k.msg
  }
  return fallback
}
