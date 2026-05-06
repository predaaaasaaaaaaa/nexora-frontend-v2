'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/supabase'
import { getYouTubeStatus, connectYouTube, disconnectYouTube, getNotificationPreferences, updateNotificationPreferences } from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'
import Link from 'next/link'

// ── Theme colors ──
const themes = {
  dark: {
    card: '#1A1A1A', cardHover: '#222', text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    chip: '#2A2A2A',
    dangerBg: 'rgba(255,0,0,0.04)', dangerBorder: 'rgba(255,0,0,0.12)',
    toggleOn: '#3EA651', toggleOff: '#2A2A2A',
    successBg: 'rgba(62,166,81,0.1)', successBorder: 'rgba(62,166,81,0.2)',
  },
  light: {
    card: '#FFFFFF', cardHover: '#F5F5F5', text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    chip: '#F2F2F2',
    dangerBg: 'rgba(255,0,0,0.03)', dangerBorder: 'rgba(255,0,0,0.1)',
    toggleOn: '#2BA640', toggleOff: '#D4D4D4',
    successBg: 'rgba(43,166,64,0.08)', successBorder: 'rgba(43,166,64,0.15)',
  },
}

const I = {
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Link: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 7h3a5 5 0 010 10h-3m-6 0H6A5 5 0 016 7h3"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Mail: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  Calendar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  LogOut: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Unlink: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.84 12.25l1.72-1.71a5.004 5.004 0 00-7.07-7.07l-1.72 1.71"/><path d="M5.17 11.75l-1.71 1.71a5.004 5.004 0 007.07 7.07l1.71-1.71"/><line x1="8" y1="2" x2="8" y2="5"/><line x1="2" y1="8" x2="5" y2="8"/><line x1="16" y1="19" x2="16" y2="22"/><line x1="19" y1="16" x2="22" y2="16"/></svg>,
  Sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
}

