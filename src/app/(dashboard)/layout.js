'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Sun, Moon, LogOut, Menu, X } from 'lucide-react'
import { getCurrentUser, signOut, supabase, isUserSignOutInProgress, clearUserLocalStorage } from '@/lib/supabase'
import { useTheme } from '@/components/shared/ThemeProvider'
import NexoraLogo from '@/components/shared/NexoraLogo'
import ChannelAvatar from '@/components/shared/ChannelAvatar'
import FeedbackPopup from '@/components/shared/FeedbackPopup'
import PlanBadge from '@/components/shared/PlanBadge'
import DashboardDataProvider, { useUserPlan, useYouTubeStatus } from '@/components/shared/DashboardDataProvider'
import ConfirmProvider from '@/components/shared/ConfirmDialog'

// ── Theme color system ──
const themes = {
  dark: {
    bg: '#0F0F0F', card: '#1A1A1A', cardHover: '#222', sidebar: '#0F0F0F',
    text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    chip: '#2A2A2A', glass: 'rgba(15,15,15,0.9)',
    warnBg: 'rgba(255,140,0,0.08)', warnBorder: 'rgba(255,140,0,0.2)', warnText: '#FF8C00',
  },
  light: {
    bg: '#FFFFFF', card: '#FFFFFF', cardHover: '#F5F5F5', sidebar: '#FFFFFF',
    text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    chip: '#F2F2F2', glass: 'rgba(255,255,255,0.92)',
    warnBg: 'rgba(255,140,0,0.06)', warnBorder: 'rgba(255,140,0,0.2)', warnText: '#E67E00',
  },
}

const Icons = {
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  Bar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Bolt: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Cal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Bulb: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>,
  Gear: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Upgrade: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
}

