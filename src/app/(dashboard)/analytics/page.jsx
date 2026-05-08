'use client'

import { useState, useEffect } from 'react'
import { getAnalytics } from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'
import ChannelAvatar from '@/components/shared/ChannelAvatar'
import { log } from '@/lib/log'
import Link from 'next/link'

// ── Theme colors ──
const themes = {
  dark: {
    card: '#1A1A1A', cardHover: '#222',
    text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    orange: '#FF8C00', orangeBg: 'rgba(255,140,0,0.1)', orangeBorder: 'rgba(255,140,0,0.2)',
    blue: '#4D9EFF', blueBg: 'rgba(77,158,255,0.1)', blueBorder: 'rgba(77,158,255,0.2)',
    yellow: '#FFD600', yellowBg: 'rgba(255,214,0,0.1)', yellowBorder: 'rgba(255,214,0,0.2)',
    chip: '#2A2A2A', chipActive: '#FF0000', chipActiveText: '#fff',
  },
  light: {
    card: '#FFFFFF', cardHover: '#F5F5F5',
    text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    orange: '#E67E00', orangeBg: 'rgba(230,126,0,0.08)', orangeBorder: 'rgba(230,126,0,0.15)',
    blue: '#2979FF', blueBg: 'rgba(41,121,255,0.08)', blueBorder: 'rgba(41,121,255,0.15)',
    yellow: '#F5C400', yellowBg: 'rgba(245,196,0,0.08)', yellowBorder: 'rgba(245,196,0,0.15)',
    chip: '#F2F2F2', chipActive: '#FF0000', chipActiveText: '#fff',
  },
}

// ── Icons ──
const I = {
  Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Heart: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Play: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Sparkle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  Arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
}

// ── Pattern colors mapping ──
const patternStyles = [
  { color: 'blue', icon: '📊', label: 'CONTENT MIX' },
  { color: 'orange', icon: '🔥', label: 'VIRAL OUTLIERS' },
  { color: 'yellow', icon: '📅', label: 'POSTING CONSISTENCY' },
  { color: 'green', icon: '💎', label: 'HIDDEN GEMS' },
  { color: 'red', icon: '🌍', label: 'TITLE LANGUAGE' },
]

function getPatternStyle(index, c) {
  const p = patternStyles[index % patternStyles.length]
  return {
    color: c[p.color] || c.red,
    bg: c[p.color + 'Bg'] || c.redBg,
    border: c[p.color + 'Border'] || c.redBorder,
    icon: p.icon,
    label: p.label,
  }
}

