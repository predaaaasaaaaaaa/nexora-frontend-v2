'use client'

import { useState } from 'react'
import { createCheckout, getCheckoutToken } from '@/lib/api'
import { PADDLE_PRICE_IDS } from '@/lib/plans'
import { log } from '@/lib/log'

export default function UpgradePrompt({ message, currentPlan, upgradeTo, usage, onDismiss }) {
  const [loading, setLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const planDetails = {
    pro: {
      name: 'Nexora Pro',
      price: '$19/mo',
      color: '#FF0000',
      features: [
        '15 AI Coach messages/day',
        '30 content ideas/week',
        'Conversation history',
        'Content scheduler + reminders',
        'Track 3 competitors',
      ],
    },
    max: {
      name: 'Nexora Max',
      price: '$49/mo',
      color: '#FF0000',
      features: [
        'Unlimited AI Coach messages',
        'Unlimited content ideas',
        'Full conversation history',
        'Content scheduler + reminders',
        'Track 10 competitors',
      ],
    },
  }

  const plan = planDetails[upgradeTo] || planDetails.pro

  async function handleUpgrade() {
    setLoading(true)
    setCheckoutError('')

    const priceIds = PADDLE_PRICE_IDS

    try {
      // The webhook only honors a signed user_id, so we must mint one
      // before opening Paddle. If we can't, don't open checkout — an
      // unsigned payment would be ignored by the backend anyway.
      let token
      try {
        const r = await getCheckoutToken()
        if (!r?.success || !r?.token) throw new Error('No checkout token')
        token = r.token
      } catch (err) {
        log.error('[checkout] mint token failed', err?.message || err)
        setCheckoutError('Could not start checkout. Please refresh and try again.')
        return
      }

      if (window.Paddle) {
        const origin = process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin
        window.Paddle.Checkout.open({
          items: [{ priceId: priceIds[upgradeTo], quantity: 1 }],
          customData: { user_id_signed: token },
          settings: {
            successUrl: `${origin}/dashboard?upgraded=true`,
          },
        })
      }
    } catch (error) {
      log.error('[checkout] open failed', error?.message || error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Upgrade to {plan.name}</span>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-gray-500 hover:text-gray-300 text-lg leading-none">
            ×
          </button>
        )}
      </div>

      {/* Message */}
      <p className="text-sm text-gray-300 mb-4">
        {message || `You've reached your ${currentPlan === 'free' ? 'free plan' : 'Nexora Pro'} limit. Upgrade to keep going!`}
      </p>

      {/* Usage bar (if available) */}
      {usage && usage.limit !== 'unlimited' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{usage.used} / {usage.limit} used</span>
            <span>{usage.remaining} remaining</span>
          </div>
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, (usage.used / usage.limit) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Features */}
      <ul className="space-y-1.5 mb-4">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-green-400">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
      >
        {loading ? 'Opening checkout...' : `Upgrade to ${plan.name} — ${plan.price}`}
      </button>

      {checkoutError && (
        <p role="alert" className="mt-2 text-xs text-red-400 text-center">{checkoutError}</p>
      )}

      {/* 14-day trial note */}
      <p className="text-center text-[10px] text-gray-500 mt-2">
        14-day free trial • Cancel anytime
      </p>
    </div>
  )
}