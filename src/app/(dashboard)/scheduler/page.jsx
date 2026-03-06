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
  import {
    Calendar, Clock, Plus, X, Loader2, Instagram, Youtube,
    Twitter, Video, Sparkles, Bell, BellRing, Mail, Check,
    ChevronLeft, ChevronRight, Trash2, AlertCircle, Settings, Pencil,
  } from 'lucide-react'
  
  // ============================================================
  // PLATFORM CONFIG
  // ============================================================
  const PLATFORMS = {
    youtube:   { icon: Youtube,   color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',   dot: 'bg-red-500',    label: 'YouTube' },
    instagram: { icon: Instagram, color: 'text-pink-600',   bg: 'bg-pink-50',   border: 'border-pink-200',  dot: 'bg-pink-500',   label: 'Instagram' },
    tiktok:    { icon: Video,     color: 'text-gray-900',   bg: 'bg-gray-100',  border: 'border-gray-300',  dot: 'bg-gray-700',   label: 'TikTok' },
    threads:   { icon: Twitter,   color: 'text-gray-800',   bg: 'bg-gray-50',   border: 'border-gray-200',  dot: 'bg-gray-800',   label: 'Threads' },
  }
  
  const CONTENT_TYPES = {
    youtube:   ['video', 'short', 'live'],
    instagram: ['reel', 'post', 'story', 'live'],
    tiktok:    ['video', 'live'],
    threads:   ['post'],
  }
  
  const QUICK_REMINDERS = [
    { value: 15,   label: '15 min' },
    { value: 30,   label: '30 min' },
    { value: 60,   label: '1 hr' },
    { value: 120,  label: '2 hrs' },
    { value: 360,  label: '6 hrs' },
    { value: 1440, label: '1 day' },
  ]
  
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  
  // ============================================================
  // MAIN COMPONENT
  // ============================================================
  export default function SchedulerPage() {
    // Calendar state
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
  
    // Data state
    const [scheduledPosts, setScheduledPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [postsLoading, setPostsLoading] = useState(false)
  
    // AI recommendations
    const [recommendations, setRecommendations] = useState('')
    const [recsLoading, setRecsLoading] = useState(true)
  
    // Modals
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [showNotificationModal, setShowNotificationModal] = useState(false)
    const [showDayDetail, setShowDayDetail] = useState(false)
  
    // New post form
    const [newPost, setNewPost] = useState({
      title: '',
      description: '',
      platform: 'youtube',
      content_type: 'video',
      time: '09:00',
    })
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')
  
    // Notification preferences
    const [notifPrefs, setNotifPrefs] = useState(null)
    const [notifForm, setNotifForm] = useState({
      notification_email: '',
      reminder_minutes: 60,
      enabled: true,
    })
    const [notifSaving, setNotifSaving] = useState(false)
    const [notifSaved, setNotifSaved] = useState(false)
  
    // Edit post state
    const [editingPost, setEditingPost] = useState(null)
    const [editForm, setEditForm] = useState({
      title: '',
      description: '',
      platform: 'youtube',
      content_type: 'video',
      time: '09:00',
      date: null,
    })
  
  
    // ——————————————————————————————————————
    // LOAD DATA
    // ——————————————————————————————————————
    useEffect(() => {
      loadInitialData()
    }, [])
  
    useEffect(() => {
      loadPostsForMonth()
    }, [currentMonth])
  
    async function loadInitialData() {
      setLoading(true)
      try {
        await Promise.all([
          loadPostsForMonth(),
          loadRecommendations(),
          loadNotificationPrefs(),
        ])
      } finally {
        setLoading(false)
      }
    }
  
    async function loadPostsForMonth() {
      try {
        setPostsLoading(true)
        const month = currentMonth.getMonth() + 1
        const year = currentMonth.getFullYear()
        const data = await getScheduledPosts(month, year)
        setScheduledPosts(data.posts || [])
      } catch (err) {
        console.error('Failed to load posts:', err)
      } finally {
        setPostsLoading(false)
      }
    }
  
    async function loadRecommendations() {
      try {
        setRecsLoading(true)
        const data = await getSchedulerRecommendations()
        setRecommendations(data.recommendations || 'No recommendations available yet.')
      } catch (err) {
        console.error('Failed to load recommendations:', err)
        setRecommendations('Unable to load recommendations right now.')
      } finally {
        setRecsLoading(false)
      }
    }
  
    async function loadNotificationPrefs() {
      try {
        const data = await getNotificationPreferences()
        if (data.preferences) {
          setNotifPrefs(data.preferences)
          setNotifForm({
            notification_email: data.preferences.notification_email,
            reminder_minutes: data.preferences.reminder_minutes,
            enabled: data.preferences.enabled,
          })
        }
      } catch (err) {
        console.error('Failed to load notification prefs:', err)
      }
    }
  
    // Fetch reactive recommendations after scheduling actions
    async function fetchReactiveRecs(action, post) {
      try {
        setRecsLoading(true)
        const data = await getReactiveRecommendations(action, post)
        setRecommendations(data.recommendations || recommendations)
      } catch (err) {
        console.error('Failed to get reactive recommendations:', err)
      } finally {
        setRecsLoading(false)
      }
    }
  
  
    // ——————————————————————————————————————
    // ACTIONS
    // ——————————————————————————————————————
  
    async function handleSchedulePost() {
      setFormError('')
  
      if (!newPost.title.trim()) {
        setFormError('Give your content a title.')
        return
      }
      if (!selectedDate) {
        setFormError('Please select a date.')
        return
      }
  
      // Build scheduled_at datetime
      const [hours, minutes] = newPost.time.split(':')
      const scheduledAt = new Date(selectedDate)
      scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  
      if (scheduledAt <= new Date()) {
        setFormError('Scheduled time must be in the future.')
        return
      }
  
      try {
        setSubmitting(true)
        const data = await createScheduledPost({
          title: newPost.title.trim(),
          description: newPost.description.trim() || null,
          platform: newPost.platform,
          content_type: newPost.content_type,
          scheduled_at: scheduledAt.toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
  
        // Add to local state immediately
        setScheduledPosts(prev => [...prev, data.post].sort(
          (a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at)
        ))
  
        // Close modal & reset form
        setShowScheduleModal(false)
        setNewPost({ title: '', description: '', platform: 'youtube', content_type: 'video', time: '09:00' })
  
        // Get reactive AI update
        fetchReactiveRecs('added', data.post)
  
      } catch (err) {
        setFormError(err.message || 'Failed to schedule post.')
      } finally {
        setSubmitting(false)
      }
    }
  
    async function handleDeletePost(post) {
      try {
        await deleteScheduledPost(post.id)
        setScheduledPosts(prev => prev.filter(p => p.id !== post.id))
        fetchReactiveRecs('removed', post)
      } catch (err) {
        console.error('Failed to delete post:', err)
      }
    }
  
    function startEditPost(post) {
      const postDate = new Date(post.scheduled_at)
      setEditingPost(post)
      setEditForm({
        title: post.title,
        description: post.description || '',
        platform: post.platform,
        content_type: post.content_type,
        time: `${String(postDate.getHours()).padStart(2, '0')}:${String(postDate.getMinutes()).padStart(2, '0')}`,
        date: postDate,
      })
      setFormError('')
      setShowDayDetail(false)
      setShowScheduleModal(true)
    }
  
    async function handleUpdatePost() {
      setFormError('')
      if (!editForm.title.trim()) {
        setFormError('Give your content a title.')
        return
      }
  
      const [hours, minutes] = editForm.time.split(':')
      const scheduledAt = new Date(editForm.date)
      scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  
      if (scheduledAt <= new Date()) {
        setFormError('Scheduled time must be in the future.')
        return
      }
  
      try {
        setSubmitting(true)
        const data = await updateScheduledPost(editingPost.id, {
          title: editForm.title.trim(),
          description: editForm.description.trim() || null,
          platform: editForm.platform,
          content_type: editForm.content_type,
          scheduled_at: scheduledAt.toISOString(),
        })
  
        setScheduledPosts(prev =>
          prev.map(p => p.id === editingPost.id ? data.post : p)
            .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
        )
  
        setShowScheduleModal(false)
        setEditingPost(null)
        fetchReactiveRecs('updated', data.post)
      } catch (err) {
        setFormError(err.message || 'Failed to update post.')
      } finally {
        setSubmitting(false)
      }
    }
  
    async function handleSaveNotifications() {
      if (!notifForm.notification_email.trim()) return
  
      try {
        setNotifSaving(true)
        const data = await updateNotificationPreferences(notifForm)
        setNotifPrefs(data.preferences)
        setNotifSaved(true)
        setTimeout(() => setNotifSaved(false), 2000)
      } catch (err) {
        console.error('Failed to save notification prefs:', err)
      } finally {
        setNotifSaving(false)
      }
    }
  
  
    // ——————————————————————————————————————
    // CALENDAR HELPERS
    // ——————————————————————————————————————
  
    const generateCalendarDays = useCallback(() => {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startingDayOfWeek = firstDay.getDay()
      const daysInMonth = lastDay.getDate()
  
      const days = []
      for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day))
      }
      return days
    }, [currentMonth])
  
    function getPostsForDate(date) {
      if (!date) return []
      return scheduledPosts.filter(post => {
        const postDate = new Date(post.scheduled_at)
        return postDate.toDateString() === date.toDateString()
      })
    }
  
    function navigateMonth(delta) {
      setCurrentMonth(prev => {
        const next = new Date(prev)
        next.setMonth(next.getMonth() + delta)
        return next
      })
    }
  
    function goToToday() {
      setCurrentMonth(new Date())
    }
  
    function openScheduleModal(date) {
      setSelectedDate(date)
      setEditingPost(null)
      setNewPost({ title: '', description: '', platform: 'youtube', content_type: 'video', time: '09:00' })
      setFormError('')
      setShowScheduleModal(true)
    }
  
    function openDayDetail(date) {
      setSelectedDate(date)
      setShowDayDetail(true)
    }
  
    const calendarDays = generateCalendarDays()
    const today = new Date()
  
  
    // ——————————————————————————————————————
    // LOADING STATE
    // ——————————————————————————————————————
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading scheduler...</p>
          </div>
        </div>
      )
    }
  
  
    // ——————————————————————————————————————
    // RENDER
    // ——————————————————————————————————————
    return (
      <div className="space-y-6">
  
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-primary-600" />
              Content Scheduler
            </h1>
            <p className="text-gray-600 mt-1">
              Plan your content, get AI recommendations, and never miss a post
            </p>
          </div>
          <button
            onClick={() => setShowNotificationModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Notification settings"
          >
            {notifPrefs?.enabled ? (
              <BellRing className="w-5 h-5 text-primary-600" />
            ) : (
              <Bell className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700">
              {notifPrefs ? 'Reminders On' : 'Set Reminders'}
            </span>
          </button>
        </div>
  
        {/* Calendar */}
        <div className="card">
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={() => navigateMonth(-1)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={goToToday} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Today
              </button>
              <button onClick={() => navigateMonth(1)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
  
          {/* Day name headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_NAMES.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>
  
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const postsForDay = date ? getPostsForDate(date) : []
              const isToday = date && date.toDateString() === today.toDateString()
              const isPast = date && date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
              const hasContent = postsForDay.length > 0
  
              return (
                <div
                  key={index}
                  className={`
                    min-h-[110px] p-2 rounded-lg border transition-all
                    ${!date ? 'bg-gray-50/50 border-transparent' : ''}
                    ${date && !isPast ? 'bg-white hover:border-primary-300 hover:shadow-sm cursor-pointer border-gray-200' : ''}
                    ${date && isPast ? 'bg-gray-50 border-gray-100 cursor-default' : ''}
                    ${isToday ? 'border-primary-500 border-2 shadow-sm' : ''}
                  `}
                  onClick={() => {
                    if (date && !isPast) openScheduleModal(date)
                    else if (date && isPast && hasContent) openDayDetail(date)
                  }}
                >
                  {date && (
                    <>
                      {/* Date number */}
                      <div className="flex items-center justify-between mb-1">
                        <span className={`
                          text-sm font-semibold
                          ${isToday ? 'bg-primary-600 text-white w-7 h-7 rounded-full flex items-center justify-center' : ''}
                          ${isPast && !isToday ? 'text-gray-400' : 'text-gray-800'}
                        `}>
                          {date.getDate()}
                        </span>
                        {!isPast && (
                          <button
                            onClick={(e) => { e.stopPropagation(); openScheduleModal(date) }}
                            className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-primary-50 transition-opacity"
                          >
                            <Plus className="w-3.5 h-3.5 text-primary-500" />
                          </button>
                        )}
                      </div>
  
                      {/* Scheduled posts */}
                      <div className="space-y-1">
                        {postsForDay.slice(0, 3).map(post => {
                          const platform = PLATFORMS[post.platform] || PLATFORMS.youtube
                          const Icon = platform.icon
                          const postTime = new Date(post.scheduled_at)
                          const timeStr = postTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                          const isMissed = post.status === 'missed'
  
                          return (
                            <div
                              key={post.id}
                              className={`
                                text-xs px-1.5 py-1 rounded-md flex items-center gap-1 group/post
                                ${isMissed ? 'bg-orange-50 border border-orange-200' : `${platform.bg} border ${platform.border}`}
                              `}
                              onClick={(e) => { e.stopPropagation(); openDayDetail(date) }}
                              title={`${post.title} — ${timeStr}`}
                            >
                              <Icon className={`w-3 h-3 flex-shrink-0 ${isMissed ? 'text-orange-500' : platform.color}`} />
                              <span className="truncate flex-1 font-medium text-gray-700">
                                {post.title}
                              </span>
                              <span className="text-gray-400 flex-shrink-0 text-[10px]">
                                {timeStr}
                              </span>
                            </div>
                          )
                        })}
                        {postsForDay.length > 3 && (
                          <div className="text-[10px] text-gray-400 font-medium px-1.5">
                            +{postsForDay.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
  
        {/* Upcoming Posts Summary */}
        {scheduledPosts.filter(p => p.status === 'scheduled' && new Date(p.scheduled_at) > new Date()).length > 0 && (
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Upcoming Content
            </h3>
            <div className="space-y-3">
              {scheduledPosts
                .filter(p => p.status === 'scheduled' && new Date(p.scheduled_at) > new Date())
                .slice(0, 5)
                .map(post => {
                  const platform = PLATFORMS[post.platform] || PLATFORMS.youtube
                  const Icon = platform.icon
                  const postDate = new Date(post.scheduled_at)
                  const dayStr = postDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                  const timeStr = postDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  
                  return (
                    <div key={post.id} className={`flex items-center gap-3 p-3 rounded-lg border ${platform.border} ${platform.bg}`}>
                      <div className={`p-2 rounded-lg bg-white border ${platform.border}`}>
                        <Icon className={`w-5 h-5 ${platform.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          {dayStr} at {timeStr} · <span className="capitalize">{post.content_type}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditPost(post)}
                          className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-500"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                          title="Remove from schedule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )}
  
  
        {/* AI Recommendations — at bottom */}
        <div className="card bg-gradient-to-br from-primary-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="relative flex items-start gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Sparkles className="w-6 h-6 flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold">AI Schedule Tips</h3>
                {recsLoading && <Loader2 className="w-4 h-4 animate-spin text-white/60" />}
              </div>
              {recsLoading && !recommendations ? (
                <div className="flex items-center gap-2 text-white/70">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                  {recommendations}
                </div>
              )}
            </div>
          </div>
        </div>
  
  
        {/* ============================================================ */}
        {/* SCHEDULE POST MODAL */}
        {/* ============================================================ */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowScheduleModal(false); setEditingPost(null) }}>
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingPost ? 'Edit Content' : 'Schedule Content'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {(editingPost ? editForm.date : selectedDate)?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button onClick={() => { setShowScheduleModal(false); setEditingPost(null) }} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
  
              {formError && (
                <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {formError}
                </div>
              )}
  
              {/* Use editForm when editing, newPost when creating */}
              {(() => {
                const form = editingPost ? editForm : newPost
                const setForm = editingPost
                  ? (updates) => setEditForm(prev => ({ ...prev, ...updates }))
                  : (updates) => setNewPost(prev => ({ ...prev, ...updates }))
  
                return (
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content Title *</label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ title: e.target.value })}
                        placeholder="e.g., How I Built an AI Agent in 24 Hours"
                        className="input"
                        autoFocus
                      />
                    </div>
  
                    {/* Platform + Content Type */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                        <select
                          value={form.platform}
                          onChange={(e) => {
                            const platform = e.target.value
                            const types = CONTENT_TYPES[platform]
                            setForm({ platform, content_type: types[0] })
                          }}
                          className="input"
                        >
                          {Object.entries(PLATFORMS).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                        <select
                          value={form.content_type}
                          onChange={(e) => setForm({ content_type: e.target.value })}
                          className="input"
                        >
                          {(CONTENT_TYPES[form.platform] || ['video']).map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
  
                    {/* Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={form.time}
                        onChange={(e) => setForm({ time: e.target.value })}
                        className="input"
                      />
                    </div>
  
                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm({ description: e.target.value })}
                        placeholder="Key points, hashtags, or anything to remember..."
                        rows="3"
                        className="input resize-none"
                      />
                    </div>
  
                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => { setShowScheduleModal(false); setEditingPost(null) }}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={editingPost ? handleUpdatePost : handleSchedulePost}
                        disabled={submitting || !form.title.trim()}
                        className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : editingPost ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                        {submitting ? 'Saving...' : editingPost ? 'Update' : 'Schedule'}
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
  
  
        {/* ============================================================ */}
        {/* DAY DETAIL MODAL — shows all posts for a date */}
        {/* ============================================================ */}
        {showDayDetail && selectedDate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDayDetail(false)}>
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {getPostsForDate(selectedDate).length} scheduled item{getPostsForDate(selectedDate).length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button onClick={() => setShowDayDetail(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
  
              {getPostsForDate(selectedDate).length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>Nothing scheduled for this day</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getPostsForDate(selectedDate)
                    .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
                    .map(post => {
                      const platform = PLATFORMS[post.platform] || PLATFORMS.youtube
                      const Icon = platform.icon
                      const postDate = new Date(post.scheduled_at)
                      const timeStr = postDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                      const isMissed = post.status === 'missed'
                      const isFuture = postDate > new Date()
  
                      return (
                        <div key={post.id} className={`p-4 rounded-lg border ${isMissed ? 'border-orange-200 bg-orange-50' : `${platform.border} ${platform.bg}`}`}>
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-white border ${platform.border}`}>
                              <Icon className={`w-5 h-5 ${isMissed ? 'text-orange-500' : platform.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900">{post.title}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{timeStr}</span>
                                <span>·</span>
                                <span className="capitalize">{post.content_type}</span>
                                {isMissed && (
                                  <>
                                    <span>·</span>
                                    <span className="text-orange-600 font-medium">Missed</span>
                                  </>
                                )}
                              </div>
                              {post.description && (
                                <p className="text-sm text-gray-600 mt-2">{post.description}</p>
                              )}
                            </div>
                            {isFuture && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => startEditPost(post)}
                                  className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-500"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post)}
                                  className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )}
  
              {/* Add more button for future dates */}
              {selectedDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate()) && (
                <button
                  onClick={() => { setShowDayDetail(false); openScheduleModal(selectedDate) }}
                  className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Content
                </button>
              )}
            </div>
          </div>
        )}
  
  
        {/* ============================================================ */}
        {/* NOTIFICATION SETTINGS MODAL */}
        {/* ============================================================ */}
        {showNotificationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowNotificationModal(false)}>
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <Bell className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Reminder Notifications</h3>
                    <p className="text-sm text-gray-500">Get email reminders before scheduled content</p>
                  </div>
                </div>
                <button onClick={() => setShowNotificationModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
  
              <div className="space-y-4">
                {/* Enable toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Enable reminders</span>
                  <button
                    onClick={() => setNotifForm({ ...notifForm, enabled: !notifForm.enabled })}
                    className={`relative w-12 h-7 rounded-full transition-colors ${notifForm.enabled ? 'bg-primary-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${notifForm.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
  
                {notifForm.enabled && (
                  <>
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={notifForm.notification_email}
                          onChange={(e) => setNotifForm({ ...notifForm, notification_email: e.target.value })}
                          placeholder="your@email.com"
                          className="input pl-10"
                        />
                      </div>
                    </div>
  
                    {/* Reminder timing */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Remind me before</label>
                      
                      {/* Quick pick chips */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {QUICK_REMINDERS.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => setNotifForm({ ...notifForm, reminder_minutes: opt.value, customValue: '', customUnit: 'minutes' })}
                            className={`
                              px-3 py-1.5 rounded-full text-sm font-medium transition-all
                              ${notifForm.reminder_minutes === opt.value
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                            `}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
  
                      {/* Custom time input */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">or custom:</span>
                        <input
                          type="number"
                          min="1"
                          placeholder=""
                          value={notifForm.customValue || ''}
                          onChange={(e) => {
                            const val = e.target.value
                            if (val === '') {
                              setNotifForm({ ...notifForm, customValue: '' })
                              return
                            }
                            const num = parseInt(val)
                            if (!isNaN(num) && num > 0) {
                              const unit = notifForm.customUnit || 'minutes'
                              const multiplier = unit === 'days' ? 1440 : unit === 'hours' ? 60 : 1
                              setNotifForm({
                                ...notifForm,
                                customValue: val,
                                reminder_minutes: num * multiplier,
                              })
                            }
                          }}
                          className="input w-20 text-center"
                        />
                        <select
                          value={notifForm.customUnit || 'minutes'}
                          onChange={(e) => {
                            const unit = e.target.value
                            const num = parseInt(notifForm.customValue) || 1
                            const multiplier = unit === 'days' ? 1440 : unit === 'hours' ? 60 : 1
                            setNotifForm({
                              ...notifForm,
                              customUnit: unit,
                              reminder_minutes: num * multiplier,
                            })
                          }}
                          className="input w-28"
                        >
                          <option value="minutes">minutes</option>
                          <option value="hours">hours</option>
                          <option value="days">days</option>
                        </select>
                      </div>
  
                      <p className="text-xs text-gray-400 mt-2">
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
                <button
                  onClick={handleSaveNotifications}
                  disabled={notifSaving || (notifForm.enabled && !notifForm.notification_email.trim())}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {notifSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : notifSaved ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Settings className="w-5 h-5" />
                  )}
                  {notifSaving ? 'Saving...' : notifSaved ? 'Saved!' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }