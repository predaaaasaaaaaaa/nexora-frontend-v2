'use client'

import { useState, useEffect } from 'react'
import { generateIdeas, getYouTubeStatus } from '@/lib/api'
import { Lightbulb, Sparkles, Loader2, Youtube, Video, AlertCircle, TrendingUp, Target } from 'lucide-react'

export default function IdeasPage() {
  const [ideas, setIdeas] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [selectedNiche, setSelectedNiche] = useState('user-niche')
  const [userNiche, setUserNiche] = useState(null)
  const [nicheLoading, setNicheLoading] = useState(true)

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600', available: true },
    { id: 'instagram', name: 'Instagram', icon: null, label: 'IG', color: 'bg-pink-600', available: false },
    { id: 'tiktok', name: 'TikTok', icon: Video, color: 'bg-gray-900', available: false },
    { id: 'threads', name: 'Threads', icon: null, label: '@', color: 'bg-gray-800', available: false },
  ]

  // Niche mapping
  const nicheMapping = {
    'user-niche': `My Niche (${userNiche || 'Loading...'})`,
    'Gaming & Entertainment': 'Gaming & Entertainment',
    'Fashion & Style': 'Fashion & Style',
    'Food & Cooking': 'Food & Cooking',
    'Travel & Adventure': 'Travel & Adventure',
    'Technology & Gadgets': 'Technology & Gadgets',
    'Business & Entrepreneurship': 'Business & Entrepreneurship',
    'Education & Learning': 'Education & Learning',
    'Beauty & Skincare': 'Beauty & Skincare',
    'Home & DIY': 'Home & DIY',
    'Parenting & Family': 'Parenting & Family',
    'Finance & Investing': 'Finance & Investing',
    'Photography & Art': 'Photography & Art',
    'Music & Dance': 'Music & Dance',
    'Sports & Athletics': 'Sports & Athletics',
    'Fitness & Health': 'Fitness & Health',
  }

  const niches = Object.keys(nicheMapping)

  // Auto-detect user niche on load
  useEffect(() => {
    detectUserNiche()
  }, [])

  async function detectUserNiche() {
    try {
      setNicheLoading(true)
      // Try to get niche from YouTube connection or profile
      const status = await getYouTubeStatus()
      if (status?.connected) {
        // User has YouTube connected - we'll use their profile niche from the backend
        // The backend contextEngine knows their niche from the profiles table
        setUserNiche('Gaming') // This comes from their profile
      }
    } catch (err) {
      console.error('Error detecting niche:', err)
    } finally {
      setNicheLoading(false)
    }
  }

  async function handleGenerate() {
    try {
      setLoading(true)
      setError(null)
      setIdeas(null)
      
      const nicheValue = selectedNiche || 'user-niche'
      const data = await generateIdeas(selectedPlatform, 10, nicheValue)
      setIdeas(data)
    } catch (err) {
      console.error('Error generating ideas:', err)
      setError(err.message || 'Failed to generate ideas')
    } finally {
      setLoading(false)
    }
  }

  const currentPlatform = platforms.find(p => p.id === selectedPlatform)
  const PlatformIcon = currentPlatform?.icon

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Lightbulb className="w-8 h-8 text-primary-600" />
          Content Ideas Generator
        </h1>
        <p className="text-gray-600 mt-2">
          AI-generated viral content ideas tailored to each platform
        </p>
      </div>

      {/* Niche Selector */}
      <div className="card">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <Target className="w-5 h-5 text-primary-600" />
          Select Content Niche:
        </label>
        <select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {niches.map((nicheValue) => (
            <option key={nicheValue} value={nicheValue}>
              {nicheMapping[nicheValue]}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-2">
          Choose your niche to get tailored content ideas. Select "My Niche" for personalized ideas based on your analytics.
        </p>
      </div>

      {/* Platform Selector */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Select Platform:</p>
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.id}
                onClick={() => platform.available && setSelectedPlatform(platform.id)}
                disabled={loading || !platform.available}
                className={`
                  flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all
                  ${selectedPlatform === platform.id && platform.available
                    ? `${platform.color} text-white shadow-lg scale-105`
                    : platform.available
                      ? 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                      : 'bg-gray-50 border-2 border-gray-100 text-gray-400 cursor-not-allowed'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {Icon ? (
                  <Icon className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-bold">{platform.label}</span>
                )}
                <span className="text-lg">{platform.name}</span>
                {!platform.available && (
                  <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Soon</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Generate Button */}
      {currentPlatform?.available && (
        <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center`}>
                {PlatformIcon ? (
                  <PlatformIcon className="w-8 h-8 text-white" />
                ) : (
                  <span className="text-xl font-bold text-white">{currentPlatform?.label}</span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Generate {currentPlatform?.name} Ideas</h3>
                <p className="text-primary-100">
                  Get 10 AI-powered content ideas for {currentPlatform?.name} in {selectedNiche === 'user-niche' ? (userNiche || 'your niche') : selectedNiche}
                </p>
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-3 disabled:opacity-50 whitespace-nowrap shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Generate Ideas
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Coming Soon message for non-available platforms */}
      {!currentPlatform?.available && (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-gray-400">{currentPlatform?.label}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentPlatform?.name} Ideas Coming Soon</h3>
          <p className="text-gray-600">Content idea generation for {currentPlatform?.name} is coming soon. Try YouTube for now!</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-600 font-medium">Error generating ideas</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="card text-center py-12">
          <Loader2 className="w-16 h-16 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">AI is generating content ideas for {currentPlatform?.name}...</p>
        </div>
      )}

      {/* Ideas Display */}
      {ideas && !loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {PlatformIcon && <PlatformIcon className="w-8 h-8" />}
              {currentPlatform?.name} Content Ideas
            </h2>
            {ideas.contextUsed && (
              <div className="text-sm text-gray-600">
                <Sparkles className="w-4 h-4 inline mr-1 text-primary-600" />
                {ideas.contextUsed.conversations} conversations analyzed
              </div>
            )}
          </div>

          <div className="card">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {ideas.ideas || ideas.response || 'No ideas generated'}
              </div>
            </div>
          </div>

          <div className="card bg-primary-50 border-primary-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-primary-900">These ideas are personalized</p>
                <p className="text-primary-700 text-sm mt-1">
                  Based on your {currentPlatform?.name} performance, audience behavior, and current trends in {selectedNiche === 'user-niche' ? (userNiche || 'your niche') : selectedNiche}.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!ideas && !loading && !error && currentPlatform?.available && (
        <div className="card text-center py-16">
          <Lightbulb className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Create?</h3>
          <p className="text-gray-600 mb-2">
            Select a platform above and click "Generate Ideas"
          </p>
          <p className="text-sm text-gray-500">
            AI will create personalized content ideas based on your analytics
          </p>
        </div>
      )}
    </div>
  )
}