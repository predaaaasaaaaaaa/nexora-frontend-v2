'use client'

import { useState } from 'react'
import { TrendingUp, Users, Eye, Heart, Share2, MessageCircle, ArrowUp, ArrowDown, Flame } from 'lucide-react'

export default function AnalyticsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('TikTok')

  const platforms = ['TikTok', 'YouTube', 'Instagram', 'X']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive insights across all your connected platforms</p>
      </div>

      {/* Platform Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${selectedPlatform === platform
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {platform}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">Showing data for: <span className="font-semibold">{selectedPlatform}</span></p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Followers */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+12.5%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Followers</p>
          <p className="text-3xl font-bold text-gray-900">245.8K</p>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </div>

        {/* Total Views */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+8.3%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Views</p>
          <p className="text-3xl font-bold text-gray-900">2.4M</p>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </div>

        {/* Engagement Rate */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <ArrowDown className="w-4 h-4" />
              <span className="text-sm font-semibold">-2.1%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Engagement Rate</p>
          <p className="text-3xl font-bold text-gray-900">6.8%</p>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </div>

        {/* Avg. Shares */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+15.2%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg. Shares</p>
          <p className="text-3xl font-bold text-gray-900">1,284</p>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </div>
      </div>

      {/* Audience Analysis */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Audience Analysis</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Age Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">18-24</span>
                  <span className="font-semibold text-gray-900">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-600 h-3 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">25-34</span>
                  <span className="font-semibold text-gray-900">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">35-44</span>
                  <span className="font-semibold text-gray-900">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-400 h-3 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">45+</span>
                  <span className="font-semibold text-gray-900">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-300 h-3 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Gender Split */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Split</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Female</span>
                  <span className="font-semibold text-gray-900">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-pink-500 h-3 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Male</span>
                  <span className="font-semibold text-gray-900">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Other</span>
                  <span className="font-semibold text-gray-900">7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Locations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">🇺🇸 United States</span>
                <span className="font-semibold text-gray-900">45%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">🇬🇧 United Kingdom</span>
                <span className="font-semibold text-gray-900">22%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">🇨🇦 Canada</span>
                <span className="font-semibold text-gray-900">15%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">🇦🇺 Australia</span>
                <span className="font-semibold text-gray-900">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Posts</h2>
        <div className="space-y-4">
          {[
            { title: '7-Day Transformation Challenge', views: '487K', likes: '45K', comments: '2.1K', er: '9.2%' },
            { title: 'Morning Routine for Success', views: '312K', likes: '26K', comments: '1.5K', er: '8.5%' },
            { title: 'Behind the Scenes Workout', views: '245K', likes: '19K', comments: '982', er: '7.8%' },
            { title: 'Aesthetic Home Gym Tour', views: '198K', likes: '14K', comments: '743', er: '7.2%' },
          ].map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                {post.er} ER
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Niche Analysis */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Niche Analysis</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600 mb-2">Your Niche</p>
            <p className="text-xl font-bold text-gray-900 mb-4">Fitness & Health</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700">Market Saturation</span>
                <span className="font-semibold text-gray-900">Medium (58%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Content Opportunity Score</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">7.8</span>
              <span className="text-xl text-gray-600">/10</span>
            </div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              High Potential
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Trending Sub-Niches</p>
          <div className="flex flex-wrap gap-2">
            {['Home Workouts', 'Meal Prep', 'Mental Health', 'Wellness'].map((niche) => (
              <span key={niche} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                {niche}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Trends</h2>
        <div className="space-y-3">
          {[
            { topic: 'Transformation Videos', growth: '+127%', hot: true },
            { topic: 'Quick Workout Hacks', growth: '+94%', hot: true },
            { topic: 'Nutrition Myths', growth: '+68%', hot: false },
            { topic: 'Recovery Tips', growth: '+45%', hot: false },
          ].map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {trend.hot && <Flame className="w-5 h-5 text-orange-500" />}
                <span className="font-medium text-gray-900">{trend.topic}</span>
                {trend.hot && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-semibold">Hot</span>}
              </div>
              <span className="text-green-600 font-semibold">{trend.growth}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Competitor Analysis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: '@FitInfluencer1', followers: '1.2M', er: '8.9%', growth: '+15%', strategy: 'Daily transformation posts' },
            { name: '@HealthGuru_', followers: '890K', er: '7.5%', growth: '+12%', strategy: 'Educational nutrition content' },
          ].map((competitor, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{competitor.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Followers</span>
                  <span className="font-semibold text-gray-900">{competitor.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                    {competitor.er} ER
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Growth</span>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <ArrowUp className="w-4 h-4" />
                    {competitor.growth}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Strategy</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{competitor.strategy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What's Performing Well */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Performing Well in Your Niche</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Content Types</h3>
          <div className="space-y-4">
            {[
              { type: 'Before/After Videos', score: 95 },
              { type: 'Quick Tips (30-60s)', score: 88 },
              { type: 'Challenge Videos', score: 82 },
              { type: 'Behind-the-Scenes', score: 76 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{item.type}</span>
                  <span className="font-semibold text-gray-900">{item.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-600 h-3 rounded-full" style={{ width: `${item.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Posting Times</h3>
          <div className="space-y-2">
            {[
              { time: '6-8 AM', label: 'Morning Routine', level: 'High' },
              { time: '12-1 PM', label: 'Lunch Break', level: 'Medium' },
              { time: '6-8 PM', label: 'After Work', level: 'Very High' },
              { time: '9-10 PM', label: 'Evening', level: 'High' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{item.time}</span>
                  <span className="text-gray-600 ml-2">({item.label})</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.level === 'Very High' ? 'bg-green-100 text-green-700' :
                  item.level === 'High' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Hashtags in Niche</h3>
          <div className="flex flex-wrap gap-2">
            {['#fitness', '#transformation', '#workout', '#healthylifestyle', '#motivation', '#fitfam', '#gym', '#wellness'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