const Toggle = ({ on, onToggle, c, accentColor }) => (
  <button onClick={onToggle} style={{ width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', background: on ? (accentColor || c.toggleOn) : c.toggleOff, position: 'relative', transition: 'background 0.25s ease', flexShrink: 0 }}>
    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 25 : 3, transition: 'left 0.25s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
  </button>
)

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')
  const [youtubeStatus, setYoutubeStatus] = useState(null)
  const [youtubeLoading, setYoutubeLoading] = useState(true)
  const [youtubeAction, setYoutubeAction] = useState(null)
  const [notifPrefs, setNotifPrefs] = useState(null)
  const [notifLoading, setNotifLoading] = useState(true)
  const { dark, toggle } = useTheme()
  const c = dark ? themes.dark : themes.light
  const searchParams = useSearchParams()

  useEffect(() => {
    loadUser(); loadYouTubeStatus(); loadNotifPrefs()
    const ytParam = searchParams.get('youtube')
    if (ytParam === 'connected') { setSuccess('YouTube connected successfully!'); setTimeout(() => setSuccess(''), 5000); loadYouTubeStatus() }
    else if (ytParam === 'error') { setYoutubeAction('error'); setTimeout(() => setYoutubeAction(null), 5000) }
  }, [])

  async function loadUser() { const { user } = await getCurrentUser(); setUser(user); setLoading(false) }
  async function loadYouTubeStatus() {
    try { setYoutubeLoading(true); const data = await getYouTubeStatus(); setYoutubeStatus(data) }
    catch { setYoutubeStatus({ connected: false }) } finally { setYoutubeLoading(false) }
  }
  async function loadNotifPrefs() {
    try { setNotifLoading(true); const data = await getNotificationPreferences(); setNotifPrefs(data.preferences) }
    catch {} finally { setNotifLoading(false) }
  }
  async function handleConnectYouTube() {
    try { setYoutubeAction('connecting'); const data = await connectYouTube(); if (data.authUrl) window.location.href = data.authUrl }
    catch { setYoutubeAction('error'); setTimeout(() => setYoutubeAction(null), 3000) }
  }
  async function handleDisconnectYouTube() {
    if (!confirm('Disconnect your YouTube account?')) return
    try { setYoutubeAction('disconnecting'); await disconnectYouTube(); setYoutubeStatus({ connected: false }); setSuccess('YouTube disconnected.'); setYoutubeAction(null); setTimeout(() => setSuccess(''), 3000) }
    catch { setYoutubeAction('error'); setTimeout(() => setYoutubeAction(null), 3000) }
  }
  async function toggleNotifications() {
    if (!notifPrefs) return
    try { const updated = await updateNotificationPreferences({ ...notifPrefs, enabled: !notifPrefs.enabled }); setNotifPrefs(updated.preferences); setSuccess(updated.preferences.enabled ? 'Notifications enabled' : 'Notifications paused'); setTimeout(() => setSuccess(''), 3000) } catch {}
  }
  async function handleSignOut() {
    if (!confirm('Sign out?')) return
    // Use the helper so the backend revokes the JWT before we clear local state.
    await signOut()
    window.location.href = '/login'
  }

  const sectionStyle = { background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }
  const sectionHeader = (icon, title) => (
    <div className="nx-set-section-header" style={{ padding: '18px 24px', borderBottom: `1px solid ${c.borderLight}`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ color: c.red }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text }}>{title}</h3>
    </div>
  )
  const rowStyle = (last = false) => ({ padding: '16px 24px', borderBottom: last ? 'none' : `1px solid ${c.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' })

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <div style={{ width: 48, height: 48, border: `3px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .disconnect-btn { transition: all 0.15s ease; }
        .disconnect-btn:hover { background: ${c.redBg} !important; color: ${c.red} !important; border-color: ${c.redBorder} !important; }
        .danger-btn { transition: all 0.15s ease; }
        .danger-btn:hover { background: ${c.redBg} !important; border-color: ${c.redBorder} !important; color: ${c.red} !important; }

        @media (max-width: 768px) {
          .nx-set-row { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; padding: 14px 16px !important; }
          .nx-set-row-inline { padding: 14px 16px !important; }
          .nx-set-section-header { padding: 14px 16px !important; }
          .nx-set-yt-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding: 14px 16px !important; }
          .nx-set-yt-row button { align-self: flex-start; }
          .nx-set-platform-row { padding: 14px 16px !important; }
          .nx-set-notif-hint { padding: 0 16px 14px !important; }
          .nx-set-notif-desc { padding: 0 16px 10px !important; }
          .nx-set-notif-empty { padding: 14px 16px 18px !important; }
          .nx-set-email-val { font-size: 12px !important; word-break: break-all; }
        }
      `}</style>

      {/* ── Two-column layout on desktop ── */}
      <div className="nx-set-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <style>{`
          @media (max-width: 768px) {
            .nx-set-grid { grid-template-columns: 1fr !important; }
            .nx-set-col-left { order: 1; }
            .nx-set-col-right { order: 2; }
            .nx-set-danger { order: 3; }
          }
        `}</style>

        {/* ── LEFT COLUMN ── */}
        <div className="nx-set-col-left">
          {/* Success Banner */}
          {success && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', marginBottom: 20, borderRadius: 12, background: c.successBg, border: `1px solid ${c.successBorder}` }}>
              <I.Check /><span style={{ fontSize: 14, fontWeight: 500, color: c.green }}>{success}</span>
            </div>
          )}
          {youtubeAction === 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', marginBottom: 20, borderRadius: 12, background: c.redBg, border: `1px solid ${c.redBorder}` }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: c.red }}>Something went wrong. Please try again.</span>
            </div>
          )}

          {/* Account */}
          <div style={sectionStyle}>
            {sectionHeader(<I.User />, 'Account')}
            <div className="nx-set-row" style={rowStyle()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ color: c.textDim }}><I.Mail /></div><span style={{ fontSize: 14, color: c.textSec }}>Email</span></div>
              <span className="nx-set-email-val" style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{user?.email}</span>
            </div>
            <div className="nx-set-row" style={rowStyle()}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ color: c.textDim }}><I.Calendar /></div><span style={{ fontSize: 14, color: c.textSec }}>Member since</span></div>
              <span style={{ fontSize: 14, fontWeight: 500, color: c.text }}>{new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="nx-set-row" style={rowStyle(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ color: c.textDim }}><I.Shield /></div><span style={{ fontSize: 14, color: c.textSec }}>Plan</span></div>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 8, background: c.greenBg, border: `1px solid ${c.greenBorder}`, color: c.green }}>Free Beta</span>
            </div>
          </div>

          {/* Appearance */}
          <div style={sectionStyle}>
            {sectionHeader(dark ? <I.Moon /> : <I.Sun />, 'Appearance')}
            <div className="nx-set-row-inline" style={rowStyle(true)}>
              <div><div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 2 }}>Dark Mode</div><div style={{ fontSize: 12, color: c.textDim }}>Switch between light and dark themes</div></div>
              <Toggle on={dark} onToggle={toggle} c={c} accentColor={c.red} />
            </div>
          </div>

          {/* Danger Zone — moved outside columns for mobile ordering */}
          </div>

          {/* ── DANGER ZONE (own grid item for mobile reorder) ── */}
          <div className="nx-set-danger" style={{ gridColumn: '1 / -1' }}>
            <div style={{ background: c.dangerBg, border: `1px solid ${c.dangerBorder}`, borderRadius: 14, overflow: 'hidden' }}>
              <div className="nx-set-section-header" style={{ padding: '18px 24px', borderBottom: `1px solid ${c.dangerBorder}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ color: c.red }}><I.Shield /></div><h3 style={{ fontSize: 16, fontWeight: 700, color: c.red }}>Danger Zone</h3>
              </div>
              <div className="nx-set-row" style={{ ...rowStyle(true), borderBottomColor: c.dangerBorder }}>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Sign Out</div><div style={{ fontSize: 12, color: c.textDim }}>Sign out of your NEXORA account</div></div>
                <button className="danger-btn" onClick={handleSignOut} style={{ padding: '8px 20px', borderRadius: 8, background: 'transparent', border: `1px solid ${c.border}`, color: c.textSec, cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}><I.LogOut /> Sign Out</button>
              </div>
            </div>
          </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="nx-set-col-right">
          {/* Connected Platforms */}
          <div style={sectionStyle}>
            {sectionHeader(<I.Link />, 'Connected Platforms')}
            <div style={{ padding: '4px 0' }}>
              <p className="nx-set-notif-desc" style={{ padding: '0 24px 12px', fontSize: 13, color: c.textDim }}>Connect your accounts to unlock analytics and AI coaching</p>
              <div className="nx-set-yt-row" style={{ ...rowStyle(), opacity: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: youtubeStatus?.connected ? c.redBg : c.chip, border: youtubeStatus?.connected ? `1px solid ${c.redBorder}` : `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: youtubeStatus?.connected ? c.red : c.textDim, fontSize: 16, flexShrink: 0 }}>▶</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>YouTube</div>
                    {youtubeLoading ? <div style={{ fontSize: 12, color: c.textDim }}>Checking...</div> : youtubeStatus?.connected ? (
                      <div style={{ fontSize: 12, fontWeight: 500, marginTop: 2, color: c.green, display: 'flex', alignItems: 'center', gap: 4 }}><I.Check /> Connected as {youtubeStatus.details?.platform_username}</div>
                    ) : <div style={{ fontSize: 12, color: c.textDim }}>Not connected</div>}
                  </div>
                </div>
                {youtubeLoading ? <div style={{ width: 20, height: 20, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> : youtubeStatus?.connected ? (
                  <button className="disconnect-btn" onClick={handleDisconnectYouTube} disabled={youtubeAction === 'disconnecting'} style={{ padding: '7px 16px', borderRadius: 8, background: 'transparent', border: `1px solid ${c.border}`, color: c.textSec, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, opacity: youtubeAction === 'disconnecting' ? 0.5 : 1 }}>
                    {youtubeAction === 'disconnecting' ? <div style={{ width: 14, height: 14, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> : <I.Unlink />}Disconnect
                  </button>
                ) : (
                  <button onClick={handleConnectYouTube} disabled={youtubeAction === 'connecting'} style={{ padding: '8px 18px', borderRadius: 8, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, opacity: youtubeAction === 'connecting' ? 0.5 : 1 }}>
                    {youtubeAction === 'connecting' ? <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> : <I.Link />}Connect
                  </button>
                )}
              </div>
              {[{ name: 'Instagram', icon: '◎' }, { name: 'TikTok', icon: '♪' }, { name: 'Threads', icon: '@' }].map((p, i) => (
                <div key={p.name} className="nx-set-platform-row" style={{ ...rowStyle(i === 2), opacity: 0.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: c.chip, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textDim, fontSize: 16, flexShrink: 0 }}>{p.icon}</div>
                    <div><div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{p.name}</div><div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>Coming soon</div></div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 5, background: c.chip, color: c.textDim, letterSpacing: 0.8 }}>SOON</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div style={sectionStyle}>
            {sectionHeader(<I.Bell />, 'Notifications')}
            <div style={{ padding: '4px 0' }}>
              <p className="nx-set-notif-desc" style={{ padding: '0 24px 12px', fontSize: 13, color: c.textDim }}>Manage your email reminders for scheduled content</p>
              {notifLoading ? (
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 8, color: c.textDim }}>
                  <div style={{ width: 16, height: 16, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/><span style={{ fontSize: 13 }}>Loading preferences...</span>
                </div>
              ) : notifPrefs ? (
                <>
                  <div className="nx-set-row-inline" style={rowStyle()}>
                    <div><div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 2 }}>Email reminders</div><div style={{ fontSize: 12, color: c.textDim }}>{notifPrefs.notification_email}</div></div>
                    <Toggle on={notifPrefs.enabled} onToggle={toggleNotifications} c={c} />
                  </div>
                  <div className="nx-set-row-inline" style={rowStyle(true)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ color: c.textDim }}><I.Clock /></div>
                      <span style={{ fontSize: 13, color: c.textSec }}>Reminders set to {notifPrefs.reminder_minutes >= 1440 ? `${Math.round(notifPrefs.reminder_minutes / 1440)} day${Math.round(notifPrefs.reminder_minutes / 1440) > 1 ? 's' : ''}` : notifPrefs.reminder_minutes >= 60 ? `${Math.round(notifPrefs.reminder_minutes / 60)} hour${Math.round(notifPrefs.reminder_minutes / 60) > 1 ? 's' : ''}` : `${notifPrefs.reminder_minutes} minutes`} before scheduled content</span>
                    </div>
                  </div>
                  <div className="nx-set-notif-hint" style={{ padding: '0 24px 16px' }}>
                    <p style={{ fontSize: 12, color: c.textDim }}>To change reminder timing or email, go to <Link href="/scheduler" style={{ color: c.red, fontWeight: 500, textDecoration: 'none' }}>Scheduler</Link> and click the bell icon.</p>
                  </div>
                </>
              ) : (
                <div className="nx-set-notif-empty" style={{ padding: '16px 24px 20px' }}>
                  <p style={{ fontSize: 13, color: c.textSec, marginBottom: 12 }}>No notification preferences set yet.</p>
                  <Link href="/scheduler" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: 'transparent', border: `1px solid ${c.redBorder}`, color: c.red, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}><I.Bell /> Set up reminders</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}