'use client'

import { useEffect, useState } from 'react'
import { getCombinedAnalytics } from '@/lib/api'
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Instagram, 
  Youtube, 
  Twitter,
  Video,
  Loader2
} from 'lucide-react'

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAnalytics()
  }, [])

  async function loadAnalytics() {
    try {
      setLoading(true)
      const data = await getCombinedAnalytics()
      setAnalytics(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card bg-red-50 border-red-200">
        <p className="text-red-600">Error loading analytics: {error}</p>
        <button onClick={loadAnalytics} className="btn-primary mt-4">
          Retry
        </button>
      </div>
    )
  }

  const platformIcons = {
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Video,
    twitter: Twitter
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Your unified social media analytics across all platforms
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Followers</p>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.totalFollowers?.toLocaleString()}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Posts</p>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.totalPosts}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg Engagement</p>
          <p className="text-3xl font-bold text-gray-900">
            {analytics?.avgEngagement}%
          </p>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(analytics?.platforms || {}).map(([platform, data]) => {
            const Icon = platformIcons[platform]
            
            return (
              <div key={platform} className="card hover:shadow-lg transition-shadow">
                {/* Platform Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {platform}
                    </h3>
                    <p className="text-sm text-gray-600">
                      @{data.username || data.channel_name || 'Not connected'}
                    </p>
                  </div>
                </div>

                {/* Platform Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Followers</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {(data.followers || data.subscribers)?.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Posts</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {(data.posts || data.videos || data.tweets)?.length}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Engagement</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.insights?.avgEngagementRate}%
                    </p>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">
                      {data.insights?.audienceGrowth || data.insights?.followerGrowth || data.insights?.subscriberGrowth}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <h3 className="text-xl font-bold mb-2">Ready to optimize your content?</h3>
        <p className="text-primary-100 mb-6">
          Get AI-powered insights and recommendations tailored to your performance
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/coach" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Talk to AI Coach
          </a>
          <a href="/ideas" className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
            Generate Content Ideas
          </a>
        </div>
      </div>
    </div>
  )
}

