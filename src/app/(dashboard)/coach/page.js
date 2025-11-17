'use client'

import { useState, useRef, useEffect } from 'react'
import { chatWithCoach } from '@/lib/api'
import { Send, Sparkles, Loader2, Instagram, Youtube, Twitter, Video } from 'lucide-react'

export default function CoachPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI coach. I've analyzed your content across all platforms and I'm here to help you grow smarter. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!input.trim() || loading) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await chatWithCoach(input, selectedPlatform)
      
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        contextUsed: response.contextUsed
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
        error: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { id: 'tiktok', name: 'TikTok', icon: Video, color: 'text-gray-900' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-500' },
  ]

  const quickQuestions = [
    "How can I improve my engagement?",
    "What's the best time to post?",
    "Give me content ideas",
    "Why is my reach dropping?",
  ]

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary-600" />
          AI Coach
        </h1>
        <p className="text-gray-600 mt-2">
          Get personalized advice from your intelligent AI coach
        </p>
      </div>

      {/* Platform Selector */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Talking about:</p>
        <div className="flex gap-2 flex-wrap">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                  ${selectedPlatform === platform.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${selectedPlatform === platform.id ? 'text-white' : platform.color}`} />
                {platform.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${message.role === 'user' 
                  ? 'bg-primary-100' 
                  : message.error 
                    ? 'bg-red-100'
                    : 'bg-gradient-to-br from-primary-500 to-purple-500'
                }
              `}>
                {message.role === 'user' ? (
                  <span className="text-primary-700 font-semibold text-sm">You</span>
                ) : (
                  <Sparkles className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                <div className={`
                  inline-block max-w-3xl px-4 py-3 rounded-lg
                  ${message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : message.error
                      ? 'bg-red-50 text-red-900 border border-red-200'
                      : 'bg-gray-100 text-gray-900'
                  }
                `}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Context Info */}
                  {message.contextUsed && (
                    <div className="mt-3 pt-3 border-t border-gray-300/30 text-xs opacity-70">
                      <p>
                        Used context: {message.contextUsed.conversations} conversations, 
                        {message.contextUsed.platforms?.length || 0} platforms
                      </p>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-4 py-3 rounded-lg bg-gray-100">
                  <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions (show only at start) */}
        {messages.length === 1 && (
          <div className="px-6 pb-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI coach anything..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="btn-primary px-6 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

