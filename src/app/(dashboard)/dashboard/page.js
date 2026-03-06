'use client'

import { useEffect, useState } from 'react'
import { getYouTubeAnalytics, getYouTubeStatus } from '@/lib/api'
import { 
  TrendingUp, 
  Users, 
  Eye,
  Play,
  Heart,
  Youtube,
  Video,
  Loader2,
  ArrowRight,
  Sparkles,
  Zap,
  Trophy,
  AlertCircle
} from 'lucide-react'

export default function DashboardPage() {
  const [ytData, setYtData] = useState(null)
  const [ytConnected, setYtConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      setLoading(true)
      const status = await getYouTubeStatus()
      setYtConnected(status?.connected || false)

      if (status?.connected) {
        const analytics = await getYouTubeAnalytics()
        if (analytics?.connected && analytics?.data) {
          setYtData(analytics.data)
        }
      }
    } catch (err) {
      console.error('Error loading dashboard:', err)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Your channel overview at a glance</p>
      </div>

      {/* YouTube Connected — Main Stats */}
      {ytConnected && ytData ? (
        <>
          {/* Channel Header */}
          <div className="card bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center">
                <Youtube className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{ytData.channel_name}</h2>
                <p className="text-sm text-red-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live data connected
                </p>
              </div>
              <a href="/analytics" className="flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-800">
                View full analytics <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Key Metrics — 4 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card text-center">
              <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formatNumber(ytData.subscribers)}</p>
              <p className="text-xs text-gray-500 mt-1">Subscribers</p>
            </div>
            <div className="card text-center">
              <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{formatNumber(ytData.total_views)}</p>
              <p className="text-xs text-gray-500 mt-1">Total Views</p>
            </div>
            <div className="card text-center">
              <Play className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{ytData.total_videos}</p>
              <p className="text-xs text-gray-500 mt-1">Videos</p>
            </div>
            <div className="card text-center">
              <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{ytData.insights?.avgEngagementRate}%</p>
              <p className="text-xs text-gray-500 mt-1">Avg Engagement</p>
            </div>
          </div>

          {/* Two Column — Top Video + Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Video */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Best Performing Video
              </h3>
              {ytData.topVideos?.[0] && (
                <div>
                  {ytData.topVideos[0].thumbnail && (
                    <img 
                      src={ytData.topVideos[0].thumbnail} 
                      alt="" 
                      className="w-full h-40 object-cover rounded-lg mb-3" 
                    />
                  )}
                  <p className="font-medium text-gray-900 text-sm mb-2">{ytData.topVideos[0].title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(ytData.topVideos[0].views)}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(ytData.topVideos[0].likes)}</span>
                    <span className="text-primary-600 font-medium">{ytData.topVideos[0].engagement_rate}% ER</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Insights */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-600" />
                Quick Insights
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Avg views per video</p>
                  <p className="text-lg font-bold text-gray-900">{formatNumber(ytData.insights?.avgViews || 0)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Recent likes</p>
                  <p className="text-lg font-bold text-gray-900">{formatNumber(ytData.insights?.totalRecentLikes || 0)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Recent comments</p>
                  <p className="text-lg font-bold text-gray-900">{formatNumber(ytData.insights?.totalRecentComments || 0)}</p>
                </div>
                {ytData.insights?.outlierVideos?.length > 0 && (
                  <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      🔥 {ytData.insights.outlierVideos.length} viral outlier{ytData.insights.outlierVideos.length > 1 ? 's' : ''} detected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Uploads — compact list */}
          {ytData.videos && ytData.videos.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Uploads</h3>
                <a href="/analytics" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  See all <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-2">
                {ytData.videos.slice(0, 5).map((video, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {video.thumbnail && (
                        <img src={video.thumbnail} alt="" className="w-16 h-10 object-cover rounded flex-shrink-0" />
                      )}
                      <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 ml-3 flex-shrink-0">
                      <span>{formatNumber(video.views)}</span>
                      <span className="text-primary-600 font-medium">{video.engagement_rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* YouTube Not Connected */
        <div className="card text-center py-12">
          <Youtube className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your YouTube Channel</h3>
          <p className="text-gray-600 mb-6">Link your YouTube account to see real analytics and get personalized AI coaching.</p>
          <a href="/settings" className="btn-primary inline-flex items-center gap-2">
            Go to Settings <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Other Platforms — Coming Soon */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">More Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Instagram', label: 'IG', bg: 'bg-pink-100', text: 'text-pink-600' },
            { name: 'TikTok', label: 'TT', bg: 'bg-gray-100', text: 'text-gray-700' },
            { name: 'Threads', label: '@', bg: 'bg-gray-100', text: 'text-gray-800' },
          ].map((platform) => (
            <div key={platform.name} className="card flex items-center gap-4 opacity-60">
              <div className={`w-10 h-10 ${platform.bg} rounded-lg flex items-center justify-center`}>
                <span className={`font-bold text-sm ${platform.text}`}>{platform.label}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{platform.name}</p>
                <p className="text-xs text-gray-500">Coming soon</p>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">Soon</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <h3 className="text-xl font-bold mb-2">Ready to grow your channel?</h3>
        <p className="text-primary-100 mb-6">
          Get AI-powered coaching and content ideas based on your real YouTube data
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/coach" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Talk to AI Coach
          </a>
          <a href="/ideas" className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Generate Content Ideas
          </a>
        </div>
      </div>
    </div>
  )
}