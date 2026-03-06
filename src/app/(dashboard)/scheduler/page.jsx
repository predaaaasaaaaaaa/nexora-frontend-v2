'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getSchedulerRecommendations,
  getReactiveRecommendations,
  getScheduledPosts,
  createScheduledPost,
  updateScheduledPost,
  deleteScheduledPost,
  getNotificationPreferences,
  updateNotificationPreferences,
} from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'

// ── Theme colors ──
const themes = {
  dark: {
    bg: '#0F0F0F', card: '#1A1A1A', cardHover: '#222',
    text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)', redGlow: 'rgba(255,0,0,0.12)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    orange: '#FF8C00', orangeBg: 'rgba(255,140,0,0.1)',
    chip: '#2A2A2A',
    today: '#FF0000', todayText: '#fff',
    cellHover: '#1E1E1E',
    eventBg: 'rgba(255,0,0,0.12)', eventBorder: 'rgba(255,0,0,0.25)',
    tipGrad: 'linear-gradient(135deg, #1a0000, #200000)',
    modalBg: '#1A1A1A', modalOverlay: 'rgba(0,0,0,0.7)',
    inputBg: '#222', inputBorder: '#333',
    toggleOn: '#3EA651', toggleOff: '#333',
  },
  light: {
    bg: '#FFFFFF', card: '#FFFFFF', cardHover: '#F5F5F5',
    text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)', redGlow: 'rgba(255,0,0,0.06)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    orange: '#E67E00', orangeBg: 'rgba(230,126,0,0.08)',
    chip: '#F2F2F2',
    today: '#FF0000', todayText: '#fff',
    cellHover: '#FAFAFA',
    eventBg: 'rgba(255,0,0,0.06)', eventBorder: 'rgba(255,0,0,0.15)',
    tipGrad: 'linear-gradient(135deg, #FFF5F5, #FFF0F0)',
    modalBg: '#FFFFFF', modalOverlay: 'rgba(0,0,0,0.5)',
    inputBg: '#FFFFFF', inputBorder: '#E5E5E5',
    toggleOn: '#2BA640', toggleOff: '#D4D4D4',
  },
}

const PLATFORMS = {
  youtube:   { icon: '▶', color: '#FF0000', label: 'YouTube' },
  instagram: { icon: '◎', color: '#E1306C', label: 'Instagram' },
  tiktok:    { icon: '♪', color: '#666',    label: 'TikTok' },
  threads:   { icon: '@', color: '#444',    label: 'Threads' },
}

const CONTENT_TYPES = {
  youtube:   ['video', 'short', 'live'],
  instagram: ['reel', 'post', 'story', 'live'],
  tiktok:    ['video', 'live'],
  threads:   ['post'],
}

const QUICK_REMINDERS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hr' },
  { value: 120, label: '2 hrs' },
  { value: 360, label: '6 hrs' },
  { value: 1440, label: '1 day' },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT']

// ── Icons ──
const I = {
  Sparkle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  ChevL: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevR: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Edit: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Bell: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  Play: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Alert: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
}