const pageTitles = {
  '/dashboard': { title: 'Dashboard', sub: 'Your channel overview at a glance' },
  '/analytics': { title: 'Analytics Dashboard', sub: 'Real-time insights from your connected platforms' },
  '/coach': { title: 'AI Coach', sub: 'Your personal YouTube growth strategist' },
  '/scheduler': { title: 'Content Scheduler', sub: 'Plan your content and never miss a post' },
  '/ideas': { title: 'Content Ideas Generator', sub: 'AI-generated viral content ideas' },
  '/settings': { title: 'Settings', sub: 'Manage your account and preferences' },
}

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { dark } = useTheme()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const c = dark ? themes.dark : themes.light

  useEffect(() => { checkAuth() }, [])

  // Cross-tab sign-out / natural session expiry: kick the user back to
  // /login the moment Supabase emits SIGNED_OUT, instead of waiting for
  // the next API call to 401. We skip the redirect when the sign-out is
  // user-initiated (the Sign Out button has its own router.push('/')).
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        // Cross-tab sign-out path: this tab's signOut() helper never
        // ran, so wipe per-user localStorage here too. Idempotent with
        // the helper's call when sign-out originated locally.
        clearUserLocalStorage()
        if (!isUserSignOutInProgress() && typeof window !== 'undefined') {
          window.location.replace('/login?reason=session_expired')
        }
      }
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const section = pathname.split('/').pop()
    if (section) {
      const visited = JSON.parse(localStorage.getItem('visitedSections') || '[]')
      if (!visited.includes(section)) {
        visited.push(section)
        localStorage.setItem('visitedSections', JSON.stringify(visited))
      }
    }
  }, [pathname])

  async function checkAuth() {
    const { user, error } = await getCurrentUser()
    if (!user || error) { router.push('/login'); return }
    setUser(user)
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background-color 0.35s ease',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}>
            <NexoraLogo size={48} color={c.red} />
          </div>
          <p style={{ color: c.textDim, marginTop: 16, fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Provider only fetches once `enabled` flips true (after auth), so
  // unauthenticated users never trigger a 401 storm before redirect.
  // ConfirmProvider lives here so any dashboard page can call
  // useConfirm() for destructive actions (replaces native confirm()).
  return (
    <DashboardDataProvider enabled={!!user}>
      <ConfirmProvider>
        <DashboardChrome user={user} router={router} pathname={pathname}>
          {children}
        </DashboardChrome>
      </ConfirmProvider>
    </DashboardDataProvider>
  )
}

function DashboardChrome({ user, router, pathname, children }) {
  const { dark, toggle } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hoverNav, setHoverNav] = useState(null)
  const { plan, planLoaded } = useUserPlan()
  const { ytStatus } = useYouTubeStatus()
  // Only treat the user as "free" once we've actually loaded a plan.
  // Without this gate, a Pro user briefly sees the Upgrade CTA on cold
  // load (and on any transient API blip after) because the default
  // would be "free" — exactly the FM2 finding.
  const userPlan = plan?.subscription?.plan || (planLoaded ? 'free' : null)
  const ytConnected = ytStatus?.connected === true

  const c = dark ? themes.dark : themes.light

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  const navigation = [
    { href: '/dashboard', label: 'Dashboard', icon: Icons.Grid },
    { href: '/analytics', label: 'Analytics', icon: Icons.Bar },
    { href: '/coach', label: 'AI Coach', icon: Icons.Bolt, badge: 'AI' },
    { href: '/scheduler', label: 'Scheduler', icon: Icons.Cal },
    { href: '/ideas', label: 'Content Ideas', icon: Icons.Bulb },
    { href: '/settings', label: 'Settings', icon: Icons.Gear },
  ]

  const pageInfo = pageTitles[pathname] || { title: 'NEXORA', sub: '' }
  const showUpgrade = userPlan === 'free'

  return (
    <div style={{
      fontFamily: "'Outfit', 'Geist', -apple-system, sans-serif",
      background: c.bg, color: c.text, minHeight: '100vh', display: 'flex',
      transition: 'background-color 0.35s ease, color 0.25s ease',
    }}>
      <style>{`
        @keyframes pulseGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideSidebar { from { transform: translateX(-100%); } to { transform: translateX(0); } }

        @media (max-width: 768px) {
          .nx-sidebar {
            transform: translateX(-100%);
            transition: transform 0.25s ease;
          }
          .nx-sidebar.open {
            transform: translateX(0);
          }
          .nx-overlay {
            display: block !important;
          }
          .nx-hamburger {
            display: flex !important;
          }
          .nx-main {
            margin-left: 0 !important;
          }
          .nx-header {
            padding: 14px 16px !important;
          }
          .nx-header-title {
            font-size: 18px !important;
          }
          .nx-header-sub {
            font-size: 11px !important;
          }
          .nx-content {
            padding: 16px 16px 32px !important;
          }
          .nx-yt-status-text {
            display: none;
          }
          .nx-yt-status {
            padding: 7px 10px !important;
          }
        }
      `}</style>

      {/* ══ MOBILE OVERLAY ══ */}
      {sidebarOpen && (
        <div
          className="nx-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 45, display: 'none',
          }}
        />
      )}

      {/* ══ SIDEBAR ══ */}
      <aside className={`nx-sidebar${sidebarOpen ? ' open' : ''}`} style={{
        width: 232, background: c.sidebar,
        borderRight: `1px solid ${c.border}`,
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
        display: 'flex', flexDirection: 'column',
        transition: 'background-color 0.35s ease, border-color 0.35s ease, transform 0.25s ease',
      }}>
        <div style={{
          padding: '22px 20px 18px',
          display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: `1px solid ${c.borderLight}`,
        }}>
          <div style={{ position: 'relative' }}>
            <NexoraLogo size={36} color={c.red} />
            <div style={{
              position: 'absolute', inset: -3, borderRadius: 12,
              border: `1.5px solid ${c.redBorder}`,
              animation: 'pulseGlow 4s ease-in-out infinite',
              pointerEvents: 'none',
            }}/>
          </div>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.3, color: c.text }}>NEXORA</span>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 0.8,
            background: c.red, color: '#fff',
            padding: '2px 7px', borderRadius: 4, marginLeft: -2,
          }}>BETA</span>

          {/* Close button — mobile only */}
          <button
            className="nx-hamburger"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'none', alignItems: 'center', justifyContent: 'center',
              marginLeft: 'auto', width: 32, height: 32, borderRadius: 8,
              border: `1px solid ${c.border}`, background: 'transparent',
              color: c.textSec, cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navigation.map((item) => {
            const active = pathname === item.href
            const hovering = hoverNav === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}
                onMouseEnter={() => setHoverNav(item.href)}
                onMouseLeave={() => setHoverNav(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 11,
                  padding: '10px 14px', borderRadius: 10,
                  background: active ? c.redBg : hovering ? c.cardHover : 'transparent',
                  color: active ? c.red : c.textSec,
                  fontSize: 14, fontWeight: active ? 600 : 400,
                  textDecoration: 'none', transition: 'all 0.15s ease', position: 'relative',
                }}>
                {active && (
                  <div style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 22, borderRadius: 2, background: c.red,
                    animation: 'slideRight 0.2s ease',
                  }}/>
                )}
                <Icon />
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft: 'auto', fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                    background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`,
                    color: '#fff', padding: '2px 7px', borderRadius: 4,
                  }}>{item.badge}</span>
                )}
              </Link>
            )
          })}

          {/* ── Upgrade CTA (only for free users) ── */}
          {showUpgrade && (
            <Link href="/pricing"
              onMouseEnter={() => setHoverNav('upgrade')}
              onMouseLeave={() => setHoverNav(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 11,
                padding: '10px 14px', borderRadius: 10, marginTop: 8,
                background: hoverNav === 'upgrade'
                  ? `linear-gradient(135deg, ${c.red}, ${c.redDark})`
                  : c.redBg,
                color: hoverNav === 'upgrade' ? '#fff' : c.red,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.2s ease',
                border: `1px solid ${c.redBorder}`,
              }}>
              <Icons.Upgrade />
              Upgrade Plan
            </Link>
          )}
        </nav>

        <div style={{
          padding: '14px 16px', borderTop: `1px solid ${c.borderLight}`,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <button onClick={toggle} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '9px', borderRadius: 8, background: c.chip,
            border: 'none', cursor: 'pointer', color: c.textSec,
            fontSize: 13, fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s ease',
          }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ChannelAvatar src={null} name={user?.email || 'U'} size={34} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: c.text,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{user?.email}</div>
              <PlanBadge />
            </div>
          </div>

          <button onClick={handleSignOut} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 8, background: 'transparent',
            border: `1px solid ${c.border}`, cursor: 'pointer',
            color: c.textSec, fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
            transition: 'all 0.15s ease',
          }}>
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ══ */}
      <main className="nx-main" style={{ marginLeft: 232, flex: 1, minHeight: '100vh' }}>
        <header className="nx-header" style={{
          padding: '18px 32px', borderBottom: `1px solid ${c.borderLight}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: c.glass, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          position: 'sticky', top: 0, zIndex: 40, transition: 'all 0.35s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Hamburger — mobile only */}
            <button
              className="nx-hamburger"
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 8,
                border: `1px solid ${c.border}`, background: c.card,
                color: c.text, cursor: 'pointer',
              }}
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="nx-header-title" style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, color: c.text }}>{pageInfo.title}</h1>
              <p className="nx-header-sub" style={{ fontSize: 13, color: c.textDim, marginTop: 2, fontWeight: 400 }}>{pageInfo.sub}</p>
            </div>
          </div>
          {ytConnected ? (
            <div className="nx-yt-status" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 20,
              background: c.greenBg, border: `1px solid ${c.greenBorder}`,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.green, boxShadow: `0 0 6px ${c.green}`, flexShrink: 0 }}/>
              <span className="nx-yt-status-text" style={{ fontSize: 12, fontWeight: 500, color: c.green }}>Live data connected</span>
            </div>
          ) : (
            <Link href="/settings" className="nx-yt-status" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 20,
              background: c.warnBg, border: `1px solid ${c.warnBorder}`, textDecoration: 'none',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.warnText, flexShrink: 0 }}/>
              <span className="nx-yt-status-text" style={{ fontSize: 12, fontWeight: 500, color: c.warnText }}>Connect YouTube</span>
            </Link>
          )}
        </header>
        <div className="nx-content" style={{ padding: '24px 32px 40px' }}>{children}</div>
      </main>

      <FeedbackPopup />
    </div>
  )
}