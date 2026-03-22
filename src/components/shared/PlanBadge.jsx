'use client'

import { useEffect, useState } from 'react'
import { getCurrentPlan } from '@/lib/api'

export default function PlanBadge() {
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    getCurrentPlan()
      .then(res => {
        if (res.success) setPlan(res.subscription)
      })
      .catch(() => {})
  }, [])

  if (!plan) return null

  const badges = {
    free: { label: 'Free', bg: 'bg-gray-700', text: 'text-gray-300' },
    pro: { label: 'Pro', bg: 'bg-red-500/20', text: 'text-red-400' },
    max: { label: 'Max', bg: 'bg-red-500/30', text: 'text-red-300' },
  }

  const badge = badges[plan.plan] || badges.free
  const isTrialing = plan.status === 'trialing'

  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badge.bg} ${badge.text} uppercase tracking-wider`}>
        {badge.label}
      </span>
      {isTrialing && (
        <span className="text-[9px] text-yellow-400/70">Trial</span>
      )}
    </div>
  )
}