export default function SchedulerPage() {
  // ── All your existing state (unchanged) ──
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [scheduledPosts, setScheduledPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [postsLoading, setPostsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState('')
  const [recsLoading, setRecsLoading] = useState(true)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showDayDetail, setShowDayDetail] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', description: '', platform: 'youtube', content_type: 'video', time: '09:00' })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [notifPrefs, setNotifPrefs] = useState(null)
  const [notifForm, setNotifForm] = useState({ notification_email: '', reminder_minutes: 60, enabled: true })
  const [notifSaving, setNotifSaving] = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', platform: 'youtube', content_type: 'video', time: '09:00', date: null })
  const { dark } = useTheme()
  const c = dark ? themes.dark : themes.light

  // ── All your existing logic (unchanged) ──
  useEffect(() => { loadInitialData() }, [])
  useEffect(() => { loadPostsForMonth() }, [currentMonth])

  async function loadInitialData() {
    setLoading(true)
    try { await Promise.all([loadPostsForMonth(), loadRecommendations(), loadNotificationPrefs()]) }
    finally { setLoading(false) }
  }

  async function loadPostsForMonth() {
    try {
      setPostsLoading(true)
      const month = currentMonth.getMonth() + 1
      const year = currentMonth.getFullYear()
      const data = await getScheduledPosts(month, year)
      setScheduledPosts(data.posts || [])
    } catch (err) { console.error('Failed to load posts:', err) }
    finally { setPostsLoading(false) }
  }

  async function loadRecommendations() {
    try {
      setRecsLoading(true)
      const data = await getSchedulerRecommendations()
      setRecommendations(data.recommendations || 'No recommendations available yet.')
    } catch (err) {
      console.error('Failed to load recommendations:', err)
      setRecommendations('Unable to load recommendations right now.')
    } finally { setRecsLoading(false) }
  }

  async function loadNotificationPrefs() {
    try {
      const data = await getNotificationPreferences()
      if (data.preferences) {
        setNotifPrefs(data.preferences)
        setNotifForm({ notification_email: data.preferences.notification_email, reminder_minutes: data.preferences.reminder_minutes, enabled: data.preferences.enabled })
      }
    } catch (err) { console.error('Failed to load notification prefs:', err) }
  }

  async function fetchReactiveRecs(action, post) {
    try {
      setRecsLoading(true)
      const data = await getReactiveRecommendations(action, post)
      setRecommendations(data.recommendations || recommendations)
    } catch (err) { console.error('Failed to get reactive recommendations:', err) }
    finally { setRecsLoading(false) }
  }

  async function handleSchedulePost() {
    setFormError('')
    if (!newPost.title.trim()) { setFormError('Give your content a title.'); return }
    if (!selectedDate) { setFormError('Please select a date.'); return }
    const [hours, minutes] = newPost.time.split(':')
    const scheduledAt = new Date(selectedDate)
    scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    if (scheduledAt <= new Date()) { setFormError('Scheduled time must be in the future.'); return }
    try {
      setSubmitting(true)
      const data = await createScheduledPost({
        title: newPost.title.trim(), description: newPost.description.trim() || null,
        platform: newPost.platform, content_type: newPost.content_type,
        scheduled_at: scheduledAt.toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      setScheduledPosts(prev => [...prev, data.post].sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at)))
      setShowScheduleModal(false)
      setNewPost({ title: '', description: '', platform: 'youtube', content_type: 'video', time: '09:00' })
      fetchReactiveRecs('added', data.post)
    } catch (err) { setFormError(err.message || 'Failed to schedule post.') }
    finally { setSubmitting(false) }
  }

  async function handleDeletePost(post) {
    try {
      await deleteScheduledPost(post.id)
      setScheduledPosts(prev => prev.filter(p => p.id !== post.id))
      fetchReactiveRecs('removed', post)
    } catch (err) { console.error('Failed to delete post:', err) }
  }

  function startEditPost(post) {
    const postDate = new Date(post.scheduled_at)
    setEditingPost(post)
    setEditForm({
      title: post.title, description: post.description || '',
      platform: post.platform, content_type: post.content_type,
      time: `${String(postDate.getHours()).padStart(2, '0')}:${String(postDate.getMinutes()).padStart(2, '0')}`,
      date: postDate,
    })
    setFormError('')
    setShowDayDetail(false)
    setShowScheduleModal(true)
  }

  async function handleUpdatePost() {
    setFormError('')
    if (!editForm.title.trim()) { setFormError('Give your content a title.'); return }
    const [hours, minutes] = editForm.time.split(':')
    const scheduledAt = new Date(editForm.date)
    scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    if (scheduledAt <= new Date()) { setFormError('Scheduled time must be in the future.'); return }
    try {
      setSubmitting(true)
      const data = await updateScheduledPost(editingPost.id, {
        title: editForm.title.trim(), description: editForm.description.trim() || null,
        platform: editForm.platform, content_type: editForm.content_type,
        scheduled_at: scheduledAt.toISOString(),
      })
      setScheduledPosts(prev => prev.map(p => p.id === editingPost.id ? data.post : p).sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at)))
      setShowScheduleModal(false)
      setEditingPost(null)
      fetchReactiveRecs('updated', data.post)
    } catch (err) { setFormError(err.message || 'Failed to update post.') }
    finally { setSubmitting(false) }
  }

  async function handleSaveNotifications() {
    if (!notifForm.notification_email.trim()) return
    try {
      setNotifSaving(true)
      const data = await updateNotificationPreferences(notifForm)
      setNotifPrefs(data.preferences)
      setNotifSaved(true)
      setTimeout(() => setNotifSaved(false), 2000)
    } catch (err) { console.error('Failed to save notification prefs:', err) }
    finally { setNotifSaving(false) }
  }

  const generateCalendarDays = useCallback(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day))
    return days
  }, [currentMonth])

  function getPostsForDate(date) {
    if (!date) return []
    return scheduledPosts.filter(post => new Date(post.scheduled_at).toDateString() === date.toDateString())
  }

  function navigateMonth(delta) {
    setCurrentMonth(prev => { const next = new Date(prev); next.setMonth(next.getMonth() + delta); return next })
  }

  function goToToday() { setCurrentMonth(new Date()) }

  function openScheduleModal(date) {
    setSelectedDate(date); setEditingPost(null)
    setNewPost({ title: '', description: '', platform: 'youtube', content_type: 'video', time: '09:00' })
    setFormError(''); setShowScheduleModal(true)
  }

  function openDayDetail(date) { setSelectedDate(date); setShowDayDetail(true) }

  const calendarDays = generateCalendarDays()
  const today = new Date()

  // ── Shared modal input style ──
  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: `1px solid ${c.inputBorder}`, background: c.inputBg,
    color: c.text, fontSize: 14, fontFamily: 'inherit', outline: 'none',
  }

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: `3px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }}/>
          <p style={{ color: c.textDim, fontSize: 14 }}>Loading scheduler...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .cal-cell { transition: background 0.1s ease; cursor: pointer; }
        .cal-cell:hover { background: ${c.cellHover} !important; }
        .action-btn { transition: all 0.15s ease; opacity: 0.5; cursor: pointer; }
        .action-btn:hover { opacity: 1; }
        .tip-row { animation: fadeUp 0.4s ease forwards; opacity: 0; }
        .tip-row:nth-child(1) { animation-delay: 0.1s; }
        .tip-row:nth-child(2) { animation-delay: 0.2s; }
        .tip-row:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      {/* ── Calendar ── */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
        {/* Calendar Header */}
        <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.borderLight}` }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: c.text }}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => navigateMonth(-1)} style={{ width: 36, height: 36, borderRadius: 8, background: c.chip, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textSec }}><I.ChevL /></button>
            <button onClick={goToToday} style={{ padding: '0 14px', height: 36, borderRadius: 8, background: c.chip, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: c.textSec, fontFamily: 'inherit' }}>Today</button>
            <button onClick={() => navigateMonth(1)} style={{ width: 36, height: 36, borderRadius: 8, background: c.chip, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textSec }}><I.ChevR /></button>
          </div>
        </div>

        {/* Day Headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${c.borderLight}` }}>
          {DAYS.map(d => (
            <div key={d} style={{ padding: 10, textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: 1, color: c.textDim }}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {calendarDays.map((date, i) => {
            const isToday = date && date.toDateString() === today.toDateString()
            const isPast = date && date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
            const posts = date ? getPostsForDate(date) : []
            return (
              <div key={i}
                className={date ? 'cal-cell' : ''}
                onClick={() => {
                  if (date && !isPast) openScheduleModal(date)
                  else if (date && isPast && posts.length > 0) openDayDetail(date)
                }}
                style={{
                  minHeight: 90, padding: 8,
                  borderRight: (i + 1) % 7 !== 0 ? `1px solid ${c.borderLight}` : 'none',
                  borderBottom: `1px solid ${c.borderLight}`,
                  opacity: date ? (isPast ? 0.5 : 1) : 0.2,
                }}
              >
                {date && (
                  <>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 28, height: 28, borderRadius: 8,
                      background: isToday ? c.today : 'transparent',
                      color: isToday ? c.todayText : c.text,
                      fontSize: 13, fontWeight: isToday ? 700 : 500, marginBottom: 4,
                    }}>{date.getDate()}</span>
                    {posts.slice(0, 3).map((p, pi) => {
                      const plat = PLATFORMS[p.platform] || PLATFORMS.youtube
                      const postTime = new Date(p.scheduled_at)
                      const timeStr = postTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                      const isMissed = p.status === 'missed'
                      return (
                        <div key={pi} style={{
                          marginTop: 2, padding: '3px 6px', borderRadius: 5,
                          background: isMissed ? c.orangeBg : c.eventBg,
                          border: `1px solid ${isMissed ? (c.orange + '33') : c.eventBorder}`,
                          fontSize: 10, fontWeight: 500,
                          color: isMissed ? c.orange : c.red,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}
                          onClick={(e) => { e.stopPropagation(); openDayDetail(date) }}
                        >
                          <span style={{ flexShrink: 0 }}>{plat.icon}</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</span>
                          <span style={{ marginLeft: 'auto', fontSize: 9, color: c.textDim, flexShrink: 0 }}>{timeStr}</span>
                        </div>
                      )
                    })}
                    {posts.length > 3 && <div style={{ fontSize: 9, color: c.textDim, padding: '2px 6px' }}>+{posts.length - 3} more</div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Bottom: Upcoming + AI Tips ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>

        {/* Upcoming Content */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${c.borderLight}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <I.Clock />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: c.text }}>Upcoming Content</h3>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: c.textDim }}>
              {scheduledPosts.filter(p => p.status === 'scheduled' && new Date(p.scheduled_at) > new Date()).length} scheduled
            </span>
          </div>
          {scheduledPosts
            .filter(p => p.status === 'scheduled' && new Date(p.scheduled_at) > new Date())
            .slice(0, 5)
            .map((post, i, arr) => {
              const plat = PLATFORMS[post.platform] || PLATFORMS.youtube
              const postDate = new Date(post.scheduled_at)
              const dayStr = postDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
              const timeStr = postDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
              return (
                <div key={post.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px',
                  borderBottom: i < arr.length - 1 ? `1px solid ${c.borderLight}` : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: c.redBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.red, flexShrink: 0, fontSize: 14,
                  }}>{plat.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 3, fontSize: 12, color: c.textDim }}>
                      <span>{dayStr}</span><span>at {timeStr}</span>
                      <span style={{ color: c.textSec }}>· <span style={{ textTransform: 'capitalize' }}>{post.content_type}</span></span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button className="action-btn" onClick={() => startEditPost(post)} style={{ width: 32, height: 32, borderRadius: 7, background: 'transparent', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textSec }}><I.Edit /></button>
                    <button className="action-btn" onClick={() => handleDeletePost(post)} style={{ width: 32, height: 32, borderRadius: 7, background: 'transparent', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textSec }}><I.Trash /></button>
                  </div>
                </div>
              )
            })}
          {scheduledPosts.filter(p => p.status === 'scheduled' && new Date(p.scheduled_at) > new Date()).length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: c.textDim }}>No upcoming posts. Click a date to schedule content.</p>
            </div>
          )}
        </div>

        {/* AI Schedule Tips */}
        <div style={{
          background: c.tipGrad, border: `1px solid ${c.redBorder}`,
          borderRadius: 14, overflow: 'hidden', position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.red}, transparent)` }}/>
          <div style={{ padding: '18px 22px', borderBottom: `1px solid ${c.redBorder}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${c.redGlow}`, color: '#fff',
            }}><I.Sparkle /></div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: c.text }}>AI Schedule Tips</h3>
              <span style={{ fontSize: 11, color: c.textDim }}>Based on your channel analytics</span>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, color: '#fff', padding: '3px 8px', borderRadius: 5, letterSpacing: 0.5 }}>AI</span>
          </div>
          <div style={{ padding: '16px 22px' }}>
            {recsLoading && !recommendations ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c.textDim, fontSize: 13 }}>
                <div style={{ width: 16, height: 16, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
                Analyzing...
              </div>
            ) : (
              <div style={{ fontSize: 13, color: c.text, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {recommendations}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* SCHEDULE / EDIT POST MODAL                 */}
      {/* ══════════════════════════════════════════ */}
      {showScheduleModal && (
        <div onClick={() => { setShowScheduleModal(false); setEditingPost(null) }}
          style={{ position: 'fixed', inset: 0, background: c.modalOverlay, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: c.modalBg, borderRadius: 16, maxWidth: 500, width: '100%', padding: 28,
            border: `1px solid ${c.border}`, boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text }}>{editingPost ? 'Edit Content' : 'Schedule Content'}</h3>
                <p style={{ fontSize: 13, color: c.textDim, marginTop: 4 }}>
                  {(editingPost ? editForm.date : selectedDate)?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button onClick={() => { setShowScheduleModal(false); setEditingPost(null) }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textDim, padding: 4 }}><I.X /></button>
            </div>

            {formError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', marginBottom: 16, background: c.redBg, border: `1px solid ${c.redBorder}`, borderRadius: 10, fontSize: 13, color: c.red }}>
                <I.Alert /> {formError}
              </div>
            )}

            {(() => {
              const form = editingPost ? editForm : newPost
              const setForm = editingPost
                ? (u) => setEditForm(prev => ({ ...prev, ...u }))
                : (u) => setNewPost(prev => ({ ...prev, ...u }))
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>Content Title *</label>
                    <input type="text" value={form.title} onChange={e => setForm({ title: e.target.value })} placeholder="e.g., How I Built an AI Agent in 24 Hours" autoFocus style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>Platform</label>
                      <select value={form.platform} onChange={e => { const p = e.target.value; setForm({ platform: p, content_type: CONTENT_TYPES[p][0] }) }} style={inputStyle}>
                        {Object.entries(PLATFORMS).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>Content Type</label>
                      <select value={form.content_type} onChange={e => setForm({ content_type: e.target.value })} style={inputStyle}>
                        {(CONTENT_TYPES[form.platform] || ['video']).map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>Time</label>
                    <input type="time" value={form.time} onChange={e => setForm({ time: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>Notes <span style={{ fontWeight: 400, color: c.textDim }}>(optional)</span></label>
                    <textarea value={form.description} onChange={e => setForm({ description: e.target.value })} placeholder="Key points, hashtags..." rows="3" style={{ ...inputStyle, resize: 'none' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <button onClick={() => { setShowScheduleModal(false); setEditingPost(null) }} style={{ flex: 1, padding: '12px', borderRadius: 10, background: 'transparent', border: `1px solid ${c.border}`, color: c.textSec, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                    <button onClick={editingPost ? handleUpdatePost : handleSchedulePost} disabled={submitting || !form.title.trim()}
                      style={{ flex: 1, padding: '12px', borderRadius: 10, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: (submitting || !form.title.trim()) ? 0.5 : 1 }}>
                      {submitting ? <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> : editingPost ? <I.Check /> : <I.Plus />}
                      {submitting ? 'Saving...' : editingPost ? 'Update' : 'Schedule'}
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* DAY DETAIL MODAL                           */}
      {/* ══════════════════════════════════════════ */}
      {showDayDetail && selectedDate && (
        <div onClick={() => setShowDayDetail(false)}
          style={{ position: 'fixed', inset: 0, background: c.modalOverlay, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: c.modalBg, borderRadius: 16, maxWidth: 500, width: '100%', padding: 28,
            border: `1px solid ${c.border}`, boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text }}>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                <p style={{ fontSize: 13, color: c.textDim, marginTop: 4 }}>{getPostsForDate(selectedDate).length} scheduled item{getPostsForDate(selectedDate).length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={() => setShowDayDetail(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textDim, padding: 4 }}><I.X /></button>
            </div>

            {getPostsForDate(selectedDate).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: c.textDim }}>
                <p style={{ fontSize: 13 }}>Nothing scheduled for this day</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {getPostsForDate(selectedDate)
                  .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
                  .map(post => {
                    const plat = PLATFORMS[post.platform] || PLATFORMS.youtube
                    const postDate = new Date(post.scheduled_at)
                    const timeStr = postDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                    const isMissed = post.status === 'missed'
                    const isFuture = postDate > new Date()
                    return (
                      <div key={post.id} style={{
                        padding: '16px', borderRadius: 12,
                        background: isMissed ? c.orangeBg : c.redBg,
                        border: `1px solid ${isMissed ? (c.orange + '33') : c.redBorder}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: c.card, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isMissed ? c.orange : c.red, fontSize: 14, flexShrink: 0 }}>{plat.icon}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontWeight: 600, color: c.text }}>{post.title}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 12, color: c.textDim }}>
                              <I.Clock /> <span>{timeStr}</span> <span>·</span> <span style={{ textTransform: 'capitalize' }}>{post.content_type}</span>
                              {isMissed && <><span>·</span><span style={{ color: c.orange, fontWeight: 600 }}>Missed</span></>}
                            </div>
                            {post.description && <p style={{ fontSize: 13, color: c.textSec, marginTop: 8 }}>{post.description}</p>}
                          </div>
                          {isFuture && (
                            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                              <button className="action-btn" onClick={() => startEditPost(post)} style={{ width: 32, height: 32, borderRadius: 7, background: 'transparent', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textSec }}><I.Edit /></button>
                              <button className="action-btn" onClick={() => handleDeletePost(post)} style={{ width: 32, height: 32, borderRadius: 7, background: 'transparent', border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textSec }}><I.Trash /></button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            {selectedDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate()) && (
              <button onClick={() => { setShowDayDetail(false); openScheduleModal(selectedDate) }}
                style={{
                  width: '100%', marginTop: 16, padding: '14px',
                  border: `2px dashed ${c.border}`, borderRadius: 12,
                  background: 'transparent', color: c.textDim,
                  fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.red; e.currentTarget.style.color = c.red }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textDim }}
              ><I.Plus /> Add Content</button>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* NOTIFICATION SETTINGS MODAL                */}
      {/* ══════════════════════════════════════════ */}
      {showNotificationModal && (
        <div onClick={() => setShowNotificationModal(false)}
          style={{ position: 'fixed', inset: 0, background: c.modalOverlay, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: c.modalBg, borderRadius: 16, maxWidth: 440, width: '100%', padding: 28,
            border: `1px solid ${c.border}`, boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: c.redBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.red }}><I.Bell /></div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: c.text }}>Reminder Notifications</h3>
                  <p style={{ fontSize: 12, color: c.textDim }}>Get email reminders before scheduled content</p>
                </div>
              </div>
              <button onClick={() => setShowNotificationModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: c.textDim, padding: 4 }}><I.X /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Enable toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: c.chip, borderRadius: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: c.text }}>Enable reminders</span>
                <button onClick={() => setNotifForm({ ...notifForm, enabled: !notifForm.enabled })}
                  style={{ width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', background: notifForm.enabled ? c.toggleOn : c.toggleOff, position: 'relative', transition: 'background 0.25s' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: notifForm.enabled ? 25 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
                </button>
              </div>

              {notifForm.enabled && (
                <>
                  {/* Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 6 }}>Email address</label>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.textDim }}><I.Mail /></div>
                      <input type="email" value={notifForm.notification_email} onChange={e => setNotifForm({ ...notifForm, notification_email: e.target.value })} placeholder="your@email.com" style={{ ...inputStyle, paddingLeft: 36 }} />
                    </div>
                  </div>

                  {/* Quick reminder chips */}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: c.textSec, marginBottom: 8 }}>Remind me before</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {QUICK_REMINDERS.map(opt => (
                        <button key={opt.value} onClick={() => setNotifForm({ ...notifForm, reminder_minutes: opt.value })}
                          style={{
                            padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                            fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                            background: notifForm.reminder_minutes === opt.value ? c.red : c.chip,
                            color: notifForm.reminder_minutes === opt.value ? '#fff' : c.textSec,
                            transition: 'all 0.15s',
                          }}>{opt.label}</button>
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: c.textDim, marginTop: 8 }}>
                      Currently set to: {
                        notifForm.reminder_minutes >= 1440
                          ? `${Math.round(notifForm.reminder_minutes / 1440)} day${Math.round(notifForm.reminder_minutes / 1440) > 1 ? 's' : ''} before`
                          : notifForm.reminder_minutes >= 60
                            ? `${Math.round(notifForm.reminder_minutes / 60)} hour${Math.round(notifForm.reminder_minutes / 60) > 1 ? 's' : ''} before`
                            : `${notifForm.reminder_minutes} minutes before`
                      }
                    </p>
                  </div>
                </>
              )}

              {/* Save */}
              <button onClick={handleSaveNotifications} disabled={notifSaving || (notifForm.enabled && !notifForm.notification_email.trim())}
                style={{
                  width: '100%', padding: '13px', borderRadius: 10,
                  background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`,
                  border: 'none', color: '#fff', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: (notifSaving || (notifForm.enabled && !notifForm.notification_email.trim())) ? 0.5 : 1,
                }}>
                {notifSaving ? <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> : notifSaved ? <I.Check /> : <I.Bell />}
                {notifSaving ? 'Saving...' : notifSaved ? 'Saved!' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}