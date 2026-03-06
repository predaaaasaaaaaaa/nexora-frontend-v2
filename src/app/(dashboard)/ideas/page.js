'use client'

import { useState, useEffect } from 'react'
import { generateIdeas, getYouTubeStatus } from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'

// ── Theme colors ──
const themes = {
  dark: {
    card: '#1A1A1A', cardHover: '#222',
    text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    chip: '#2A2A2A', chipActive: '#FF0000', chipActiveText: '#fff',
    selectBg: '#1A1A1A', selectBorder: '#2A2A2A',
    emptyBg: '#161616',
  },
  light: {
    card: '#FFFFFF', cardHover: '#F5F5F5',
    text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    chip: '#F2F2F2', chipActive: '#FF0000', chipActiveText: '#fff',
    selectBg: '#FFFFFF', selectBorder: '#E5E5E5',
    emptyBg: '#FAFAFA',
  },
}

const I = {
  Sparkle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  ChevDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  Refresh: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
}

export default function IdeasPage() {
  // ── Your existing data logic (unchanged) ──
  const [ideas, setIdeas] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [selectedNiche, setSelectedNiche] = useState('user-niche')
  const [userNiche, setUserNiche] = useState(null)
  const [nicheLoading, setNicheLoading] = useState(true)
  const { dark } = useTheme()
  const c = dark ? themes.dark : themes.light

  const platforms = [
    { id: 'youtube', name: 'YouTube', available: true },
    { id: 'instagram', name: 'Instagram', available: false },
    { id: 'tiktok', name: 'TikTok', available: false },
    { id: 'threads', name: 'Threads', available: false },
  ]

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

  useEffect(() => { detectUserNiche() }, [])

  async function detectUserNiche() {
    try {
      setNicheLoading(true)
      const status = await getYouTubeStatus()
      if (status?.connected) {
        setUserNiche('Gaming')
      }
    } catch (err) { console.error('Error detecting niche:', err) }
    finally { setNicheLoading(false) }
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
    } finally { setLoading(false) }
  }

  const currentPlatform = platforms.find(p => p.id === selectedPlatform)

  return (
    <div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .gen-btn { transition: all 0.2s ease; cursor: pointer; }
        .gen-btn:hover { transform: scale(1.02); box-shadow: 0 6px 24px rgba(255,0,0,0.3); }
      `}</style>

      {/* ── Controls Card ── */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: '22px', marginBottom: 24 }}>

        {/* Niche Selector */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 14 }}>🎯</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Select Content Niche:</span>
          </div>
          <div style={{ position: 'relative' }}>
            <select
              value={selectedNiche}
              onChange={e => setSelectedNiche(e.target.value)}
              disabled={loading}
              style={{
                width: '100%', padding: '12px 16px',
                borderRadius: 10, border: `1px solid ${c.selectBorder}`,
                background: c.selectBg, color: c.text,
                fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
                appearance: 'none', cursor: 'pointer', outline: 'none',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {niches.map(n => <option key={n} value={n}>{nicheMapping[n]}</option>)}
            </select>
            <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: c.textDim }}><I.ChevDown /></div>
          </div>
          <p style={{ fontSize: 12, color: c.textDim, marginTop: 6 }}>
            Choose your niche to get tailored content ideas. Select "My Niche" for personalized ideas based on your analytics.
          </p>
        </div>

        {/* Platform Selector */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text, display: 'block', marginBottom: 8 }}>Select Platform:</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {platforms.map((p) => (
              <button key={p.id} onClick={() => p.available && setSelectedPlatform(p.id)}
                disabled={loading || !p.available}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 10,
                  background: selectedPlatform === p.id && p.available ? c.chipActive : c.chip,
                  color: selectedPlatform === p.id && p.available ? c.chipActiveText : c.textSec,
                  border: 'none', cursor: p.available ? 'pointer' : 'default',
                  fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                  opacity: p.available ? (loading ? 0.5 : 1) : 0.4,
                  transition: 'all 0.15s ease',
                }}>
                {p.id === 'youtube' && '▶ '}{p.name}
                {!p.available && <span style={{ fontSize: 9, fontWeight: 700, background: dark ? '#333' : '#ddd', padding: '1px 6px', borderRadius: 3, marginLeft: 2, color: c.textDim }}>Soon</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Generate CTA */}
        {currentPlatform?.available && (
          <div style={{
            background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`,
            borderRadius: 12, padding: '18px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>▶</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Generate {currentPlatform?.name} Ideas</h3>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                Get 10 AI-powered content ideas for {currentPlatform?.name} in {selectedNiche === 'user-niche' ? (userNiche || 'your niche') : selectedNiche}
              </p>
            </div>
            <button className="gen-btn" onClick={handleGenerate} disabled={loading}
              style={{
                padding: '12px 28px', borderRadius: 10,
                background: '#fff', color: c.red,
                border: 'none', fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 8,
                opacity: loading ? 0.7 : 1,
              }}>
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, border: '2px solid #ccc', borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
                  Generating...
                </>
              ) : (
                <><I.Sparkle /> Generate Ideas</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Coming Soon ── */}
      {!currentPlatform?.available && (
        <div style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, padding: '60px 20px', textAlign: 'center',
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: c.chip, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: c.textDim, fontSize: 24, fontWeight: 700 }}>
            {currentPlatform?.name?.[0]}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 8 }}>{currentPlatform?.name} Ideas Coming Soon</h3>
          <p style={{ fontSize: 14, color: c.textSec }}>Content idea generation for {currentPlatform?.name} is coming soon. Try YouTube for now!</p>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div style={{
          background: c.redBg, border: `1px solid ${c.redBorder}`,
          borderRadius: 12, padding: '16px 20px', marginBottom: 20,
        }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: c.red }}>Error generating ideas</p>
          <p style={{ fontSize: 13, color: c.textSec, marginTop: 4 }}>{error}</p>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, padding: '60px 20px', textAlign: 'center',
        }}>
          <div style={{ width: 48, height: 48, border: `3px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}/>
          <p style={{ color: c.textDim, fontSize: 14 }}>AI is generating content ideas for {currentPlatform?.name}...</p>
        </div>
      )}

      {/* ── Ideas Display ── */}
      {ideas && !loading && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: c.text }}>
              {currentPlatform?.name} Content Ideas
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {ideas.contextUsed && (
                <span style={{ fontSize: 12, color: c.textDim }}>
                  <span style={{ color: c.red }}>✦</span> {ideas.contextUsed.conversations} conversations analyzed
                </span>
              )}
              <button onClick={handleGenerate} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 10,
                background: c.chip, border: `1px solid ${c.border}`,
                color: c.textSec, cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
              }}>
                <I.Refresh /> Regenerate
              </button>
            </div>
          </div>

          {/* Ideas content card */}
          <div style={{
            background: c.card, border: `1px solid ${c.border}`,
            borderRadius: 14, padding: '24px', marginBottom: 16,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c.red}, transparent)`, opacity: 0.4 }}/>
            <div style={{ fontSize: 14, color: c.text, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {ideas.ideas || ideas.response || 'No ideas generated'}
            </div>
          </div>

          {/* Personalized note */}
          <div style={{
            background: c.greenBg, border: `1px solid ${c.greenBorder}`,
            borderRadius: 12, padding: '14px 18px',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>📈</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: c.green }}>These ideas are personalized</p>
              <p style={{ fontSize: 12, color: c.textSec, marginTop: 2 }}>
                Based on your {currentPlatform?.name} performance, audience behavior, and current trends in {selectedNiche === 'user-niche' ? (userNiche || 'your niche') : selectedNiche}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {!ideas && !loading && !error && currentPlatform?.available && (
        <div style={{
          background: c.emptyBg, border: `1px solid ${c.border}`,
          borderRadius: 14, padding: '60px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, background: c.chip,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, color: c.textDim,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
            </svg>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 8 }}>Ready to Create?</h3>
          <p style={{ fontSize: 14, color: c.textSec, maxWidth: 400, lineHeight: 1.5 }}>
            Select a platform above and click "Generate Ideas" — AI will create personalized content ideas based on your analytics
          </p>
        </div>
      )}
    </div>
  )
}