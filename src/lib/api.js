import { supabase } from './supabase'

// Remove trailing slash from API_URL to prevent double slashes in URLs
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || ''

// Get auth token from Supabase
async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

// Generic API call helper
async function apiCall(endpoint, options = {}) {
  const token = await getAuthToken()
  
  // Ensure endpoint starts with / for proper URL construction
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
    throw new Error(error.error || `API Error: ${response.statusText}`)
  }
  
  return response.json()
}

// Analytics API
export async function getAnalytics(platform) {
  return apiCall(`/analytics/${platform}`)
}

export async function getCombinedAnalytics() {
  return apiCall('/analytics/combined')
}

// Coach API
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

// Ideas API
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

// Profile API
export async function getProfile() {
  return apiCall('/auth/profile')
}

export async function updateProfile(updates) {
  return apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updates)
  })
}

// Feedback API
export async function submitFeedback(rating, message, category = 'general') {
  return apiCall('/feedback/submit', {
    method: 'POST',
    body: JSON.stringify({ rating, message, category })
  })
}

// YouTube API
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

// Coach Conversations API
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

// Competitors API
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