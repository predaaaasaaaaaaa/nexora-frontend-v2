import { supabase } from './supabase'
import { log } from './log'

// Resolved at module load. If NEXT_PUBLIC_API_URL is missing the build
// previously fell back to an empty string, so every API call quietly
// hit /api/... on the frontend host and 404'd with no useful logs. Fail
// loud at the first call so the misconfig is obvious.
const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
const API_URL = RAW_API_URL || ''
if (!API_URL && typeof window !== 'undefined') {
  log.error('NEXT_PUBLIC_API_URL is not set — API calls will fail.')
}

async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

// Single-flight protection so a wave of parallel 401s on session
// expiry only triggers ONE signOut + redirect, not N concurrent ones
// (which causes weird race conditions and double-firing of the
// /auth/signout backend call).
let unauthorizedRedirectInFlight = false

async function handleUnauthorized() {
  if (unauthorizedRedirectInFlight) return
  if (typeof window === 'undefined') return // SSR, nothing to do
  unauthorizedRedirectInFlight = true
  try {
    // Best-effort local clear. We don't await the backend signout call
    // because the user is already in a "your session is dead" state —
    // we want them on /login as fast as possible.
    await supabase.auth.signOut().catch(() => {})
  } finally {
    // Use replace so the broken page doesn't show up in browser history.
    window.location.replace('/login?reason=session_expired')
  }
}

// Generic API call helper — now handles plan limit errors and 401s.
async function apiCall(endpoint, options = {}) {
  // Throw at the first call rather than firing a same-origin /api/...
  // request that 404s into the void.
  if (!API_URL) {
    throw new Error('API not configured: NEXT_PUBLIC_API_URL is missing')
  }

  const token = await getAuthToken()

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_URL}${normalizedEndpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  })

  if (!response.ok) {
    // Session expired / token revoked / never had one. Clear local
    // state and bounce to /login. We don't bother parsing the response
    // body — the only safe action on 401 is to re-auth.
    if (response.status === 401) {
      await handleUnauthorized()
      // Throw so the caller's `.catch` runs and they don't try to
      // render with stale data while the redirect is still loading.
      throw new Error('Session expired')
    }

    const error = await response.json().catch(() => ({ error: response.statusText }))

    // Plan limit or feature lock — return structured error instead of throwing
    if (response.status === 403 && (error.error === 'limit_reached' || error.error === 'feature_locked')) {
      return {
        success: false,
        limitReached: true,
        message: error.message,
        usage: error.usage || null,
        currentPlan: error.currentPlan,
        upgradeTo: error.upgradeTo,
      }
    }

    throw new Error(error.error || `API Error: ${response.statusText}`)
  }

  return response.json()
}

// ————————————————————————————————————————
// SUBSCRIPTION API
// ————————————————————————————————————————

export async function getSubscriptionPlans() {
  return apiCall('/subscription/plans')
}

export async function getCurrentPlan() {
  return apiCall('/subscription/current')
}

export async function createCheckout(plan) {
  return apiCall('/subscription/checkout', {
    method: 'POST',
    body: JSON.stringify({ plan })
  })
}

export async function getCustomerPortal() {
  return apiCall('/subscription/portal')
}

// Fetch the short-lived HMAC-signed user_id we pass to Paddle as
// custom_data.user_id_signed. The webhook only honors a value that
// verifies against CHECKOUT_USER_ID_SECRET, so any client tampering
// (or a phishing attack that opens checkout for a different user)
// won't cause a stranger's account to be upgraded.
export async function getCheckoutToken() {
  return apiCall('/subscription/checkout-token')
}

// ————————————————————————————————————————
// ANALYTICS API
// ————————————————————————————————————————

export async function getAnalytics(platform) {
  return apiCall(`/analytics/${platform}`)
}

export async function getCombinedAnalytics() {
  return apiCall('/analytics/combined')
}

// ————————————————————————————————————————
// COACH API
// ————————————————————————————————————————

// Only message/platform/conversationId are sent. The backend builds
// niche/analytics from the user's actual server-side context — earlier
// versions of this client used to forward those fields from the page,
// which let a tampered client lie to the AI about its own profile.
export async function chatWithCoach(message, platform = 'youtube', conversationId = null) {
  return apiCall('/coach/chat', {
    method: 'POST',
    body: JSON.stringify({ message, platform, conversationId })
  })
}

// ————————————————————————————————————————
// SCHEDULER AI RECOMMENDATIONS
// ————————————————————————————————————————

export async function getSchedulerRecommendations() {
  return apiCall('/scheduler/recommendations')
}

export async function getReactiveRecommendations(action, post) {
  return apiCall('/scheduler/recommendations/reactive', {
    method: 'POST',
    body: JSON.stringify({ action, post }),
  })
}

