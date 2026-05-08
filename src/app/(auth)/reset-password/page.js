'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { friendlyError } from '@/lib/errors'

const NexoraLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs><linearGradient id="nLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF0000"/><stop offset="100%" stopColor="#CC0000"/></linearGradient></defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nLG)"/>
  </svg>
)

function ResetPasswordPageInner() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validToken, setValidToken] = useState(null) // null = checking, true = valid, false = invalid

  // When the user clicks the email link, Supabase redirects here with a
  // recovery session already established via URL hash. We listen for the
  // PASSWORD_RECOVERY event to confirm we're in a valid reset flow.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidToken(true)
      }
    })

    // Also check if there's already a session (covers reload case)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setValidToken(true)
      else {
        // Give the auth event a moment to fire before declaring invalid
        setTimeout(() => setValidToken(prev => prev === null ? false : prev), 1500)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) {
        setError(friendlyError(error, 'Failed to update password'))
        setLoading(false)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      setError(friendlyError(err))
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px 14px 46px', borderRadius: 12,
    border: '1px solid #2A2A2A', background: '#1A1A1A', color: '#F1F1F1',
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.2s ease', boxSizing: 'border-box',
  }

  // Success state
  if (success) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0A0A0A', color: '#F1F1F1',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        fontFamily: "'Outfit', -apple-system, sans-serif",
      }}>
        <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 18, padding: 40, textAlign: 'center', maxWidth: 440, width: '100%' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(62,166,81,0.1)', border: '1px solid rgba(62,166,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3EA651" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Password updated</h2>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>Redirecting you to sign in...</p>
        </div>
      </div>
    )
  }

  // Invalid/expired token
  if (validToken === false) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0A0A0A', color: '#F1F1F1',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        fontFamily: "'Outfit', -apple-system, sans-serif",
      }}>
        <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 18, padding: 40, textAlign: 'center', maxWidth: 440, width: '100%' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Invalid or expired link</h2>
          <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 24 }}>
            This password reset link is no longer valid. Request a new one to continue.
          </p>
          <Link href="/forgot-password" style={{
            display: 'inline-block', padding: '12px 28px', borderRadius: 12,
            background: 'linear-gradient(135deg, #FF0000, #CC0000)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>Request a new link</Link>
        </div>
      </div>
    )
  }

  // Checking token — brief loading state
  if (validToken === null) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0A0A0A', color: '#888',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Outfit', -apple-system, sans-serif", fontSize: 14,
      }}>
        Verifying reset link...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0A', color: '#F1F1F1',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      fontFamily: "'Outfit', -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes heroGlow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .auth-input:focus { border-color: #FF0000 !important; box-shadow: 0 0 0 3px rgba(255,0,0,0.1); }
        .auth-btn { transition: all 0.2s ease; }
        .auth-btn:hover { transform: scale(1.02); box-shadow: 0 8px 24px rgba(255,0,0,0.3); }
        .auth-link { transition: color 0.15s; }
        .auth-link:hover { color: #FF0000 !important; }
        *, *::before, *::after { box-sizing: border-box; }

        @media (max-width: 768px) {
          .nx-auth-card { padding: 24px 20px !important; }
          .nx-auth-logo { margin-bottom: 28px !important; }
          .nx-auth-logo-text { font-size: 24px !important; }
          .nx-auth-glow { width: 300px !important; height: 300px !important; }
        }
      `}</style>

      <div className="nx-auth-glow" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)', animation: 'heroGlow 6s ease-in-out infinite', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }}/>

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 2 }}>
        <Link href="/" className="nx-auth-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 40, textDecoration: 'none', color: '#F1F1F1' }}>
          <NexoraLogo size={40} />
          <span className="nx-auth-logo-text" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>NEXORA</span>
          <span style={{ fontSize: 9, fontWeight: 700, background: '#FF0000', color: '#fff', padding: '2px 7px', borderRadius: 4, letterSpacing: 0.8 }}>BETA</span>
        </Link>

        <div className="nx-auth-card" style={{ background: '#141414', border: '1px solid #222', borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FF0000, transparent)', opacity: 0.5 }}/>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Set a new password</h1>
            <p style={{ fontSize: 14, color: '#888' }}>Choose a strong password for your account</p>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', marginBottom: 20, background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.18)', borderRadius: 10, fontSize: 13, color: '#FF4444' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 6 }}>New password</label>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input type="password" required placeholder="••••••••" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
              </div>
              <p style={{ fontSize: 11, color: '#666', marginTop: 4 }}>At least 6 characters</p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 6 }}>Confirm new password</label>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input type="password" required placeholder="••••••••" className="auth-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-btn" style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #FF0000, #CC0000)', color: '#fff',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              opacity: loading ? 0.7 : 1, marginTop: 4,
            }}>
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0A0A' }} />}>
      <ResetPasswordPageInner />
    </Suspense>
  )
}