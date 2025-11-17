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
export async function chatWithCoach(message, platform = 'instagram') {
  return apiCall('/coach/chat', {
    method: 'POST',
    body: JSON.stringify({ message, platform })
  })
}

// Scheduler API
export async function getSchedule(platform) {
  return apiCall(`/scheduler/${platform}`)
}

export async function getAllSchedules() {
  return apiCall('/scheduler/all')
}

// Ideas API
export async function generateIdeas(platform, count = 10) {
  return apiCall(`/ideas/${platform}?count=${count}`)
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