// ————————————————————————————————————————
// SCHEDULED POSTS CRUD
// ————————————————————————————————————————

export async function getScheduledPosts(month, year) {
  const params = new URLSearchParams()
  if (month) params.set('month', month)
  if (year) params.set('year', year)
  const query = params.toString() ? `?${params.toString()}` : ''
  return apiCall(`/scheduler/posts${query}`)
}

export async function createScheduledPost(postData) {
  return apiCall('/scheduler/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  })
}

export async function updateScheduledPost(id, updates) {
  return apiCall(`/scheduler/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}

export async function deleteScheduledPost(id) {
  return apiCall(`/scheduler/posts/${id}`, {
    method: 'DELETE',
  })
}

// ————————————————————————————————————————
// NOTIFICATION PREFERENCES
// ————————————————————————————————————————

export async function getNotificationPreferences() {
  return apiCall('/scheduler/notifications')
}

export async function updateNotificationPreferences(prefs) {
  return apiCall('/scheduler/notifications', {
    method: 'PUT',
    body: JSON.stringify(prefs),
  })
}

// ————————————————————————————————————————
// IDEAS API
// ————————————————————————————————————————

export async function generateIdeas(platform, count = 10, niche = null) {
  let url = `/ideas/${platform}?count=${count}`
  if (niche) {
    url += `&niche=${encodeURIComponent(niche)}`
  }
  return apiCall(url)
}

export async function generateAllIdeas(count = 5) {
  return apiCall(`/ideas/all?count=${count}`)
}

// ————————————————————————————————————————
// PROFILE API
// ————————————————————————————————————————

export async function getProfile() {
  return apiCall('/auth/profile')
}

export async function updateProfile(updates) {
  return apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updates)
  })
}

// ————————————————————————————————————————
// FEEDBACK API
// ————————————————————————————————————————

export async function submitFeedback(rating, message, category = 'general') {
  return apiCall('/feedback/submit', {
    method: 'POST',
    body: JSON.stringify({ rating, message, category })
  })
}

// ————————————————————————————————————————
// YOUTUBE API
// ————————————————————————————————————————

// `label` is an optional user-chosen name for this YouTube connection
// (e.g. "Business channel"). The backend sanitizes and signs it into
// the OAuth state so it survives the round-trip without tampering.
export async function connectYouTube(label) {
  const qs = label ? `?label=${encodeURIComponent(label)}` : ''
  return apiCall(`/youtube/connect${qs}`)
}

export async function getYouTubeStatus() {
  return apiCall('/youtube/status')
}

export async function getYouTubeAnalytics() {
  return apiCall('/youtube/analytics')
}

export async function disconnectYouTube() {
  return apiCall('/youtube/disconnect', {
    method: 'DELETE',
  })
}

// ————————————————————————————————————————
// COACH CONVERSATIONS API
// ————————————————————————————————————————

export async function listCoachConversations() {
  return apiCall('/coach/conversations')
}

export async function createCoachConversation(platform = 'youtube') {
  return apiCall('/coach/conversations', {
    method: 'POST',
    body: JSON.stringify({ platform })
  })
}

export async function getCoachMessages(conversationId) {
  return apiCall(`/coach/conversations/${conversationId}/messages`)
}

export async function deleteCoachConversation(conversationId) {
  return apiCall(`/coach/conversations/${conversationId}`, {
    method: 'DELETE'
  })
}

// ————————————————————————————————————————
// COMPETITORS API
// ————————————————————————————————————————

export async function searchCompetitors(query) {
  return apiCall(`/competitors/search?query=${encodeURIComponent(query)}`)
}

export async function analyzeCompetitor(channelId) {
  return apiCall(`/competitors/analyze/${channelId}`)
}

export async function compareCompetitor(channelId) {
  return apiCall(`/competitors/compare/${channelId}`)
}

export async function getTrackedCompetitors() {
  return apiCall('/competitors/tracked')
}

// Only channel_id is forwarded. The backend re-fetches name, handle,
// thumbnail, subscriber/view/video counts directly from YouTube — this
// stops a tampered client from persisting fake stats that would later
// surface in the user's UI and feed the AI's competitor comparisons.
export async function trackCompetitor(channelOrId) {
  const channel_id = typeof channelOrId === 'string'
    ? channelOrId
    : (channelOrId?.channel_id || channelOrId?.channelId)
  if (!channel_id) throw new Error('trackCompetitor: channel_id is required')
  return apiCall('/competitors/track', {
    method: 'POST',
    body: JSON.stringify({ channel_id })
  })
}

export async function untrackCompetitor(channelId) {
  return apiCall(`/competitors/track/${channelId}`, {
    method: 'DELETE'
  })
}