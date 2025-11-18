'use client'

import { useParams, useRouter } from 'next/navigation'
import { TrendingUp, Heart, Trophy, ArrowLeft, Sparkles, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ComingSoonPage() {
  const params = useParams()
  const router = useRouter()

  const features = {
    'growth-score': {
      icon: TrendingUp,
      name: 'Growth Score',
      description: 'Compare your NEXORA performance with other users. See your growth score based on your activity, content quality, and engagement. Climb the ranks and discover how you stack up against the community!',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    'motivation': {
      icon: Heart,
      name: 'Motivation',
      description: 'Get daily inspiration and motivation tips. Access a library of quotes, success stories, and content ideas to keep you inspired and consistent.',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
    'ranking': {
      icon: Trophy,
      name: 'Ranking',
      description: 'See how you rank against other creators. Compete on leaderboards, earn badges, and unlock achievements as you grow your audience.',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    }
  }

  const feature = features[params.feature] || features['growth-score']
  const Icon = feature.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Gradient Header */}
          <div className={`bg-gradient-to-r ${feature.color} p-12 text-white relative overflow-hidden`}>
            <div className="relative z-10">
              <div className={`w-20 h-20 rounded-2xl ${feature.bgColor} bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-4">
                {feature.name}
              </h1>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-xl font-medium">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-12">
            {/* Description */}
            <div className="mb-10">
              <p className="text-xl text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Release Date */}
            <div className="mb-10 p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl border border-primary-100">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700 uppercase tracking-wide">
                  Expected Release
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                Coming in Next Update
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="flex-1 btn-primary text-center"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/coach"
                className="flex-1 btn-secondary text-center"
              >
                Try AI Coach
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">500+ early adopters</span> are already using NEXORA Beta
          </p>
        </div>
      </div>
    </div>
  )
}

