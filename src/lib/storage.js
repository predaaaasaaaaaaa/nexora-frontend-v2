// Namespaced localStorage helpers.
//
// All Nexora keys live under the 'nx:' prefix so we can safely share
// an eTLD+1 with future subdomain apps (admin.nexora-ai.org,
// status.nexora-ai.org, etc.) without colliding — different apps
// would otherwise read each other's "visited sections" / "feedback
// given" flags, which leaks UI suppression cross-app and confuses
// state.
//
// getItem() does a one-time migration from the legacy unprefixed key
// for users whose browsers already hold data under the old name. The
// migration is silent and idempotent.

const LEGACY_KEYS = {
  'nx:theme':              'nexora-theme',
  'nx:visitedSections':    'visitedSections',
  'nx:feedbackGiven':      'feedbackGiven',
  'nx:feedbackDismissed':  'feedbackDismissed',
}

export const STORAGE_KEYS = {
  THEME:               'nx:theme',
  VISITED_SECTIONS:    'nx:visitedSections',
  FEEDBACK_GIVEN:      'nx:feedbackGiven',
  FEEDBACK_DISMISSED:  'nx:feedbackDismissed',
}

// All keys we ever wipe on sign-out (FM4). New + legacy together so a
// user who signs out before the migration runs still gets cleared.
export const USER_KEYS_WITH_LEGACY = [
  STORAGE_KEYS.VISITED_SECTIONS,
  STORAGE_KEYS.FEEDBACK_GIVEN,
  STORAGE_KEYS.FEEDBACK_DISMISSED,
  'visitedSections',
  'feedbackGiven',
  'feedbackDismissed',
]

function safe(fn) {
  try { return fn() } catch { return null }
}

export function getItem(key) {
  if (typeof window === 'undefined') return null
  return safe(() => {
    const v = localStorage.getItem(key)
    if (v !== null) return v
    const legacy = LEGACY_KEYS[key]
    if (legacy) {
      const old = localStorage.getItem(legacy)
      if (old !== null) {
        try {
          localStorage.setItem(key, old)
          localStorage.removeItem(legacy)
        } catch {}
        return old
      }
    }
    return null
  })
}

export function setItem(key, value) {
  if (typeof window === 'undefined') return
  safe(() => localStorage.setItem(key, value))
}

export function removeItem(key) {
  if (typeof window === 'undefined') return
  safe(() => localStorage.removeItem(key))
}
