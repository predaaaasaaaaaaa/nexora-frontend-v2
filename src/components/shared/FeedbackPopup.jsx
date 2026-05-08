'use client'

import { useState, useEffect } from 'react'
import { submitFeedback } from '@/lib/api'
import { STORAGE_KEYS, getItem, setItem } from '@/lib/storage'

export default function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let visitedSections = []
    try { visitedSections = JSON.parse(getItem(STORAGE_KEYS.VISITED_SECTIONS) || '[]') } catch {}
    const allSections = ['dashboard', 'coach', 'scheduler', 'ideas', 'settings']
    const hasVisitedAll = allSections.every(section => visitedSections.includes(section))
    const hasGivenFeedback = getItem(STORAGE_KEYS.FEEDBACK_GIVEN) === 'true'
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
      setItem(STORAGE_KEYS.FEEDBACK_GIVEN, 'true')
      setTimeout(() => setIsOpen(false), 2500)
    } catch (error) {
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setIsOpen(false)
    setItem(STORAGE_KEYS.FEEDBACK_DISMISSED, Date.now().toString())
  }

  if (!isOpen) return null

  const ratingLabels = { 1: 'Needs improvement', 2: 'Could be better', 3: 'Good', 4: 'Great!', 5: 'Amazing! 🎉' }
  const activeRating = hoveredRating || rating

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <div style={{
        background: '#111', border: '1px solid #2A2A2A',
        borderRadius: 20, width: '100%', maxWidth: 440,
        padding: 32, position: 'relative',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,0,0,0.08)',
        animation: 'popIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}>
        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.92) translateY(12px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .star-btn { background: none; border: none; cursor: pointer; padding: 4px; transition: transform 0.12s ease; }
          .star-btn:hover { transform: scale(1.2); }
          .feedback-textarea {
            width: 100%; background: #1A1A1A; border: 1.5px solid #2A2A2A;
            border-radius: 12px; padding: 14px 16px;
            color: #F1F1F1; font-size: 14px; font-family: inherit;
            resize: none; outline: none; line-height: 1.6;
            transition: border-color 0.2s ease; box-sizing: border-box;
          }
          .feedback-textarea::placeholder { color: #555; }
          .feedback-textarea:focus { border-color: rgba(255,0,0,0.5); }
          .submit-btn {
            width: 100%; padding: 14px; border-radius: 12px; border: none;
            background: #FF0000; color: #fff; font-size: 14px; font-weight: 700;
            cursor: pointer; font-family: inherit; letter-spacing: 0.3px;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: all 0.15s ease;
          }
          .submit-btn:hover:not(:disabled) { background: #CC0000; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,0,0,0.3); }
          .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
          .skip-btn {
            width: 100%; background: none; border: none; color: #666; font-size: 13px;
            cursor: pointer; font-family: inherit; padding: 8px; transition: color 0.15s;
          }
          .skip-btn:hover { color: #999; }
        `}</style>

        {/* Close button */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: '#1A1A1A', border: '1px solid #2A2A2A',
          borderRadius: 8, width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#666', transition: 'color 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#F1F1F1'}
          onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {submitted ? (
          // ── Success State ──
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: 'linear-gradient(135deg, #FF0000, #CC0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', boxShadow: '0 0 40px rgba(255,0,0,0.25)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#F1F1F1', marginBottom: 8 }}>Thank You!</h3>
            <p style={{ fontSize: 14, color: '#AAA', lineHeight: 1.6 }}>
              Your feedback helps us make NEXORA better for everyone.
            </p>
          </div>
        ) : (
          // ── Feedback Form ──
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', boxShadow: '0 0 30px rgba(255,0,0,0.2)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F1F1F1', marginBottom: 6 }}>
                How's your NEXORA experience?
              </h3>
              <p style={{ fontSize: 13, color: '#717171' }}>
                We'd love to hear your thoughts on the beta
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Star Rating */}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#AAA', textAlign: 'center', marginBottom: 12 }}>
                  Rate your experience
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24"
                        fill={star <= activeRating ? '#FFD600' : 'none'}
                        stroke={star <= activeRating ? '#FFD600' : '#333'}
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                  ))}
                </div>
                {activeRating > 0 && (
                  <p style={{ textAlign: 'center', fontSize: 12, color: '#AAA', marginTop: 8, minHeight: 18 }}>
                    {ratingLabels[activeRating]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 8 }}>
                  Tell us more (optional)
                </label>
                <textarea
                  className="feedback-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What did you like? What can we improve?"
                  rows={4}
                />
              </div>

              {/* Submit */}
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!rating || loading}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite',
                    }}/>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                    Submit Feedback
                  </>
                )}
              </button>

              <button className="skip-btn" type="button" onClick={handleClose}>
                Maybe later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}