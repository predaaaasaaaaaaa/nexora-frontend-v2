// Map common API/Auth errors to friendly user messages.
//
// Why: throwing raw error.message back into the UI leaks internals and
// reads like a bug report ("PGRST116", "fetch failed", a Supabase
// constraint name). This wrapper keeps the original on the console for
// debugging while showing the user something actionable.

const KNOWN = [
  { match: /Invalid login credentials/i, msg: 'Invalid email or password.' },
  { match: /Email not confirmed/i,        msg: 'Please confirm your email first — check your inbox.' },
  { match: /User already registered/i,    msg: 'An account with this email already exists.' },
  { match: /Network|Failed to fetch/i,    msg: 'Network problem — check your connection and try again.' },
  { match: /API not configured/i,         msg: 'The app is misconfigured. Please refresh, or contact support.' },
  { match: /No checkout token/i,          msg: 'Could not start checkout. Please sign in again.' },
  { match: /Conversation not found/i,     msg: 'That conversation no longer exists.' },
  { match: /limit_reached/i,              msg: 'You have reached your plan limit. Upgrade to keep going.' },
  { match: /feature_locked/i,             msg: 'That feature is on a paid plan.' },
  { match: /plan_check_failed/i,          msg: 'Could not verify your plan. Please try again shortly.' },
]

export function friendlyError(err, fallback = 'Something went wrong. Please try again.') {
  if (!err) return fallback
  const raw = typeof err === 'string' ? err : (err.message || err.error || '')
  if (typeof window !== 'undefined') console.error('[error]', err)
  for (const k of KNOWN) {
    if (k.match.test(raw)) return k.msg
  }
  return fallback
}
