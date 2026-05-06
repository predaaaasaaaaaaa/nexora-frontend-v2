import { supabase } from './supabase'

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || ''

async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

// Generic API call helper — now handles plan limit errors
async function apiCall(endpoint, options = {}) {
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

export async function connectYouTube() {
  return apiCall('/youtube/connect')
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

export async function trackCompetitor(channelData) {
  return apiCall('/competitors/track', {
    method: 'POST',
    body: JSON.stringify(channelData)
  })
}

export async function untrackCompetitor(channelId) {
  return apiCall(`/competitors/track/${channelId}`, {
    method: 'DELETE'
  })
}