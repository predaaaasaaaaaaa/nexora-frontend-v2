'use client'

import { useState, useEffect } from 'react'
import { getAllSchedules } from '@/lib/api'
import { Calendar, Clock, Plus, X, Loader2, Instagram, Youtube, Twitter, Video, Sparkles } from 'lucide-react'

export default function SchedulerPage() {
  const [schedules, setSchedules] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [scheduledPosts, setScheduledPosts] = useState([])
  
  const [newPost, setNewPost] = useState({
    platform: 'instagram',
    content: '',
    time: '09:00',
  })

  useEffect(() => {
    loadSchedules()
  }, [])

  async function loadSchedules() {
    try {
      setLoading(true)
      const data = await getAllSchedules()
      setSchedules(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const handleSchedulePost = () => {
    const postDate = new Date(selectedDate)
    const [hours, minutes] = newPost.time.split(':')
    postDate.setHours(parseInt(hours), parseInt(minutes))

    setScheduledPosts([
      ...scheduledPosts,
      {
        id: Date.now(),
        ...newPost,
        date: postDate,
      }
    ])

    setShowModal(false)
    setNewPost({
      platform: 'instagram',
      content: '',
      time: '09:00',
    })
  }

  const getPostsForDate = (date) => {
    if (!date) return []
    return scheduledPosts.filter(post => 
      post.date.toDateString() === date.toDateString()
    )
  }

  const removePost = (id) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id))
  }

  const platformIcons = {
    instagram: { icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-100' },
    youtube: { icon: Youtube, color: 'text-red-600', bg: 'bg-red-100' },
    tiktok: { icon: Video, color: 'text-gray-900', bg: 'bg-gray-100' },
    twitter: { icon: Twitter, color: 'text-blue-500', bg: 'bg-blue-100' },
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const calendarDays = generateCalendarDays()

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary-600" />
            Content Scheduler
          </h1>
          <p className="text-gray-600 mt-2">
            Plan and schedule your content across all platforms
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="card">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, index) => {
            const postsForDay = date ? getPostsForDate(date) : []
            const isToday = date && date.toDateString() === new Date().toDateString()
            
            return (
              <div
                key={index}
                className={`
                  min-h-[100px] p-2 border rounded-lg
                  ${date ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'}
                  ${isToday ? 'border-primary-500 border-2' : 'border-gray-200'}
                `}
                onClick={() => {
                  if (date) {
                    setSelectedDate(date)
                    setShowModal(true)
                  }
                }}
              >
                {date && (
                  <>
                    <div className={`
                      text-sm font-medium mb-2
                      ${isToday ? 'text-primary-600' : 'text-gray-900'}
                    `}>
                      {date.getDate()}
                    </div>
                    
                    {/* Scheduled posts indicators */}
                    <div className="space-y-1">
                      {postsForDay.slice(0, 2).map(post => {
                        const Icon = platformIcons[post.platform].icon
                        return (
                          <div
                            key={post.id}
                            className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${platformIcons[post.platform].bg}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              removePost(post.id)
                            }}
                          >
                            <Icon className={`w-3 h-3 ${platformIcons[post.platform].color}`} />
                            <span className="truncate flex-1">{post.time}</span>
                            <X className="w-3 h-3" />
                          </div>
                        )
                      })}
                      {postsForDay.length > 2 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{postsForDay.length - 2} more
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

      {/* AI Recommendations */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="flex items-start gap-4">
          <Sparkles className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-3">AI Posting Recommendations</h3>
            <div className="text-primary-100 whitespace-pre-wrap">
              {schedules?.recommendations || 'Loading AI recommendations...'}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Schedule Post
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="label">Date</label>
                <input
                  type="text"
                  value={selectedDate.toDateString()}
                  disabled
                  className="input bg-gray-50"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="label">Platform</label>
                <select
                  value={newPost.platform}
                  onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                  className="input"
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">Twitter</option>
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="label">Time</label>
                <input
                  type="time"
                  value={newPost.time}
                  onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                  className="input"
                />
              </div>

              {/* Content */}
              <div>
                <label className="label">Content Preview</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="What are you posting?"
                  rows="4"
                  className="input resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedulePost}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  disabled={!newPost.content}
                >
                  <Plus className="w-5 h-5" />
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
