'use client'

import { useState, useEffect } from 'react'
import { getAnalytics } from '@/lib/api'
import { TrendingUp, Users, Eye, Heart, MessageCircle, ArrowUp, Loader2, Youtube, AlertCircle, Play, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(null)

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600', available: true },
    { id: 'instagram', name: 'Instagram', icon: null, label: 'IG', color: 'bg-pink-600', available: false },
    { id: 'tiktok', name: 'TikTok', icon: null, label: 'TT', color: 'bg-gray-900', available: false },
    { id: 'threads', name: 'Threads', icon: null, label: '@', color: 'bg-gray-800', available: false },
  ]

  useEffect(() => {
    if (selectedPlatform === 'youtube') {
      loadAnalytics()
    }
  }, [selectedPlatform])

  async function loadAnalytics() {
    try {
      setLoading(true)
      setError(null)
      const data = await getAnalytics(selectedPlatform)
      setAnalyticsData(data.data)
      setSource(data.source)
    } catch (err) {
      console.error('Error loading analytics:', err)
      setError(err.message || 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  function formatNumber(num) {
    if (!num && num !== 0) return '0'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toLocaleString()
  }

  function timeAgo(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const now = new Date()
    const days = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 30) return `${days} days ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
  }

  const currentPlatform = platforms.find(p => p.id === selectedPlatform)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time insights from your connected platforms</p>
      </div>

      {/* Platform Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              disabled={!platform.available}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${selectedPlatform === platform.id
                  ? `${platform.color} text-white`
                  : platform.available
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {platform.icon ? (
                <platform.icon className="w-4 h-4" />
              ) : (
                <span className="text-xs font-bold">{platform.label}</span>
              )}
              {platform.name}
              {!platform.available && (
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full ml-1">Soon</span>
              )}
            </button>
          ))}
        </div>
        {source === 'live' && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live data from your YouTube channel
          </p>
        )}
        {source === 'mock' && (
          <p className="text-sm text-yellow-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Sample data — connect your account in Settings for real analytics
          </p>
        )}
      </div>

      {/* Coming Soon for non-YouTube platforms */}
      {!currentPlatform?.available && (
        <div className="card text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-gray-400">{currentPlatform?.label}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentPlatform?.name} Analytics Coming Soon</h3>
          <p className="text-gray-600">We're working on integrating {currentPlatform?.name}. Stay tuned!</p>
        </div>
      )}

      {/* Loading */}
      {loading && currentPlatform?.available && (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-600 font-medium">Error loading analytics</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Analytics */}
      {analyticsData && !loading && selectedPlatform === 'youtube' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Subscribers</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.subscribers)}</p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.total_views)}</p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg Engagement</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.insights?.avgEngagementRate || 0}%</p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Play className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Videos</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.total_videos || 0}</p>
            </div>
          </div>

          {/* Channel Overview */}
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              {analyticsData.channel_thumbnail && (
                <img src={analyticsData.channel_thumbnail} alt={analyticsData.channel_name} className="w-12 h-12 rounded-full" />
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{analyticsData.channel_name}</h2>
                <p className="text-sm text-gray-600">Avg {formatNumber(analyticsData.insights?.avgViews || 0)} views per video</p>
              </div>
            </div>

            {/* Detected Patterns */}
            {analyticsData.insights?.patterns && analyticsData.insights.patterns.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  AI-Detected Patterns
                </h3>
                <div className="space-y-2">
                  {analyticsData.insights.patterns.map((pattern, i) => (
                    <div key={i} className="p-3 bg-primary-50 border border-primary-100 rounded-lg text-sm text-primary-900">
                      {pattern}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outlier Videos */}
            {analyticsData.insights?.outlierVideos && analyticsData.insights.outlierVideos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ArrowUp className="w-5 h-5 text-green-600" />
                  Viral Outliers
                </h3>
                <div className="space-y-2">
                  {analyticsData.insights.outlierVideos.map((video, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{video.title}</p>
                        <p className="text-sm text-gray-600">{video.multiplier}</p>
                      </div>
                      <span className="text-green-700 font-bold ml-4">{formatNumber(video.views)} views</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Top Videos */}
          {analyticsData.topVideos && analyticsData.topVideos.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Videos</h2>
              <div className="space-y-4">
                {analyticsData.topVideos.map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="text-2xl font-bold text-gray-300 w-8">#{index + 1}</span>
                      {video.thumbnail && (
                        <img src={video.thumbnail} alt="" className="w-24 h-14 object-cover rounded-lg flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">{video.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(video.views)}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(video.likes)}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {formatNumber(video.comments)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(video.published_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold ml-4 flex-shrink-0">
                      {video.engagement_rate}% ER
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Uploads */}
          {analyticsData.videos && analyticsData.videos.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Uploads</h2>
              <div className="space-y-3">
                {analyticsData.videos.slice(0, 10).map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {video.thumbnail && (
                        <img src={video.thumbnail} alt="" className="w-20 h-12 object-cover rounded flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{video.title}</p>
                        <p className="text-xs text-gray-500">{timeAgo(video.published_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 ml-4 flex-shrink-0">
                      <span>{formatNumber(video.views)} views</span>
                      <span className="text-primary-600 font-medium">{video.engagement_rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