export default function AnalyticsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(null)
  const { dark } = useTheme()
  const c = dark ? themes.dark : themes.light

  const platforms = [
    { id: 'youtube', name: 'YouTube', available: true },
    { id: 'instagram', name: 'Instagram', available: false },
    { id: 'tiktok', name: 'TikTok', available: false },
    { id: 'threads', name: 'Threads', available: false },
  ]

  useEffect(() => {
    if (selectedPlatform === 'youtube') loadAnalytics()
  }, [selectedPlatform])

  async function loadAnalytics() {
    try {
      setLoading(true); setError(null)
      const data = await getAnalytics(selectedPlatform)
      setAnalyticsData(data.data); setSource(data.source)
    } catch (err) {
      log.error('[analytics] load failed', err?.message || err)
      setError(err.message || 'Failed to load analytics')
    } finally { setLoading(false) }
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
    if (days < 30) return `${days}d ago`
    if (days < 365) return `${Math.floor(days / 30)}mo ago`
    return `${Math.floor(days / 365)}y ago`
  }

  const currentPlatform = platforms.find(p => p.id === selectedPlatform)

  if (loading && currentPlatform?.available) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: `3px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}/>
          <p style={{ color: c.textDim, fontSize: 14 }}>Loading analytics...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeUp 0.45s ease forwards; opacity: 0; }
        .fade-in:nth-child(1) { animation-delay: 0.04s; }
        .fade-in:nth-child(2) { animation-delay: 0.08s; }
        .fade-in:nth-child(3) { animation-delay: 0.12s; }
        .fade-in:nth-child(4) { animation-delay: 0.16s; }
        .row-hover { transition: background 0.12s ease; cursor: pointer; }
        .row-hover:hover { background: ${c.cardHover} !important; }

        @media (max-width: 768px) {
          .nx-an-platform-tabs { flex-wrap: wrap !important; }
          .nx-an-platform-tabs button { padding: 7px 12px !important; font-size: 12px !important; }
          .nx-an-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .nx-an-stats .fade-in { padding: 16px !important; }
          .nx-an-stats .nx-an-stat-value { font-size: 24px !important; }
          .nx-an-channel { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          /* Top videos: compact row layout on mobile */
          .nx-an-top-row { padding: 14px 16px !important; }
          .nx-an-top-thumb { width: 90px !important; height: 52px !important; }
          .nx-an-top-rank { display: none !important; }
          .nx-an-top-meta { display: none !important; }
          .nx-an-top-title { font-size: 12px !important; }
          .nx-an-top-views-mobile { display: flex !important; }
          .nx-an-er { font-size: 11px !important; padding: 3px 8px !important; }
          /* Recent uploads compact */
          .nx-an-recent-row { padding: 12px 14px !important; }
          .nx-an-recent-meta { display: none !important; }
          /* Outliers */
          .nx-an-outlier-row { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; padding: 14px 16px !important; }
          .nx-an-outlier-views { margin-left: 0 !important; font-size: 18px !important; }
          .nx-an-outlier-title { white-space: normal !important; -webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
          /* Patterns */
          .nx-an-pattern { padding: 14px 16px !important; }
        }
        @media (min-width: 769px) {
          .nx-an-top-views-mobile { display: none !important; }
        }
      `}</style>

      {/* ── Platform Tabs ── */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
        <div className="nx-an-platform-tabs" style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {platforms.map((p) => (
            <button key={p.id} onClick={() => p.available && setSelectedPlatform(p.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 8,
                background: selectedPlatform === p.id && p.available ? c.chipActive : c.chip,
                color: selectedPlatform === p.id && p.available ? c.chipActiveText : c.textSec,
                border: 'none', cursor: p.available ? 'pointer' : 'default',
                fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                opacity: p.available ? 1 : 0.45, transition: 'all 0.15s ease',
              }}>
              {p.id === 'youtube' && '▶ '}{p.name}
              {!p.available && <span style={{ fontSize: 9, fontWeight: 700, background: dark ? '#333' : '#ddd', padding: '1px 6px', borderRadius: 3, marginLeft: 4, color: c.textDim }}>Soon</span>}
            </button>
          ))}
        </div>
        {source === 'live' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.green }}/>
            <span style={{ fontSize: 12, color: c.green, fontWeight: 500 }}>Live data from your YouTube channel</span>
          </div>
        )}
        {source === 'mock' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: c.orange || '#FF8C00', fontWeight: 500 }}>⚠ Sample data — connect your account in Settings</span>
          </div>
        )}
      </div>

      {!currentPlatform?.available && (
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: c.chip, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: c.textDim, fontSize: 24, fontWeight: 700 }}>{currentPlatform?.name?.[0]}</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 8 }}>{currentPlatform?.name} Analytics Coming Soon</h3>
          <p style={{ fontSize: 14, color: c.textSec }}>We're working on integrating {currentPlatform?.name}. Stay tuned!</p>
        </div>
      )}

      {error && (
        <div style={{ background: c.redBg, border: `1px solid ${c.redBorder}`, borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: c.red }}>Error loading analytics</p>
          <p style={{ fontSize: 13, color: c.textSec, marginTop: 4 }}>{error}</p>
        </div>
      )}

      {analyticsData && !loading && selectedPlatform === 'youtube' && (
        <>
          {/* Stats Grid */}
          <div className="nx-an-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { label: 'Subscribers', value: formatNumber(analyticsData.subscribers), icon: I.Users },
              { label: 'Total Views', value: formatNumber(analyticsData.total_views), icon: I.Eye },
              { label: 'Avg Engagement', value: `${analyticsData.insights?.avgEngagementRate || 0}%`, icon: I.Heart },
              { label: 'Total Videos', value: analyticsData.total_videos || 0, icon: I.Play },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="fade-in" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2.5, background: `linear-gradient(90deg, ${c.red}, transparent)`, opacity: 0.5 }}/>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: c.redBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.red, marginBottom: 14 }}><Icon /></div>
                  <div style={{ fontSize: 12, color: c.textDim, fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
                  <div className="nx-an-stat-value" style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.2, lineHeight: 1, color: c.text }}>{s.value}</div>
                </div>
              )
            })}
          </div>

          {/* Channel Info */}
          <div className="nx-an-channel" style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: '20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <ChannelAvatar src={analyticsData.channel_thumbnail || null} name={analyticsData.channel_name} size={52} />
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{analyticsData.channel_name}</h3>
              <span style={{ fontSize: 13, color: c.textSec }}>Avg {formatNumber(analyticsData.insights?.avgViews || 0)} views per video</span>
            </div>
          </div>

          {/* AI-Detected Patterns */}
          {analyticsData.insights?.patterns && analyticsData.insights.patterns.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ color: c.red }}><I.Sparkle /></div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: c.text }}>AI-Detected Patterns</h2>
                <span style={{ fontSize: 9, fontWeight: 700, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, color: '#fff', padding: '3px 8px', borderRadius: 5, letterSpacing: 0.5 }}>AI</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {analyticsData.insights.patterns.map((pattern, i) => {
                  const ps = getPatternStyle(i, c)
                  return (
                    <div key={i} className="nx-an-pattern" style={{ background: ps.bg, border: `1px solid ${ps.border}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: ps.color, borderRadius: '3px 0 0 3px' }}/>
                      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{ps.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: ps.color, display: 'block', marginBottom: 4 }}>{ps.label}</span>
                        <p style={{ fontSize: 13, color: c.text, lineHeight: 1.5, wordBreak: 'break-word' }}>{pattern}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Viral Outliers */}
          {analyticsData.insights?.outlierVideos && analyticsData.insights.outlierVideos.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 18 }}>🚀</span>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: c.text }}>Viral Outliers</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {analyticsData.insights.outlierVideos.map((video, i) => (
                  <div key={i} className="nx-an-outlier-row" style={{ background: c.greenBg, border: `1px solid ${c.greenBorder}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="nx-an-outlier-title" style={{ fontSize: 14, fontWeight: 600, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title}</p>
                      <p style={{ fontSize: 12, color: c.green, fontWeight: 500, marginTop: 4 }}>{video.multiplier}</p>
                    </div>
                    <span className="nx-an-outlier-views" style={{ fontSize: 22, fontWeight: 800, color: c.red, flexShrink: 0, marginLeft: 20, letterSpacing: -0.5 }}>{formatNumber(video.views)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Performing Videos */}
          {analyticsData.topVideos && analyticsData.topVideos.length > 0 && (
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ padding: '18px 22px', borderBottom: `1px solid ${c.borderLight}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text }}>Top Performing Videos</h3>
              </div>
              {analyticsData.topVideos.map((video, i) => (
                <div key={i} className="row-hover nx-an-top-row" style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 22px',
                  borderBottom: i < analyticsData.topVideos.length - 1 ? `1px solid ${c.borderLight}` : 'none',
                }}>
                  <span className="nx-an-top-rank" style={{ fontSize: 16, fontWeight: 800, color: i < 3 ? c.red : c.textDim, width: 28, textAlign: 'center', flexShrink: 0 }}>#{i + 1}</span>
                  <div className="nx-an-top-thumb" style={{ width: 80, height: 46, borderRadius: 7, flexShrink: 0, overflow: 'hidden' }}>
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: dark ? 'linear-gradient(135deg, #1e1e1e, #2a2a2a)' : 'linear-gradient(135deg, #eee, #ddd)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ opacity: 0.4, color: c.textDim }}><I.Play /></div>
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="nx-an-top-title" style={{ fontSize: 13, fontWeight: 500, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title}</p>
                    {/* Desktop meta */}
                    <div className="nx-an-top-meta" style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 11, color: c.textDim }}>
                      <span>👁 {formatNumber(video.views)}</span>
                      <span>♡ {formatNumber(video.likes)}</span>
                      <span>💬 {formatNumber(video.comments)}</span>
                      <span>⏰ {timeAgo(video.published_at)}</span>
                    </div>
                    {/* Mobile mini stats */}
                    <div className="nx-an-top-views-mobile" style={{ display: 'none', gap: 8, marginTop: 4, fontSize: 11, color: c.textDim }}>
                      <span>{formatNumber(video.views)} views</span>
                      <span>·</span>
                      <span>{timeAgo(video.published_at)}</span>
                    </div>
                  </div>
                  <span className="nx-an-er" style={{
                    fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 8,
                    background: parseFloat(video.engagement_rate) > 10 ? c.greenBg : c.redBg,
                    border: `1px solid ${parseFloat(video.engagement_rate) > 10 ? c.greenBorder : c.redBorder}`,
                    color: parseFloat(video.engagement_rate) > 10 ? c.green : c.red,
                    flexShrink: 0,
                  }}>{video.engagement_rate}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Recent Uploads */}
          {analyticsData.videos && analyticsData.videos.length > 0 && (
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.borderLight}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text }}>Recent Uploads</h3>
              </div>
              {analyticsData.videos.slice(0, 10).map((video, i) => (
                <div key={i} className="row-hover nx-an-recent-row" style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 22px',
                  borderBottom: i < Math.min(analyticsData.videos.length, 10) - 1 ? `1px solid ${c.borderLight}` : 'none',
                }}>
                  <div style={{ width: 72, height: 42, borderRadius: 7, flexShrink: 0, overflow: 'hidden' }}>
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: dark ? 'linear-gradient(135deg, #1e1e1e, #2a2a2a)' : 'linear-gradient(135deg, #eee, #ddd)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ opacity: 0.4, color: c.textDim }}><I.Play /></div>
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title}</p>
                    <p style={{ fontSize: 11, color: c.textDim, marginTop: 3 }}>{timeAgo(video.published_at)}</p>
                  </div>
                  <div className="nx-an-recent-meta" style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                    <span style={{ fontSize: 13, color: c.textSec }}>{formatNumber(video.views)} views</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 6,
                      background: parseFloat(video.engagement_rate) > 10 ? c.greenBg : 'transparent',
                      border: parseFloat(video.engagement_rate) > 10 ? `1px solid ${c.greenBorder}` : 'none',
                      color: parseFloat(video.engagement_rate) > 10 ? c.green : c.textDim,
                    }}>{video.engagement_rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}