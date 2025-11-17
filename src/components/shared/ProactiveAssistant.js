'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X, Maximize2, Minimize2 } from 'lucide-react'

export default function ProactiveAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // Simulate proactive suggestions based on time on page
    const timer = setTimeout(() => {
      triggerSuggestion()
    }, 10000) // Show suggestion after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  function triggerSuggestion() {
    const suggestions = [
      {
        title: "I've been analyzing your Instagram performance",
        content: "Your Reels are getting 40% more engagement than carousels. Want to focus more on video content?",
        action: "Show me insights"
      },
      {
        title: "Optimal posting time detected",
        content: "Your audience is most active right now! This is a great time to post on Instagram.",
        action: "View schedule"
      },
      {
        title: "Content idea opportunity",
        content: "Based on your recent engagement spike, I have 5 content ideas that could go viral. Want to see them?",
        action: "Generate ideas"
      },
      {
        title: "Engagement drop noticed",
        content: "Your Instagram engagement dropped 25% this week. I've identified 3 quick fixes you can implement today.",
        action: "See recommendations"
      }
    ]

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setMessage(randomSuggestion)
    setIsOpen(true)
  }

  if (!message) return null

  return (
    <div className={`
      fixed z-50 transition-all duration-300 ease-in-out
      ${isMinimized 
        ? 'bottom-6 right-6' 
        : 'bottom-6 right-6'
      }
    `}>
      {/* Minimized Button */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow animate-pulse"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Full Assistant Card */}
      {!isMinimized && isOpen && (
        <div className="w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">AI Assistant</span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{message.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{message.content}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                {message.action}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Dismiss
              </button>
            </div>

            {/* Powered by indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <Sparkles className="w-3 h-3" />
              <span>Powered by NEXORA Unified AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

