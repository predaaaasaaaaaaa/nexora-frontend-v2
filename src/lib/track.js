import { supabase } from './supabase'
import { log } from './log'

// Fire-and-forget client event tracking.
//
// Deliberately does NOT go through lib/api.js's apiCall(): that helper
// redirects to /login on a 401 and throws on failure. Analytics must
// never do either — a tracking blip can't be allowed to bounce the user
// or break the feature that emitted the event. So this is a self-contained
// POST that swallows everything.
//
// The backend route (POST /api/track) only accepts an allowlist of event
// names and derives user_id from the JWT, so we send event_name +
// scalar properties only — never a user_id, email, name, or any content.

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

export async function trackClientEvent(eventName, properties = {}) {
  try {
    if (!API_URL) return // misconfigured env — silently skip, never throw

    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    // No session → nothing to attribute the event to. The route is
    // authenticated, so an anonymous call would 401 anyway. Skip quietly.
    if (!token) return

    await fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ event_name: eventName, properties }),
      // Best-effort: don't keep the tab busy or surface network errors.
      keepalive: true,
    }).catch(() => {})
  } catch (err) {
    // Never let tracking throw into a product feature.
    log.warn('[track] event failed', eventName, err?.message || err)
  }
}
