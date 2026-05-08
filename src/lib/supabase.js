import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Module-level flag so the dashboard layout's onAuthStateChange listener
// can tell apart a user-initiated sign-out from a cross-tab sign-out or
// natural session expiry. Without this, clicking "Sign Out" would land
// the user on /login?reason=session_expired (wrong UX) instead of the
// home page that handleSignOut() already navigates to.
//
// We expose a getter rather than the raw variable so consumers can't
// accidentally mutate it.
let _userInitiatedSignOut = false
export function isUserSignOutInProgress() { return _userInitiatedSignOut }

// Auth helpers
export async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  })
  return { data, error }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export async function signOut() {
  // Ask the backend to revoke this JWT first. Without this step,
  // supabase.auth.signOut() only clears localStorage — the access token
  // stays valid until natural expiry, so a token already exfiltrated
  // (extension, devtools, shoulder-surf) keeps full API access after
  // the user clicks "Sign Out".
  //
  // Using fetch directly here so this module doesn't depend on lib/api.js
  // (which imports lib/supabase.js — would create a cycle).
  _userInitiatedSignOut = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token
    if (token) {
      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
      if (apiUrl) {
        await fetch(`${apiUrl}/auth/signout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {})
      }
    }
  } catch {
    // Don't block local signout if the backend call fails — we'd rather
    // clear the local session than leave the user logged in.
  }

  const { error } = await supabase.auth.signOut()
  // Clear the flag after a tick so any listener that reacts on the same
  // event-loop turn still sees it as user-initiated, but a later expiry
  // in the same session is treated as a real expiry.
  setTimeout(() => { _userInitiatedSignOut = false }, 1500)
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

