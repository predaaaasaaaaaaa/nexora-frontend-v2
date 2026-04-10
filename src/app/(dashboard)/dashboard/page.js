'use client'

import { useEffect, useState } from 'react'
import { getYouTubeAnalytics, getYouTubeStatus } from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'
import ChannelAvatar from '@/components/shared/ChannelAvatar'
import Link from 'next/link'

// ── Theme colors ──
const themes = {
  dark: {
    bg: '#0F0F0F', card: '#1A1A1A', cardHover: '#222',
    text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)',
    redGlow: 'rgba(255,0,0,0.12)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    chip: '#2A2A2A',
    bannerGrad: 'linear-gradient(135deg, #1a0000 0%, #0F0F0F 100%)',
  },
  light: {
    bg: '#FFFFFF', card: '#FFFFFF', cardHover: '#F5F5F5',
    text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)',
    redGlow: 'rgba(255,0,0,0.06)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    chip: '#F2F2F2',
    bannerGrad: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%)',
  },
}

// ── Inline SVG Icons ──
const I = {
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Play: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Heart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Sparkle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  Up: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
}

export default function DashboardPage() {
  const [ytData, setYtData] = useState(null)
  const [ytConnected, setYtConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const { dark } = useTheme()
  const c = dark ? themes.dark : themes.light

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

  // ── Loading state ──
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, border: `3px solid ${c.border}`,
            borderTopColor: c.red, borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
          }}/>
          <p style={{ color: c.textDim, fontSize: 14 }}>Loading your dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  // ── YouTube not connected state ──
  if (!ytConnected || !ytData) {
    return (
      <div style={{
        background: c.card, border: `1px solid ${c.border}`,
        borderRadius: 14, padding: '60px 20px', textAlign: 'center',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: c.redBg, margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: c.red, fontSize: 28,
        }}>▶</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 8 }}>
          Connect Your YouTube Channel
        </h3>
        <p style={{ fontSize: 14, color: c.textSec, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
          Link your YouTube account to see real analytics and get personalized AI coaching.
        </p>
        <Link href="/settings" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 24px', borderRadius: 10,
          background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`,
          color: '#fff', fontSize: 14, fontWeight: 600,
          textDecoration: 'none',
        }}>
          Go to Settings <I.Arrow />
        </Link>
      </div>
    )
  }

  // ── Stats data ──
  const stats = [
    { label: 'Subscribers', value: formatNumber(ytData.subscribers), icon: I.Users },
    { label: 'Total Views', value: formatNumber(ytData.total_views), icon: I.Eye },
    { label: 'Videos', value: ytData.total_videos, icon: I.Play },
    { label: 'Engagement', value: `${ytData.insights?.avgEngagementRate || 0}%`, icon: I.Heart },
  ]

  return (
    <div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-card { animation: fadeUp 0.45s ease forwards; opacity: 0; }
        .fade-card:nth-child(1) { animation-delay: 0.04s; }
        .fade-card:nth-child(2) { animation-delay: 0.08s; }
        .fade-card:nth-child(3) { animation-delay: 0.12s; }
        .fade-card:nth-child(4) { animation-delay: 0.16s; }
        .upload-row { transition: background 0.12s ease; cursor: pointer; }
        .upload-row:hover { background: ${c.cardHover} !important; }

        @media (max-width: 768px) {
          .nx-dash-banner { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; padding: 16px !important; }
          .nx-dash-banner-link { align-self: stretch; text-align: center; justify-content: center; }
          .nx-dash-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .nx-dash-stats .fade-card { padding: 16px !important; }
          .nx-dash-stats .nx-stat-value { font-size: 24px !important; }
          .nx-dash-two-col { grid-template-columns: 1fr !important; }
          .nx-dash-platforms { grid-template-columns: repeat(2, 1fr) !important; }
          .nx-upload-meta { display: none !important; }
          .nx-upload-row { padding: 12px 14px !important; }
          /* Best video: compact horizontal layout on mobile */
          .nx-dash-best-video-desktop { display: none !important; }
          .nx-dash-best-video-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nx-dash-best-video-mobile { display: none !important; }
        }
      `}</style>

      {/* ── Channel Banner ── */}
      <div className="nx-dash-banner" style={{
        background: c.bannerGrad,
        border: `1px solid ${c.redBorder}`,
        borderRadius: 14, padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 24, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${c.redGlow}, transparent 70%)`,
          pointerEvents: 'none',
        }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
          <ChannelAvatar
            src={ytData.channel_thumbnail || null}
            name={ytData.channel_name}
            size={48}
          />
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, letterSpacing: -0.3 }}>
              {ytData.channel_name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.green }}/>
              <span style={{ fontSize: 12, color: c.green, fontWeight: 500 }}>YouTube connected</span>
            </div>
          </div>
        </div>
        <Link href="/analytics" className="nx-dash-banner-link" style={{
          padding: '9px 18px', borderRadius: 8,
          background: 'transparent', border: `1px solid ${c.border}`,
          color: c.text, fontSize: 13, fontWeight: 500,
          textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6,
          position: 'relative',
        }}>
          View full analytics <I.Arrow />
        </Link>
      </div>

      {/* ── Stats Grid ── */}
      <div className="nx-dash-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="fade-card" style={{
              background: c.card, border: `1px solid ${c.border}`,
              borderRadius: 14, padding: '20px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2.5,
                background: `linear-gradient(90deg, ${c.red}, transparent)`, opacity: 0.5,
              }}/>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: c.redBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.red, marginBottom: 14,
              }}>
                <Icon />
              </div>
              <div className="nx-stat-value" style={{ fontSize: 30, fontWeight: 800, color: c.text, letterSpacing: -1.2, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: c.textDim, marginTop: 6, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Two Column: Video + Insights ── */}
      <div className="nx-dash-two-col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 20 }}>
        {/* Best Performing Video */}
        <div style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, padding: '22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>🏆</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: c.text }}>Best Performing Video</h3>
          </div>
          {ytData.topVideos?.[0] && (
            <>
              {/* Desktop: full thumbnail */}
              <div className="nx-dash-best-video-desktop">
                <div style={{
                  width: '100%', aspectRatio: '16/9',
                  borderRadius: 10, overflow: 'hidden', marginBottom: 14,
                  position: 'relative', cursor: 'pointer',
                }}>
                  {ytData.topVideos[0].thumbnail ? (
                    <img
                      src={ytData.topVideos[0].thumbnail}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: dark ? 'linear-gradient(135deg, #1a1a1a, #252525)' : 'linear-gradient(135deg, #f0f0f0, #e8e8e8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: 'rgba(0,0,0,0.75)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{ color: '#fff', marginLeft: 3 }}><I.Play /></div>
                      </div>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: c.text, lineHeight: 1.4, marginBottom: 8 }}>
                  {ytData.topVideos[0].title}
                </p>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: c.textSec, flexWrap: 'wrap' }}>
                  <span>{formatNumber(ytData.topVideos[0].views)} views</span>
                  <span>{formatNumber(ytData.topVideos[0].likes)} likes</span>
                  <span style={{ color: c.green, fontWeight: 600 }}>{ytData.topVideos[0].engagement_rate}% ER</span>
                </div>
              </div>

              {/* Mobile: compact horizontal card */}
              <div className="nx-dash-best-video-mobile" style={{ display: 'none', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 120, height: 68, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                }}>
                  {ytData.topVideos[0].thumbnail ? (
                    <img src={ytData.topVideos[0].thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: dark ? '#1a1a1a' : '#f0f0f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ opacity: 0.4, color: c.textDim }}><I.Play /></div>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: c.text, lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {ytData.topVideos[0].title}
                  </p>
                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: c.textSec, flexWrap: 'wrap' }}>
                    <span>{formatNumber(ytData.topVideos[0].views)} views</span>
                    <span>{formatNumber(ytData.topVideos[0].likes)} likes</span>
                    <span style={{ color: c.green, fontWeight: 600 }}>{ytData.topVideos[0].engagement_rate}% ER</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Insights */}
        <div style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, padding: '22px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ color: c.red }}><I.Sparkle /></div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: c.text }}>Quick Insights</h3>
            <span style={{
              marginLeft: 'auto', fontSize: 9, fontWeight: 700,
              background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`,
              color: '#fff', padding: '3px 8px', borderRadius: 5, letterSpacing: 0.5,
            }}>AI</span>
          </div>

          <div style={{ flex: 1 }}>
            {[
              { label: 'Avg views/video', val: formatNumber(ytData.insights?.avgViews || 0) },
              { label: 'Recent likes', val: formatNumber(ytData.insights?.totalRecentLikes || 0) },
              { label: 'Recent comments', val: formatNumber(ytData.insights?.totalRecentComments || 0) },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '15px 0',
                borderBottom: i < 2 ? `1px solid ${c.borderLight}` : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 13, color: c.textSec }}>{item.label}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: c.text, letterSpacing: -0.5 }}>{item.val}</span>
              </div>
            ))}
          </div>

          {ytData.insights?.outlierVideos?.length > 0 && (
            <div style={{
              marginTop: 14, padding: '12px 16px', borderRadius: 10,
              background: c.greenBg, border: `1px solid ${c.greenBorder}`,
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 500, color: c.green,
            }}>
              🔥 {ytData.insights.outlierVideos.length} viral outlier{ytData.insights.outlierVideos.length > 1 ? 's' : ''} detected
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Uploads ── */}
      {ytData.videos && ytData.videos.length > 0 && (
        <div style={{
          background: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{
            padding: '18px 22px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', borderBottom: `1px solid ${c.borderLight}`,
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: c.text }}>Recent Uploads</h3>
            <Link href="/analytics" style={{
              background: 'transparent', border: 'none', color: c.red,
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              See all <I.Arrow />
            </Link>
          </div>
          {ytData.videos.slice(0, 5).map((video, i) => (
            <div key={i} className="upload-row nx-upload-row" style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 22px',
              borderBottom: i < Math.min(ytData.videos.length, 5) - 1 ? `1px solid ${c.borderLight}` : 'none',
            }}>
              <div style={{
                width: 72, height: 42, borderRadius: 7, flexShrink: 0, overflow: 'hidden',
              }}>
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: dark ? 'linear-gradient(135deg, #1e1e1e, #2a2a2a)' : 'linear-gradient(135deg, #eee, #ddd)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ opacity: 0.4, color: c.textDim }}><I.Play /></div>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 13, fontWeight: 500, color: c.text,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{video.title}</p>
              </div>
              <div className="nx-upload-meta" style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
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

      {/* ── Platform Status ── */}
      <div className="nx-dash-platforms" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { name: 'YouTube', status: 'Connected', ok: true, icon: '▶' },
          { name: 'Instagram', status: 'Coming soon', ok: false, icon: '◎' },
          { name: 'TikTok', status: 'Coming soon', ok: false, icon: '♪' },
          { name: 'Threads', status: 'Coming soon', ok: false, icon: '@' },
        ].map((p, i) => (
          <div key={i} style={{
            background: c.card,
            border: `1px solid ${p.ok ? c.greenBorder : c.border}`,
            borderRadius: 10, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: p.ok ? 1 : 0.45,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: p.ok ? c.redBg : c.chip,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: p.ok ? c.red : c.textDim, fontSize: 15,
            }}>{p.icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{p.name}</div>
              <div style={{ fontSize: 10, fontWeight: 500, color: p.ok ? c.green : c.textDim }}>{p.status}</div>
            </div>
            {!p.ok && (
              <span style={{
                marginLeft: 'auto', fontSize: 9, fontWeight: 600,
                color: c.textDim, background: c.chip,
                padding: '2px 8px', borderRadius: 4, letterSpacing: 0.5,
              }}>SOON</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}