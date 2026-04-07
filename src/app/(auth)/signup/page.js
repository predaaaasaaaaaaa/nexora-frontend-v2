'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/supabase'

const NexoraLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs><linearGradient id="nLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF0000"/><stop offset="100%" stopColor="#CC0000"/></linearGradient></defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nLG)"/>
  </svg>
)

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); setLoading(false); return }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return }
    try {
      const { data, error } = await signUp(formData.email, formData.password, formData.username)
      if (error) { setError(error.message || 'Failed to create account'); setLoading(false); return }
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (err) { setError('Something went wrong. Please try again.'); setLoading(false) }
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
        <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 18, padding: 40, textAlign: 'center', maxWidth: 400, width: '100%' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(62,166,81,0.1)', border: '1px solid rgba(62,166,81,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3EA651" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Account Created!</h2>
          <p style={{ fontSize: 14, color: '#888' }}>Redirecting to your dashboard...</p>
        </div>
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

      {/* Background */}
      <div className="nx-auth-glow" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)', animation: 'heroGlow 6s ease-in-out infinite', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }}/>

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 2 }}>
        {/* Logo */}
        <Link href="/" className="nx-auth-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 40, textDecoration: 'none', color: '#F1F1F1' }}>
          <NexoraLogo size={40} />
          <span className="nx-auth-logo-text" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>NEXORA</span>
          <span style={{ fontSize: 9, fontWeight: 700, background: '#FF0000', color: '#fff', padding: '2px 7px', borderRadius: 4, letterSpacing: 0.8 }}>BETA</span>
        </Link>

        {/* Card */}
        <div className="nx-auth-card" style={{ background: '#141414', border: '1px solid #222', borderRadius: 18, padding: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FF0000, transparent)', opacity: 0.5 }}/>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Join NEXORA Beta</h1>
            <p style={{ fontSize: 14, color: '#888' }}>Start growing smarter today</p>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', marginBottom: 20, background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.18)', borderRadius: 10, fontSize: 13, color: '#FF4444' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Username */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 6 }}>Username</label>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input type="text" required placeholder="yourname" className="auth-input" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} style={inputStyle} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 6 }}>Email</label>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
                <input type="email" required placeholder="you@example.com" className="auth-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input type="password" required placeholder="••••••••" className="auth-input" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} style={inputStyle} />
              </div>
              <p style={{ fontSize: 11, color: '#666', marginTop: 4 }}>At least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#AAA', marginBottom: 6 }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input type="password" required placeholder="••••••••" className="auth-input" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-btn" style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #FF0000, #CC0000)', color: '#fff',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              opacity: loading ? 0.7 : 1, marginTop: 4,
            }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #222', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#888' }}>
              Already have an account?{' '}
              <Link href="/login" className="auth-link" style={{ color: '#FF0000', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link href="/" className="auth-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>← Back to home</Link>
        </div>
      </div>
    </div>
  )
}