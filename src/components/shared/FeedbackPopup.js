'use client'

import { useState, useEffect } from 'react'
import { X, Star, Send, Sparkles } from 'lucide-react'
import { submitFeedback } from '@/lib/api'

export default function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user has visited all sections
    const visitedSections = JSON.parse(localStorage.getItem('visitedSections') || '[]')
    const allSections = ['dashboard', 'coach', 'scheduler', 'ideas', 'settings']
    
    const hasVisitedAll = allSections.every(section => visitedSections.includes(section))
    const hasGivenFeedback = localStorage.getItem('feedbackGiven') === 'true'

    // Show popup after visiting all sections and not given feedback yet
    if (hasVisitedAll && !hasGivenFeedback) {
      setTimeout(() => setIsOpen(true), 1000)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!rating || !message.trim()) return

    setLoading(true)

    try {
      await submitFeedback(rating, message)
      setSubmitted(true)
      localStorage.setItem('feedbackGiven', 'true')
      
      setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setIsOpen(false)
    // Ask again in 24 hours
    localStorage.setItem('feedbackDismissed', Date.now().toString())
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          // Success State
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your feedback helps us make NEXORA better for everyone.
            </p>
          </div>
        ) : (
          // Feedback Form
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                How's your NEXORA experience?
              </h3>
              <p className="text-gray-600 text-sm">
                We'd love to hear your thoughts on the beta
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Rate your experience
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {rating === 5 && "Amazing! 🎉"}
                    {rating === 4 && "Great! 😊"}
                    {rating === 3 && "Good 👍"}
                    {rating === 2 && "Could be better 😐"}
                    {rating === 1 && "Needs improvement 😔"}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us more (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What did you like? What can we improve?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!rating || loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>

              {/* Skip */}
              <button
                type="button"
                onClick={handleClose}
                className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Maybe later
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

