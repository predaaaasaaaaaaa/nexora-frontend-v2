'use client'

import { useState, useRef, useEffect } from 'react'
import { chatWithCoach, listCoachConversations, getCoachMessages, deleteCoachConversation } from '@/lib/api'
import { Send, Sparkles, Loader2, Youtube, TrendingUp, Target, Lightbulb, BarChart3, Users, Video, Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, Clock, Search } from 'lucide-react'

export default function CoachPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [conversations, setConversations] = useState([])
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load conversation list on mount
  useEffect(() => {
    loadConversations()
  }, [])

  // Focus input
  useEffect(() => {
    if (!loadingHistory) inputRef.current?.focus()
  }, [loadingHistory, activeConversationId])

  async function loadConversations() {
    try {
      setLoadingHistory(true)
      const data = await listCoachConversations()
      setConversations(data.conversations || [])
    } catch (err) {
      console.error('Error loading conversations:', err)
    } finally {
      setLoadingHistory(false)
    }
  }

  async function loadMessages(conversationId) {
    try {
      setLoading(true)
      const data = await getCoachMessages(conversationId)
      const formattedMessages = (data.messages || []).map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at),
        contextUsed: msg.context_used,
      }))
      setMessages(formattedMessages)
      setActiveConversationId(conversationId)
    } catch (err) {
      console.error('Error loading messages:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleNewChat() {
    setMessages([])
    setActiveConversationId(null)
    inputRef.current?.focus()
  }

  async function handleDeleteConversation(e, conversationId) {
    e.stopPropagation()
    if (!confirm('Delete this conversation?')) return

    try {
      await deleteCoachConversation(conversationId)
      setConversations(prev => prev.filter(c => c.id !== conversationId))
      if (activeConversationId === conversationId) {
        handleNewChat()
      }
    } catch (err) {
      console.error('Error deleting conversation:', err)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      const response = await chatWithCoach(currentInput, selectedPlatform, activeConversationId)

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        contextUsed: response.contextUsed
      }

      setMessages(prev => [...prev, assistantMessage])

      // Update active conversation ID (important for new chats)
      if (response.conversationId) {
        setActiveConversationId(response.conversationId)
      }

      // Refresh conversation list
      await loadConversations()

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
        error: true
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleQuickPrompt(prompt) {
    setInput(prompt)
    setTimeout(() => {
      const form = document.getElementById('coach-form')
      if (form) form.requestSubmit()
    }, 100)
  }

  function timeAgo(dateStr) {
    const date = new Date(dateStr)
    const now = new Date()
    const mins = Math.floor((now - date) / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  // Group conversations by time
  function groupConversations(convs) {
    const today = []
    const week = []
    const older = []
    const now = new Date()

    convs.forEach(c => {
      const date = new Date(c.updated_at)
      const days = Math.floor((now - date) / (1000 * 60 * 60 * 24))
      if (days < 1) today.push(c)
      else if (days < 7) week.push(c)
      else older.push(c)
    })

    return { today, week, older }
  }

  // Format AI coach messages — render markdown-like syntax to styled HTML
  function formatCoachMessage(text) {
    // Sanitize HTML characters first
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Bold: **text** → <strong>
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')

    // Italic: *text* → <em> (single asterisks, not inside bold)
    safe = safe.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')

    // Numbered lists — style the numbers
    safe = safe.replace(/^(\d+)\.\s/gm, '<span class="font-semibold text-primary-600">$1.</span> ')

    // Bullet points
    safe = safe.replace(/^[-•]\s/gm, '<span class="text-primary-500 mr-1">•</span> ')

    // Channel handles — highlight in purple
    safe = safe.replace(/@([\w.-]+)/g, '<span class="font-semibold text-purple-600">@$1</span>')

    return safe
  }

  const smartPrompts = [
    { icon: BarChart3, label: 'Channel Audit', prompt: 'Give me a quick audit of my channel — what am I doing well and what needs improvement?', color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100' },
    { icon: TrendingUp, label: 'Growth Strategy', prompt: 'Based on my data, what is the #1 thing I should focus on to grow faster?', color: 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100' },
    { icon: Lightbulb, label: 'Next Video Idea', prompt: 'Give me 3 video ideas based on what performs best on my channel', color: 'text-yellow-600 bg-yellow-50 border-yellow-200 hover:bg-yellow-100' },
    { icon: Search, label: 'Spy on Competitor', prompt: 'Find 5 competitors in my niche and analyze what makes their top videos successful', color: 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100' },
    { icon: Target, label: 'Compare Channels', prompt: 'Compare my channel with @MrBeast and tell me the biggest gaps and opportunities', color: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100' },
    { icon: Users, label: 'Audience Insights', prompt: 'What does my engagement data tell you about my audience?', color: 'text-pink-600 bg-pink-50 border-pink-200 hover:bg-pink-100' },
    { icon: Video, label: 'Video Review', prompt: 'Review my latest video — how did it perform and what can I improve?', color: 'text-red-600 bg-red-50 border-red-200 hover:bg-red-100' },
  ]

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600', available: true },
    { id: 'instagram', name: 'Instagram', label: 'IG', color: 'bg-pink-600', available: false },
    { id: 'tiktok', name: 'TikTok', label: 'TT', color: 'bg-gray-900', available: false },
    { id: 'threads', name: 'Threads', label: '@', color: 'bg-gray-800', available: false },
  ]

  const grouped = groupConversations(conversations)

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversation Sidebar */}
      <div className={`
        ${sidebarOpen ? 'w-72' : 'w-0'} 
        flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden rounded-l-xl
      `}>
        {/* Sidebar Header */}
        <div className="p-3 border-b border-gray-100">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loadingHistory ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 px-4">
              <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">No conversations yet</p>
            </div>
          ) : (
            <>
              {grouped.today.length > 0 && (
                <>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 pt-2">Today</p>
                  {grouped.today.map(conv => (
                    <ConversationItem 
                      key={conv.id} 
                      conv={conv} 
                      active={activeConversationId === conv.id}
                      onSelect={() => loadMessages(conv.id)}
                      onDelete={(e) => handleDeleteConversation(e, conv.id)}
                      timeAgo={timeAgo}
                    />
                  ))}
                </>
              )}
              {grouped.week.length > 0 && (
                <>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3">This Week</p>
                  {grouped.week.map(conv => (
                    <ConversationItem 
                      key={conv.id} 
                      conv={conv} 
                      active={activeConversationId === conv.id}
                      onSelect={() => loadMessages(conv.id)}
                      onDelete={(e) => handleDeleteConversation(e, conv.id)}
                      timeAgo={timeAgo}
                    />
                  ))}
                </>
              )}
              {grouped.older.length > 0 && (
                <>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3">Older</p>
                  {grouped.older.map(conv => (
                    <ConversationItem 
                      key={conv.id} 
                      conv={conv} 
                      active={activeConversationId === conv.id}
                      onSelect={() => loadMessages(conv.id)}
                      onDelete={(e) => handleDeleteConversation(e, conv.id)}
                      timeAgo={timeAgo}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="flex-shrink-0 w-6 bg-gray-50 hover:bg-gray-100 border-r border-gray-200 flex items-center justify-center transition-colors"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white rounded-tr-xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">AI Coach</h1>
              <p className="text-[11px] text-gray-400">YouTube growth strategist</p>
            </div>
          </div>

          {/* Platform pills */}
          <div className="flex gap-1">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <button
                  key={platform.id}
                  onClick={() => platform.available && setSelectedPlatform(platform.id)}
                  disabled={!platform.available}
                  className={`
                    flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all
                    ${selectedPlatform === platform.id && platform.available
                      ? `${platform.color} text-white`
                      : platform.available
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  {Icon ? <Icon className="w-3 h-3" /> : <span className="text-[10px] font-bold">{platform.label}</span>}
                  <span className="hidden md:inline">{platform.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50/30">
          {/* Welcome State */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">What can I help you with?</h2>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
              I have access to your YouTube data + competitor intelligence — ask about your channel, rivals, or growth strategy.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 w-full max-w-xl">
                {smartPrompts.map((prompt, index) => {
                  const Icon = prompt.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.prompt)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all text-xs ${prompt.color}`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">{prompt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`
                w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                ${message.role === 'user'
                  ? 'bg-primary-600'
                  : message.error
                    ? 'bg-red-100'
                    : 'bg-gradient-to-br from-primary-500 to-purple-500'
                }
              `}>
                {message.role === 'user' ? (
                  <span className="text-white font-semibold text-[10px]">You</span>
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                )}
              </div>

              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''} max-w-[85%]`}>
                <div className={`
                  inline-block px-4 py-2.5 rounded-xl text-sm leading-relaxed
                  ${message.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-sm'
                    : message.error
                      ? 'bg-red-50 text-red-900 border border-red-200'
                      : 'bg-white text-gray-900 border border-gray-100 rounded-bl-sm shadow-sm'
                  }
                `}>
                  {message.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div 
                      className="whitespace-pre-wrap coach-response"
                      dangerouslySetInnerHTML={{ __html: formatCoachMessage(message.content) }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.contextUsed && (
                    <p className="text-[10px] text-gray-400">
                      · {message.contextUsed.conversations} convos, {message.contextUsed.platforms?.length || 0} platforms
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100 text-xs text-gray-500 shadow-sm">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Analyzing your data...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick follow-ups */}
        {messages.length > 0 && messages.length < 8 && !loading && (
          <div className="px-4 py-2 bg-white border-t border-gray-50 flex gap-2 flex-wrap">
            {['Go deeper', 'Give me action steps', 'Next video idea'].map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickPrompt(q)}
                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form id="coach-form" onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white rounded-br-xl">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your channel, competitors (@handle), or strategy..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Conversation list item component
function ConversationItem({ conv, active, onSelect, onDelete, timeAgo }) {
  return (
    <div
      onClick={onSelect}
      className={`
        group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm
        ${active 
          ? 'bg-primary-50 text-primary-700 border border-primary-200' 
          : 'hover:bg-gray-50 text-gray-700'
        }
      `}
    >
      <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-primary-500' : 'text-gray-400'}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{conv.title}</p>
        <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
          <Clock className="w-2.5 h-2.5" />
          {timeAgo(conv.updated_at)}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 transition-all"
      >
        <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-500" />
      </button>
    </div>
  )
}
