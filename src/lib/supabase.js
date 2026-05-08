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

// Keys we set in localStorage that are tied to a specific user account
// (not device preferences). On sign-out we wipe these so signing in as
// a different user on the same browser doesn't inherit the previous
// user's "feedback already given" or "visited all dashboard tabs"
// state — both of which suppress UI the new user should see.
//
// We deliberately do NOT clear nexora-theme here — that's a device-
// level preference, not user data, and clearing it would force a
// reset of dark/light mode after every sign-out.
const USER_LOCAL_STORAGE_KEYS = ['visitedSections', 'feedbackGiven', 'feedbackDismissed']

export function clearUserLocalStorage() {
  if (typeof window === 'undefined') return
  try {
    for (const k of USER_LOCAL_STORAGE_KEYS) localStorage.removeItem(k)
  } catch {
    // localStorage can throw in private mode / disabled storage —
    // failing here would block sign-out, which is worse than leaving
    // the cached UI flags around.
  }
}

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
  // Wipe per-user app state so a second account on the same browser
  // doesn't inherit the previous user's flags. Centralized so the
  // cross-tab onAuthStateChange listener can call the same helper.
  clearUserLocalStorage()
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

