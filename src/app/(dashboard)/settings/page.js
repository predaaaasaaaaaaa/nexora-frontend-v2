'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { getYouTubeStatus, connectYouTube, disconnectYouTube, getNotificationPreferences, updateNotificationPreferences } from '@/lib/api'
import {
  Settings as SettingsIcon, User, Mail, Save, Loader2, Youtube, Link, Unlink,
  CheckCircle, XCircle, AlertCircle, Bell, BellOff, Shield, LogOut, Calendar,
  ExternalLink, Clock,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  // YouTube state
  const [youtubeStatus, setYoutubeStatus] = useState(null)
  const [youtubeLoading, setYoutubeLoading] = useState(true)
  const [youtubeAction, setYoutubeAction] = useState(null)

  // Notification state
  const [notifPrefs, setNotifPrefs] = useState(null)
  const [notifLoading, setNotifLoading] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    loadUser()
    loadYouTubeStatus()
    loadNotifPrefs()

    const ytParam = searchParams.get('youtube')
    if (ytParam === 'connected') {
      setSuccess('YouTube connected successfully!')
      setTimeout(() => setSuccess(''), 5000)
      loadYouTubeStatus()
    } else if (ytParam === 'error') {
      setYoutubeAction('error')
      setTimeout(() => setYoutubeAction(null), 5000)
    }
  }, [])

  async function loadUser() {
    const { user } = await getCurrentUser()
    setUser(user)
    setLoading(false)
  }

  async function loadYouTubeStatus() {
    try {
      setYoutubeLoading(true)
      const data = await getYouTubeStatus()
      setYoutubeStatus(data)
    } catch (err) {
      console.error('Error loading YouTube status:', err)
      setYoutubeStatus({ connected: false })
    } finally {
      setYoutubeLoading(false)
    }
  }

  async function loadNotifPrefs() {
    try {
      setNotifLoading(true)
      const data = await getNotificationPreferences()
      setNotifPrefs(data.preferences)
    } catch (err) {
      console.error('Error loading notification prefs:', err)
    } finally {
      setNotifLoading(false)
    }
  }

  async function handleConnectYouTube() {
    try {
      setYoutubeAction('connecting')
      const data = await connectYouTube()
      if (data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (err) {
      console.error('Error connecting YouTube:', err)
      setYoutubeAction('error')
      setTimeout(() => setYoutubeAction(null), 3000)
    }
  }

  async function handleDisconnectYouTube() {
    if (!confirm('Are you sure you want to disconnect your YouTube account? Your analytics data will no longer be available.')) return

    try {
      setYoutubeAction('disconnecting')
      await disconnectYouTube()
      setYoutubeStatus({ connected: false })
      setSuccess('YouTube disconnected.')
      setYoutubeAction(null)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error disconnecting YouTube:', err)
      setYoutubeAction('error')
      setTimeout(() => setYoutubeAction(null), 3000)
    }
  }

  async function toggleNotifications() {
    if (!notifPrefs) return
    try {
      const updated = await updateNotificationPreferences({
        ...notifPrefs,
        enabled: !notifPrefs.enabled,
      })
      setNotifPrefs(updated.preferences)
      setSuccess(updated.preferences.enabled ? 'Notifications enabled' : 'Notifications paused')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error toggling notifications:', err)
    }
  }

  async function handleSignOut() {
    if (!confirm('Are you sure you want to sign out?')) return
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary-600" />
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your account, connections, and preferences
        </p>
      </div>

      {/* Success / Error Banners */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 font-medium">{success}</p>
        </div>
      )}
      {youtubeAction === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 font-medium">Something went wrong. Please try again.</p>
        </div>
      )}

      {/* Account Info */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-primary-50 rounded-lg">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Email</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{user?.email}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Member since</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Plan</span>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">
              Free Beta
            </span>
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-red-50 rounded-lg">
            <Link className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Connected Platforms</h2>
            <p className="text-sm text-gray-500">Connect your accounts to unlock analytics and AI coaching</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* YouTube — Real */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${youtubeStatus?.connected ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Youtube className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">YouTube</p>
                {youtubeLoading ? (
                  <p className="text-sm text-gray-400">Checking...</p>
                ) : youtubeStatus?.connected ? (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Connected as {youtubeStatus.details?.platform_username}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">Not connected</p>
                )}
              </div>
            </div>

            {youtubeLoading ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : youtubeStatus?.connected ? (
              <button
                onClick={handleDisconnectYouTube}
                disabled={youtubeAction === 'disconnecting'}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                {youtubeAction === 'disconnecting' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Unlink className="w-4 h-4" />
                )}
                Disconnect
              </button>
            ) : (
              <button
                onClick={handleConnectYouTube}
                disabled={youtubeAction === 'connecting'}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                {youtubeAction === 'connecting' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Link className="w-4 h-4" />
                )}
                Connect
              </button>
            )}
          </div>

          {/* Instagram — Coming Soon */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-pink-600 font-bold text-sm">IG</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Instagram</p>
                <p className="text-sm text-gray-400">Coming soon</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-medium rounded-full">Soon</span>
          </div>

          {/* TikTok — Coming Soon */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-800 font-bold text-sm">TT</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">TikTok</p>
                <p className="text-sm text-gray-400">Coming soon</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-medium rounded-full">Soon</span>
          </div>

          {/* Threads — Coming Soon */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-800 font-bold text-sm">@</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Threads</p>
                <p className="text-sm text-gray-400">Coming soon</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-medium rounded-full">Soon</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Bell className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-500">Manage your email reminders for scheduled content</p>
          </div>
        </div>

        {notifLoading ? (
          <div className="flex items-center gap-2 py-4 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading preferences...</span>
          </div>
        ) : notifPrefs ? (
          <div className="space-y-4">
            {/* Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Email reminders</p>
                <p className="text-sm text-gray-500">{notifPrefs.notification_email}</p>
              </div>
              <button
                onClick={toggleNotifications}
                className={`relative w-12 h-7 rounded-full transition-colors ${notifPrefs.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${notifPrefs.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Current setting */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>
                Reminders set to{' '}
                {notifPrefs.reminder_minutes >= 1440
                  ? `${Math.round(notifPrefs.reminder_minutes / 1440)} day${Math.round(notifPrefs.reminder_minutes / 1440) > 1 ? 's' : ''}`
                  : notifPrefs.reminder_minutes >= 60
                    ? `${Math.round(notifPrefs.reminder_minutes / 60)} hour${Math.round(notifPrefs.reminder_minutes / 60) > 1 ? 's' : ''}`
                    : `${notifPrefs.reminder_minutes} minutes`
                } before scheduled content
              </span>
            </div>

            <p className="text-xs text-gray-400">
              To change reminder timing or email, go to <a href="/scheduler" className="text-primary-600 hover:underline">Scheduler</a> and click the bell icon.
            </p>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-3">No notification preferences set yet.</p>
            <a
              href="/scheduler"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <Bell className="w-4 h-4" />
              Set up reminders
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}