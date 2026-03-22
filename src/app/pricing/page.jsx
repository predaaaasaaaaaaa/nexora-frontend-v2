'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createCheckout, getCurrentPlan } from '@/lib/api'

const NexoraLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="nG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="100%" stopColor="#CC0000" />
      </linearGradient>
    </defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nG)" />
  </svg>
)

const plans = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    description: 'See the value. Get hooked. Want more.',
    badge: null,
    featured: false,
    features: [
      { text: 'Basic dashboard (7-day data)', included: true },
      { text: '5 AI Coach messages/day', included: 'limit' },
      { text: 'No conversation history', included: false },
      { text: '3 content ideas/week', included: 'limit' },
      { text: 'No content scheduler', included: false },
      { text: 'No competitor analysis', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Nexora Pro',
    price: 19,
    description: 'Everything you need to grow seriously.',
    badge: 'Most popular',
    featured: true,
    features: [
      { text: 'Full dashboard (90-day data)', included: true },
      { text: '15 AI Coach messages/day', included: true },
      { text: 'Conversation history (saved)', included: true },
      { text: '30 content ideas/week', included: true },
      { text: 'Content scheduler + reminders', included: true },
      { text: 'Track 3 competitors', included: 'limit' },
    ],
  },
  {
    id: 'max',
    name: 'Nexora Max',
    price: 49,
    description: 'Full power. Zero limits. Total control.',
    badge: 'For serious creators',
    featured: false,
    features: [
      { text: 'Full dashboard (all-time data)', included: true },
      { text: 'Unlimited AI Coach messages', included: true },
      { text: 'Full conversation history', included: true },
      { text: 'Unlimited content ideas', included: true },
      { text: 'Content scheduler + reminders', included: true },
      { text: 'Track 10 competitors', included: true },
    ],
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [currentPlan, setCurrentPlan] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    getCurrentPlan()
      .then(res => {
        if (res.success) setCurrentPlan(res.subscription?.plan)
      })
      .catch(() => {})
  }, [])

  async function handleUpgrade(planId) {
    if (planId === 'free') return
    setLoading(planId)
    try {
      const result = await createCheckout(planId)
      if (result.success && result.checkoutUrl) {
        window.open(result.checkoutUrl, '_blank')
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(null)
    }
  }

  function getButtonText(planId) {
    if (currentPlan === planId) return 'Current plan'
    if (planId === 'free') return 'Free forever'
    if (loading === planId) return 'Opening checkout...'
    return `Start 14-day free trial`
  }

  function isButtonDisabled(planId) {
    return currentPlan === planId || loading === planId
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F0F',
      color: '#F1F1F1',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Nav */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        borderBottom: '1px solid #1A1A1A',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <NexoraLogo />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#F1F1F1' }}>NEXORA</span>
        </Link>
        <Link
          href="/dashboard"
          style={{
            fontSize: 13,
            color: '#AAA',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #2A2A2A',
            transition: 'all 0.2s',
          }}
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.5px' }}>
          Choose your plan
        </h1>
        <p style={{ fontSize: 16, color: '#AAA', maxWidth: 480, margin: '0 auto' }}>
          Start free. Upgrade when you're ready. Every paid plan includes a 14-day free trial.
        </p>
      </div>

      {/* Plans */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        maxWidth: 960,
        margin: '0 auto',
        padding: '0 20px 80px',
      }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              background: '#1A1A1A',
              borderRadius: 16,
              border: plan.featured ? '2px solid #FF0000' : '1px solid #2A2A2A',
              padding: '28px 24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <span style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: 6,
                marginBottom: 14,
                background: plan.featured ? 'rgba(255,0,0,0.12)' : 'rgba(255,255,255,0.06)',
                color: plan.featured ? '#FF4444' : '#AAA',
                alignSelf: 'flex-start',
              }}>
                {plan.badge}
              </span>
            )}
            {!plan.badge && <div style={{ height: 29 }} />}

            {/* Plan name */}
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{plan.name}</h3>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 700 }}>
                ${plan.price}
              </span>
              <span style={{ fontSize: 14, color: '#717171' }}>/month</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{plan.description}</p>

            {/* Divider */}
            <div style={{ height: 1, background: '#2A2A2A', margin: '0 -24px', marginBottom: 20, padding: '0 24px' }} />

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: f.included === false ? '#555' : '#CCC',
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}>
                  <span style={{
                    fontSize: 12,
                    width: 16,
                    textAlign: 'center',
                    flexShrink: 0,
                    color: f.included === true ? '#3EA651'
                      : f.included === 'limit' ? '#EF9F27'
                      : '#555',
                  }}>
                    {f.included === true ? '✓' : f.included === 'limit' ? '~' : '✗'}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={isButtonDisabled(plan.id)}
              style={{
                marginTop: 24,
                width: '100%',
                padding: '12px 0',
                borderRadius: 10,
                border: plan.featured ? 'none' : '1px solid #2A2A2A',
                background: plan.featured
                  ? (currentPlan === plan.id ? '#333' : '#FF0000')
                  : (currentPlan === plan.id ? '#222' : 'transparent'),
                color: currentPlan === plan.id ? '#666' : '#F1F1F1',
                fontSize: 14,
                fontWeight: 600,
                cursor: isButtonDisabled(plan.id) ? 'default' : 'pointer',
                transition: 'all 0.2s',
                opacity: isButtonDisabled(plan.id) ? 0.6 : 1,
              }}
            >
              {getButtonText(plan.id)}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ textAlign: 'center', paddingBottom: 40 }}>
        <p style={{ fontSize: 12, color: '#555' }}>
          Payments handled securely by Lemon Squeezy. Cancel anytime from your dashboard.
        </p>
      </div>
    </div>
  )
}