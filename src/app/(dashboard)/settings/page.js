'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/supabase'
import { Settings as SettingsIcon, User, Mail, Save, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    const { user } = await getCurrentUser()
    setUser(user)
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    // Simulate save
    setTimeout(() => {
      setSaving(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary-600" />
          Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
        
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="input pl-10 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* User ID */}
          <div>
            <label className="label">User ID</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={user?.id || ''}
                disabled
                className="input pl-10 bg-gray-50 cursor-not-allowed text-xs"
              />
            </div>
          </div>

          {/* Created Date */}
          <div>
            <label className="label">Member Since</label>
            <input
              type="text"
              value={new Date(user?.created_at).toLocaleDateString() || ''}
              disabled
              className="input bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Platform Connections */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Platforms</h2>
        
        <div className="space-y-4">
          {['Instagram', 'YouTube', 'TikTok', 'Twitter'].map((platform) => (
            <div key={platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{platform}</p>
                <p className="text-sm text-gray-600">Using mock data for beta</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Connected
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="card bg-green-50 border-green-200">
          <p className="text-green-700 font-medium">✓ Settings saved successfully!</p>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary flex items-center gap-2"
      >
        {saving ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>
    </div>
  )
}

