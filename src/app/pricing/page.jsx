'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createCheckout, getCurrentPlan, getCheckoutToken } from '@/lib/api'

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
  const [mobileTab, setMobileTab] = useState('pro')

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

    const priceIds = {
      pro: 'pri_01kms1rwnahqaft4frraz3g7xq',
      max: 'pri_01kms1p5vvzgq94pgdz453p0wn',
    }

    try {
      // Mint a server-signed user_id for this checkout. The webhook
      // refuses to apply a subscription unless this token verifies, so
      // we MUST get one before opening Paddle. If the call fails (user
      // not signed in, network down, server misconfigured) bail out
      // rather than open an unbillable checkout.
      let token
      try {
        const r = await getCheckoutToken()
        if (!r?.success || !r?.token) throw new Error('No checkout token')
        token = r.token
      } catch (err) {
        console.error('Failed to mint checkout token:', err)
        alert('Could not start checkout. Please sign in and try again.')
        return
      }

      if (window.Paddle) {
        window.Paddle.Checkout.open({
          items: [{ priceId: priceIds[planId], quantity: 1 }],
          customData: { user_id_signed: token },
          settings: {
            successUrl: 'https://nexora-ai.org/dashboard?upgraded=true',
          },
        })
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
    return 'Subscribe now'
  }

  function isButtonDisabled(planId) {
    return currentPlan === planId || loading === planId
  }

  const activeMobilePlan = plans.find(p => p.id === mobileTab)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F0F',
      color: '#F1F1F1',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .nx-price-nav { padding: 12px 16px !important; }
          .nx-price-header { padding: 40px 20px 24px !important; }
          .nx-price-header h1 { font-size: 26px !important; }
          .nx-price-grid-desktop { display: none !important; }
          .nx-price-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .nx-price-mobile { display: none !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nx-price-nav" style={{
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
      <div className="nx-price-header" style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.5px' }}>
          Choose your plan
        </h1>
        <p style={{ fontSize: 16, color: '#AAA', maxWidth: 480, margin: '0 auto' }}>
          Start free. Upgrade when you're ready. Cancel anytime.
        </p>
      </div>

      {/* ═══ DESKTOP: 3-column grid (unchanged) ═══ */}
      <div className="nx-price-grid-desktop" style={{
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
            {plan.badge && (
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 600,
                padding: '4px 12px', borderRadius: 6, marginBottom: 14,
                background: plan.featured ? 'rgba(255,0,0,0.12)' : 'rgba(255,255,255,0.06)',
                color: plan.featured ? '#FF4444' : '#AAA', alignSelf: 'flex-start',
              }}>{plan.badge}</span>
            )}
            {!plan.badge && <div style={{ height: 29 }} />}
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{plan.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 700 }}>${plan.price}</span>
              <span style={{ fontSize: 14, color: '#717171' }}>/month</span>
            </div>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{plan.description}</p>
            <div style={{ height: 1, background: '#2A2A2A', marginBottom: 20 }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, color: f.included === false ? '#555' : '#CCC',
                  marginBottom: 10, lineHeight: 1.4,
                }}>
                  <span style={{
                    fontSize: 12, width: 16, textAlign: 'center', flexShrink: 0,
                    color: f.included === true ? '#3EA651' : f.included === 'limit' ? '#EF9F27' : '#555',
                  }}>
                    {f.included === true ? '✓' : f.included === 'limit' ? '~' : '✗'}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={isButtonDisabled(plan.id)}
              style={{
                marginTop: 24, width: '100%', padding: '12px 0', borderRadius: 10,
                border: plan.featured ? 'none' : '1px solid #2A2A2A',
                background: plan.featured ? (currentPlan === plan.id ? '#333' : '#FF0000') : (currentPlan === plan.id ? '#222' : 'transparent'),
                color: currentPlan === plan.id ? '#666' : '#F1F1F1',
                fontSize: 14, fontWeight: 600,
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

      {/* ═══ MOBILE: ChatGPT-style tab bar + single card ═══ */}
      <div className="nx-price-mobile" style={{ display: 'none', padding: '0 20px 60px' }}>
        {/* Tab Bar */}
        <div style={{
          display: 'flex', background: '#1A1A1A', borderRadius: 12,
          padding: 4, marginBottom: 24, border: '1px solid #2A2A2A',
        }}>
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setMobileTab(plan.id)}
              style={{
                flex: 1, padding: '12px 0', borderRadius: 10, border: 'none',
                background: mobileTab === plan.id
                  ? (plan.featured ? '#FF0000' : '#2A2A2A')
                  : 'transparent',
                color: mobileTab === plan.id ? '#fff' : '#888',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s ease',
              }}
            >
              {plan.name === 'Nexora Pro' ? 'Pro' : plan.name === 'Nexora Max' ? 'Max' : plan.name}
            </button>
          ))}
        </div>

        {/* Active Plan Card */}
        {activeMobilePlan && (
          <div style={{
            background: '#1A1A1A',
            borderRadius: 16,
            border: activeMobilePlan.featured ? '2px solid #FF0000' : '1px solid #2A2A2A',
            padding: '28px 24px',
            display: 'flex', flexDirection: 'column',
          }}>
            {activeMobilePlan.badge && (
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 600,
                padding: '4px 12px', borderRadius: 6, marginBottom: 14,
                background: activeMobilePlan.featured ? 'rgba(255,0,0,0.12)' : 'rgba(255,255,255,0.06)',
                color: activeMobilePlan.featured ? '#FF4444' : '#AAA', alignSelf: 'flex-start',
              }}>{activeMobilePlan.badge}</span>
            )}

            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{activeMobilePlan.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 42, fontWeight: 800 }}>${activeMobilePlan.price}</span>
              <span style={{ fontSize: 15, color: '#717171' }}>/month</span>
            </div>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>{activeMobilePlan.description}</p>

            <div style={{ height: 1, background: '#2A2A2A', marginBottom: 20 }} />

            {/* Features table */}
            <div style={{
              background: '#141414', borderRadius: 12, border: '1px solid #222',
              overflow: 'hidden', marginBottom: 24,
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 50px',
                padding: '12px 16px', borderBottom: '1px solid #222',
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#888' }}>Features</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: activeMobilePlan.featured ? '#FF0000' : '#F1F1F1', textAlign: 'center' }}>
                  {activeMobilePlan.name === 'Nexora Pro' ? 'Pro' : activeMobilePlan.name === 'Nexora Max' ? 'Max' : '✓'}
                </span>
              </div>
              {activeMobilePlan.features.map((f, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr 50px',
                  padding: '12px 16px',
                  borderBottom: i < activeMobilePlan.features.length - 1 ? '1px solid #1A1A1A' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: f.included === false ? '#555' : '#CCC', lineHeight: 1.4 }}>{f.text}</span>
                  <div style={{ textAlign: 'center' }}>
                    {f.included === true ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeMobilePlan.featured ? '#FF0000' : '#3EA651'} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : f.included === 'limit' ? (
                      <span style={{ fontSize: 14, color: '#EF9F27' }}>~</span>
                    ) : (
                      <span style={{ fontSize: 14, color: '#555' }}>—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => handleUpgrade(activeMobilePlan.id)}
              disabled={isButtonDisabled(activeMobilePlan.id)}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 12,
                border: 'none',
                background: activeMobilePlan.featured
                  ? (currentPlan === activeMobilePlan.id ? '#333' : 'linear-gradient(135deg, #FF0000, #CC0000)')
                  : (currentPlan === activeMobilePlan.id ? '#222' : '#2A2A2A'),
                color: currentPlan === activeMobilePlan.id ? '#666' : '#F1F1F1',
                fontSize: 16, fontWeight: 700,
                cursor: isButtonDisabled(activeMobilePlan.id) ? 'default' : 'pointer',
                transition: 'all 0.2s',
                opacity: isButtonDisabled(activeMobilePlan.id) ? 0.6 : 1,
              }}
            >
              {getButtonText(activeMobilePlan.id)}
            </button>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div style={{ textAlign: 'center', paddingBottom: 40 }}>
        <p style={{ fontSize: 12, color: '#555' }}>
          Payments handled securely by Paddle. Cancel anytime from your dashboard.
        </p>
      </div>
    </div>
  )
}