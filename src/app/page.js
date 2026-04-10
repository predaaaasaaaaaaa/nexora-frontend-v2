'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── NEXORA Logo ──
const NexoraLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs><linearGradient id="nLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF0000"/><stop offset="100%" stopColor="#CC0000"/></linearGradient></defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nLG)"/>
  </svg>
)

// ── Scroll-triggered section ──
function Section({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobilePricingTab, setMobilePricingTab] = useState('pro')

  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (mobileMenuOpen && scrollY > 10) setMobileMenuOpen(false)
  }, [scrollY])

  const features = [
    {
      tag: 'AI-POWERED', title: 'Your personal YouTube growth coach',
      desc: 'Ask anything about your channel, competitors, or strategy. The AI Coach has full access to your YouTube analytics and delivers actionable insights — not generic advice.',
      bullets: ['Channel audits with real data', 'Competitor analysis (@handle)', 'Growth strategies tailored to your niche', 'Video idea generation from your analytics'],
      mockTitle: 'AI Coach',
      mockChat: [
        { role: 'user', text: 'Analyze my channel and find growth opportunities' },
        { role: 'ai', text: 'Based on your analytics: Arabic titles perform 6x better (683 vs 109 avg views). Your challenge/collab format hit 17K views — 28x above average. I recommend doubling down on Arabic-titled challenge content posted Fridays at 19:00.' },
      ],
    },
    {
      tag: 'REAL-TIME DATA', title: 'Analytics that actually tell you what to do',
      desc: 'Not just numbers — AI-detected patterns that reveal what\'s working, what\'s not, and exactly what to change.',
      bullets: ['AI-detected content patterns', 'Viral outlier detection', 'Title language performance', 'Hidden gems identification'],
      mockTitle: 'AI-Detected Patterns',
      mockPatterns: [
        { color: '#4D9EFF', label: 'CONTENT MIX', text: 'Long videos avg 608 views vs Shorts at 190' },
        { color: '#FF8C00', label: 'VIRAL OUTLIERS', text: '2 videos performed 7x above average' },
        { color: '#3EA651', label: 'HIDDEN GEMS', text: '2 videos have high engagement but low reach' },
      ],
    },
    {
      tag: 'SMART SCHEDULING', title: 'Post at the perfect time, every time',
      desc: 'AI-recommended posting times based on your actual channel performance data. Calendar view, email reminders, and full management.',
      bullets: ['Data-driven posting time recommendations', 'Visual calendar with scheduled posts', 'Email reminders before publish time', 'Edit, reschedule, or delete anytime'],
      mockTitle: 'AI Schedule Tips',
      mockTips: ['📈 Post Fridays at 19:00 — avg 5,751 views, 17.23% ER', '🕐 Try 2:00 AM — avg 361 views, 20.52% ER', '🎯 Post at 12:00 — avg 271 views, 23.08% ER'],
    },
    {
      tag: 'CONTENT ENGINE', title: 'Never run out of video ideas',
      desc: 'AI-generated content ideas tailored to your niche, channel performance, and what\'s working for similar creators.',
      bullets: ['Niche-specific idea generation', 'Difficulty & duration estimates', 'Viral potential scoring', 'Hashtag suggestions included'],
      mockTitle: 'Generated Ideas',
      mockIdeas: [
        { title: 'I Built an AI Agent That Runs My Startup for 24h 🤖', diff: 'Medium', potential: 'Very High' },
        { title: '5 Dev Tools That Replaced My Entire Team ⚡', diff: 'Easy', potential: 'High' },
      ],
    },
  ]

  const faqs = [
    { q: 'What is NEXORA?', a: 'NEXORA is an AI-powered YouTube strategy platform that connects to your channel, analyzes your real data, and gives you personalized coaching, content ideas, and scheduling — all from one dashboard.' },
    { q: 'Is NEXORA free?', a: 'Yes — NEXORA is currently in free beta. All features including AI Coach, Analytics, Scheduler, and Content Ideas are available at no cost.' },
    { q: 'How does it connect to my YouTube channel?', a: 'You sign in with Google, authorize YouTube read access, and NEXORA pulls your channel analytics automatically. Your data stays secure with Supabase row-level security.' },
    { q: 'What platforms are supported?', a: 'Currently YouTube is fully supported with live data. Instagram, TikTok, and Threads are on the roadmap.' },
    { q: 'How is NEXORA different from TubeBuddy or VidIQ?', a: 'NEXORA uses AI coaching that understands your specific channel data and gives personalized strategy advice — not just keyword tools. Think of it as having a YouTube growth strategist who knows your exact analytics.' },
    { q: 'Is my data safe?', a: 'Yes. NEXORA uses Supabase with row-level security, three-layer prompt injection protection, and never shares your data.' },
  ]

  return (
    <div style={{ fontFamily: "'Outfit', -apple-system, sans-serif", background: '#0A0A0A', color: '#F1F1F1', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes heroGlow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,0,0,0.3); } 50% { box-shadow: 0 0 0 12px rgba(255,0,0,0); } }
        .hero-text { animation: fadeUp 0.8s ease 0.2s both; }
        .hero-sub { animation: fadeUp 0.8s ease 0.4s both; }
        .hero-cta { animation: fadeUp 0.8s ease 0.6s both; }
        .hero-badge { animation: fadeUp 0.8s ease 0.1s both; }
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: #FF0000 !important; }
        .cta-primary { transition: all 0.2s ease; cursor: pointer; }
        .cta-primary:hover { transform: scale(1.04); box-shadow: 0 8px 30px rgba(255,0,0,0.35); }
        .cta-secondary { transition: all 0.2s ease; cursor: pointer; }
        .cta-secondary:hover { background: rgba(255,255,255,0.1) !important; }
        .faq-item { transition: all 0.3s ease; cursor: pointer; }
        .faq-item:hover { border-color: rgba(255,0,0,0.25) !important; }
        .feature-mock { transition: all 0.3s ease; }
        .feature-mock:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(255,0,0,0.08); }
        html { scroll-behavior: smooth; }

        /* ── Mobile Nav ── */
        @media (max-width: 768px) {
          .nx-nav-links { display: none !important; }
          .nx-nav-mobile-toggle { display: flex !important; }
          .nx-nav { padding: 12px 16px !important; }
          .nx-mobile-menu { display: flex !important; }
        }

        /* ── Mobile Hero ── */
        @media (max-width: 768px) {
          .nx-hero { padding: 100px 20px 60px !important; min-height: auto !important; }
          .nx-hero-title { font-size: 38px !important; letter-spacing: -1.5px !important; }
          .nx-hero-sub { font-size: 15px !important; margin-bottom: 28px !important; }
          .nx-hero-cta { flex-direction: column !important; gap: 10px !important; }
          .nx-hero-cta a { width: 100%; text-align: center; justify-content: center; }
          .nx-hero-glow1 { width: 300px !important; height: 300px !important; }
          .nx-hero-glow2 { display: none !important; }
          .nx-scroll-hint { display: none !important; }
        }

        /* ── Mobile Stats ── */
        @media (max-width: 768px) {
          .nx-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .nx-stats-section { padding: 40px 20px !important; }
          .nx-stat-value { font-size: 36px !important; }
        }

        /* ── Mobile Features ── */
        @media (max-width: 768px) {
          .nx-features-section { padding: 60px 20px !important; }
          .nx-features-heading { font-size: 30px !important; }
          .nx-feature-grid { grid-template-columns: 1fr !important; gap: 30px !important; direction: ltr !important; margin-bottom: 50px !important; }
          .nx-feature-title { font-size: 24px !important; }
        }

        /* ── Mobile How It Works ── */
        @media (max-width: 768px) {
          .nx-hiw-section { padding: 60px 20px !important; }
          .nx-hiw-heading { font-size: 30px !important; }
          .nx-hiw-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile Comparison ── */
        @media (max-width: 768px) {
          .nx-compare-section { padding: 60px 20px !important; }
          .nx-compare-heading { font-size: 26px !important; }
          .nx-compare-row { grid-template-columns: 1fr 60px 60px !important; padding: 12px 14px !important; }
          .nx-compare-feature-text { font-size: 12px !important; }
        }

        /* ── Mobile FAQ ── */
        @media (max-width: 768px) {
          .nx-faq-section { padding: 60px 20px !important; }
          .nx-faq-heading { font-size: 28px !important; }
          .nx-faq-q { font-size: 14px !important; }
        }

        /* ── Mobile Pricing ── */
        @media (max-width: 768px) {
          .nx-pricing-section { padding: 60px 20px !important; }
          .nx-pricing-heading { font-size: 30px !important; }
          .nx-pricing-grid { display: none !important; }
          .nx-pricing-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .nx-pricing-mobile { display: none !important; }
        }

        /* ── Mobile Final CTA ── */
        @media (max-width: 768px) {
          .nx-final-cta { padding: 60px 20px !important; }
          .nx-final-heading { font-size: 30px !important; }
        }

        /* ── Mobile Footer ── */
        @media (max-width: 768px) {
          .nx-footer { flex-direction: column !important; gap: 16px !important; padding: 24px 20px !important; text-align: center; }
          .nx-footer-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav className="nx-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 40px',
        background: scrollY > 60 || mobileMenuOpen ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrollY > 60 || mobileMenuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.35s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NexoraLogo size={32} />
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>NEXORA</span>
          <span style={{ fontSize: 9, fontWeight: 700, background: '#FF0000', color: '#fff', padding: '2px 7px', borderRadius: 4, letterSpacing: 0.8 }}>BETA</span>
        </div>

        {/* Desktop nav links */}
        <div className="nx-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'How it works', 'Pricing', 'FAQ', 'Blog'].map((item, i) => (
            <a key={i} className="nav-link" href={item === 'Blog' ? '/blog' : `#${item.toLowerCase().replace(/ /g, '-')}`} style={{ fontSize: 14, fontWeight: 500, color: '#AAA', textDecoration: 'none' }}>{item}</a>
          ))}
          <Link href="/login" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: '#AAA', textDecoration: 'none' }}>Login</Link>
          <Link href="/signup" className="cta-primary" style={{
            padding: '10px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #FF0000, #CC0000)',
            border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>Get Started Free</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nx-nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 8, border: '1px solid #333',
            background: 'transparent', color: '#F1F1F1', cursor: 'pointer',
          }}
        >
          {mobileMenuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </nav>

      {/* ═══ MOBILE MENU ═══ */}
      {mobileMenuOpen && (
        <div className="nx-mobile-menu" style={{
          display: 'none', position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexDirection: 'column', padding: '12px 20px 20px', gap: 4,
        }}>
          {['Features', 'How it works', 'Pricing', 'FAQ', 'Blog'].map((item, i) => (
            <a key={i} href={item === 'Blog' ? '/blog' : `#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 500, color: '#AAA', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{item}</a>
          ))}
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: 15, fontWeight: 500, color: '#AAA', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Login</Link>
          <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="cta-primary" style={{
            marginTop: 8, padding: '14px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #FF0000, #CC0000)',
            border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
          }}>Get Started Free</Link>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section className="nx-hero" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', position: 'relative', padding: '120px 24px 80px', overflow: 'hidden',
      }}>
        <div className="nx-hero-glow1" style={{ position: 'absolute', top: '20%', left: '50%', transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)`, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.12) 0%, transparent 70%)', animation: 'heroGlow 6s ease-in-out infinite', pointerEvents: 'none' }}/>
        <div className="nx-hero-glow2" style={{ position: 'absolute', top: '10%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%)', animation: 'heroGlow 8s ease-in-out infinite 2s', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', opacity: 0.5 }}/>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 50, background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.2)', marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3EA651', animation: 'pulse 2s infinite' }}/>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#FF6666' }}>Free Beta — All features unlocked</span>
          </div>

          <h1 className="hero-text nx-hero-title" style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, marginBottom: 24 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Your AI-powered</span><br/>
            <span style={{ color: '#FFFFFF' }}>YouTube growth</span><br/>
            <span style={{ background: 'linear-gradient(135deg, #FF0000, #FF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>strategist.</span>
          </h1>

          <p className="hero-sub nx-hero-sub" style={{ fontSize: 19, color: '#888', lineHeight: 1.6, maxWidth: 560, margin: '0 auto 36px', fontWeight: 400 }}>
            Connect your YouTube channel. Get AI coaching, analytics insights, content ideas, and smart scheduling — all powered by your real data.
          </p>

          <div className="hero-cta nx-hero-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <Link href="/signup" className="cta-primary" style={{
              padding: '16px 36px', borderRadius: 12, background: 'linear-gradient(135deg, #FF0000, #CC0000)',
              border: 'none', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
              Start Growing — It's Free
            </Link>
            <a href="#features" className="cta-secondary" style={{
              padding: '16px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)', color: '#ccc', fontSize: 16, fontWeight: 500, textDecoration: 'none',
            }}>See how it works ↓</a>
          </div>
        </div>

        <div className="nx-scroll-hint" style={{ position: 'absolute', bottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: scrollY > 100 ? 0 : 0.5, transition: 'opacity 0.3s ease' }}>
          <span style={{ fontSize: 12, color: '#666', letterSpacing: 2, fontWeight: 500 }}>SCROLL</span>
          <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, #666, transparent)' }}/>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <Section>
        <section className="nx-stats-section" style={{ padding: '50px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="nx-stats-grid" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { value: '5', unit: '', label: 'Core AI features', color: '#FF0000' },
              { value: '100', unit: '%', label: 'Free during beta', color: '#3EA651' },
              { value: '0', unit: '', label: 'Cloud cost for your data', color: '#4D9EFF' },
              { value: '24/7', unit: '', label: 'AI Coach available', color: '#FF8C00' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="nx-stat-value" style={{ fontSize: 48, fontWeight: 900, color: s.color, letterSpacing: -2, lineHeight: 1 }}>{s.value}<span style={{ fontSize: 28, fontWeight: 700 }}>{s.unit}</span></div>
                <div style={{ fontSize: 14, color: '#888', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="nx-features-section" style={{ padding: '80px 40px' }}>
        <Section>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 60px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#FF0000', display: 'block', marginBottom: 12 }}>FEATURES</span>
            <h2 className="nx-features-heading" style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>Everything you need to<br/><span style={{ color: '#FF0000' }}>grow on YouTube</span></h2>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.6 }}>No fluff. No generic tips. Real AI coaching powered by your actual channel data.</p>
          </div>
        </Section>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {features.map((f, i) => (
            <Section key={i} delay={0.1}>
              <div className="nx-feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 80, direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
                <div style={{ direction: 'ltr' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#FF0000', display: 'inline-block', padding: '4px 12px', borderRadius: 5, background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.15)', marginBottom: 16 }}>{f.tag}</span>
                  <h3 className="nx-feature-title" style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, lineHeight: 1.15, marginBottom: 14 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: '#999', lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {f.bullets.map((b, bi) => (
                      <div key={bi} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize: 14, color: '#ccc' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ direction: 'ltr' }}>
                  <div className="feature-mock" style={{ background: '#141414', border: '1px solid #222', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}/><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }}/><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}/>
                      <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, color: '#888' }}>{f.mockTitle}</span>
                    </div>
                    <div style={{ padding: 20 }}>
                      {f.mockChat?.map((msg, mi) => (
                        <div key={mi} style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', marginBottom: 14 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: msg.role === 'user' ? '#FF0000' : 'linear-gradient(135deg, #FF0000, #CC0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{msg.role === 'user' ? 'Y' : '✦'}</div>
                          <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 10, background: msg.role === 'user' ? '#FF0000' : '#1E1E1E', color: '#fff', fontSize: 12, lineHeight: 1.5 }}>{msg.text}</div>
                        </div>
                      ))}
                      {f.mockPatterns?.map((p, pi) => (
                        <div key={pi} style={{ padding: '12px 16px', marginBottom: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid #222', borderRadius: 10, borderLeft: `3px solid ${p.color}` }}>
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: p.color, display: 'block', marginBottom: 3 }}>{p.label}</span>
                          <span style={{ fontSize: 12, color: '#ccc' }}>{p.text}</span>
                        </div>
                      ))}
                      {f.mockTips?.map((t, ti) => (
                        <div key={ti} style={{ padding: '12px 16px', marginBottom: 8, background: 'rgba(255,0,0,0.04)', border: '1px solid rgba(255,0,0,0.12)', borderRadius: 10, fontSize: 13, color: '#ddd' }}>{t}</div>
                      ))}
                      {f.mockIdeas?.map((idea, ii) => (
                        <div key={ii} style={{ padding: '14px 16px', marginBottom: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid #222', borderRadius: 10 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#F1F1F1', marginBottom: 6 }}>{idea.title}</div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: idea.diff === 'Easy' ? 'rgba(62,166,81,0.1)' : 'rgba(255,140,0,0.1)', border: `1px solid ${idea.diff === 'Easy' ? 'rgba(62,166,81,0.2)' : 'rgba(255,140,0,0.2)'}`, color: idea.diff === 'Easy' ? '#3EA651' : '#FF8C00', fontWeight: 600 }}>{idea.diff}</span>
                            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: 'rgba(62,166,81,0.1)', border: '1px solid rgba(62,166,81,0.2)', color: '#3EA651', fontWeight: 600 }}>⚡ {idea.potential}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="nx-hiw-section" style={{ padding: '80px 40px', background: 'linear-gradient(180deg, rgba(255,0,0,0.02) 0%, transparent 100%)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Section>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 50px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#FF0000', display: 'block', marginBottom: 12 }}>HOW IT WORKS</span>
            <h2 className="nx-hiw-heading" style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1 }}>Three steps to<br/><span style={{ color: '#FF0000' }}>smarter growth</span></h2>
          </div>
        </Section>
        <div className="nx-hiw-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { step: '01', title: 'Connect YouTube', desc: 'Sign in with Google and authorize read access. NEXORA pulls your analytics automatically.', icon: '🔗' },
            { step: '02', title: 'Get AI Insights', desc: 'Your AI Coach analyzes patterns, detects viral content, and finds hidden growth opportunities.', icon: '⚡' },
            { step: '03', title: 'Grow Smarter', desc: 'Use data-driven scheduling, tailored content ideas, and competitor intelligence to grow faster.', icon: '🚀' },
          ].map((s, i) => (
            <Section key={i} delay={i * 0.15}>
              <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 16, padding: '32px 28px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #FF0000, transparent)', opacity: 0.5 }}/>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#FF0000', letterSpacing: 2, display: 'block', marginBottom: 8 }}>STEP {s.step}</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* ═══ COMPARISON ═══ */}
      <Section>
        <section className="nx-compare-section" style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
            <h2 className="nx-compare-heading" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Why creators choose <span style={{ color: '#FF0000' }}>NEXORA</span></h2>
            <p style={{ fontSize: 15, color: '#888' }}>AI-first approach vs traditional keyword tools</p>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 16, overflow: 'hidden' }}>
              <div className="nx-compare-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', padding: '16px 24px', borderBottom: '1px solid #222' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#888' }}>Feature</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#FF0000', textAlign: 'center' }}>NEXORA</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#888', textAlign: 'center' }}>Others</span>
              </div>
              {['AI Coach with your data', 'Personalized content ideas', 'Smart scheduling with AI tips', 'Viral outlier detection', 'Competitor @handle analysis', 'Free during beta'].map((f, i) => (
                <div key={i} className="nx-compare-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', padding: '14px 24px', borderBottom: i < 5 ? '1px solid #1A1A1A' : 'none' }}>
                  <span className="nx-compare-feature-text" style={{ fontSize: 14, color: '#ccc' }}>{f}</span>
                  <div style={{ textAlign: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3EA651" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <div style={{ textAlign: 'center' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="nx-faq-section" style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Section>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#FF0000', display: 'block', marginBottom: 12 }}>FAQ</span>
            <h2 className="nx-faq-heading" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>Frequently Asked Questions</h2>
          </div>
        </Section>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <Section key={i} delay={i * 0.05}>
              <div className="faq-item" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{ background: '#141414', border: `1px solid ${openFaq === i ? 'rgba(255,0,0,0.2)' : '#222'}`, borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="nx-faq-q" style={{ fontSize: 16, fontWeight: 600 }}>{faq.q}</span>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: openFaq === i ? 'rgba(255,0,0,0.15)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: openFaq === i ? '#FF0000' : '#888', fontSize: 14, fontWeight: 700, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.3s ease', flexShrink: 0 }}>▾</div>
                </div>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                  <p style={{ padding: '0 24px 18px', fontSize: 14, color: '#999', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="nx-pricing-section" style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Section>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 50px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#FF0000', display: 'block', marginBottom: 12 }}>PRICING</span>
            <h2 className="nx-pricing-heading" style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 16 }}>Choose your plan</h2>
            <p style={{ fontSize: 16, color: '#888', lineHeight: 1.6 }}>Start free. Upgrade when you're ready. Cancel anytime.</p>
          </div>
        </Section>
        <div className="nx-pricing-grid" style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { id: 'free', name: 'Starter', price: 0, desc: 'See the value. Get hooked. Want more.', badge: null, featured: false, features: [
              { text: 'Basic dashboard (7-day data)', ok: true },
              { text: '5 AI Coach messages/day', ok: 'limit' },
              { text: 'No conversation history', ok: false },
              { text: '3 content ideas/week', ok: 'limit' },
              { text: 'No content scheduler', ok: false },
              { text: 'No competitor analysis', ok: false },
            ]},
            { id: 'pro', name: 'Nexora Pro', price: 19, desc: 'Everything you need to grow seriously.', badge: 'Most popular', featured: true, features: [
              { text: 'Full dashboard (90-day data)', ok: true },
              { text: '15 AI Coach messages/day', ok: true },
              { text: 'Conversation history (saved)', ok: true },
              { text: '30 content ideas/week', ok: true },
              { text: 'Content scheduler + reminders', ok: true },
              { text: 'Track 3 competitors', ok: 'limit' },
            ]},
            { id: 'max', name: 'Nexora Max', price: 49, desc: 'Full power. Zero limits. Total control.', badge: 'For serious creators', featured: false, features: [
              { text: 'Full dashboard (all-time data)', ok: true },
              { text: 'Unlimited AI Coach messages', ok: true },
              { text: 'Full conversation history', ok: true },
              { text: 'Unlimited content ideas', ok: true },
              { text: 'Content scheduler + reminders', ok: true },
              { text: 'Track 10 competitors', ok: true },
            ]},
          ].map((plan, i) => (
            <Section key={plan.id} delay={i * 0.1}>
              <div style={{
                background: '#141414', borderRadius: 16, padding: '28px 24px',
                border: plan.featured ? '2px solid #FF0000' : '1px solid #222',
                display: 'flex', flexDirection: 'column', height: '100%',
              }}>
                {plan.badge && (
                  <span style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 6, marginBottom: 14, alignSelf: 'flex-start',
                    background: plan.featured ? 'rgba(255,0,0,0.12)' : 'rgba(255,255,255,0.06)',
                    color: plan.featured ? '#FF4444' : '#AAA',
                  }}>{plan.badge}</span>
                )}
                {!plan.badge && <div style={{ height: 29 }} />}
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 700 }}>${plan.price}</span>
                  <span style={{ fontSize: 14, color: '#717171' }}>/month</span>
                </div>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{plan.desc}</p>
                <div style={{ height: 1, background: '#222', marginBottom: 20 }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                  {plan.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: f.ok === false ? '#555' : '#CCC', marginBottom: 10, lineHeight: 1.4 }}>
                      <span style={{ fontSize: 12, width: 16, textAlign: 'center', flexShrink: 0, color: f.ok === true ? '#3EA651' : f.ok === 'limit' ? '#EF9F27' : '#555' }}>
                        {f.ok === true ? '✓' : f.ok === 'limit' ? '~' : '✗'}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={plan.featured ? 'cta-primary' : 'cta-secondary'} style={{
                  marginTop: 24, width: '100%', padding: '12px 0', borderRadius: 10, textAlign: 'center', textDecoration: 'none', fontSize: 14, fontWeight: 600, display: 'block',
                  background: plan.featured ? 'linear-gradient(135deg, #FF0000, #CC0000)' : 'transparent',
                  border: plan.featured ? 'none' : '1px solid #2A2A2A',
                  color: '#F1F1F1',
                }}>{plan.id === 'free' ? 'Start Free' : 'Subscribe now'}</Link>
              </div>
            </Section>
          ))}
        </div>

        {/* ── Mobile: ChatGPT-style tab bar ── */}
        {(() => {
          const pricingPlans = [
            { id: 'free', name: 'Starter', price: 0, desc: 'See the value. Get hooked. Want more.', badge: null, featured: false, features: [
              { text: 'Basic dashboard (7-day data)', ok: true },
              { text: '5 AI Coach messages/day', ok: 'limit' },
              { text: 'No conversation history', ok: false },
              { text: '3 content ideas/week', ok: 'limit' },
              { text: 'No content scheduler', ok: false },
              { text: 'No competitor analysis', ok: false },
            ]},
            { id: 'pro', name: 'Nexora Pro', price: 19, desc: 'Everything you need to grow seriously.', badge: 'Most popular', featured: true, features: [
              { text: 'Full dashboard (90-day data)', ok: true },
              { text: '15 AI Coach messages/day', ok: true },
              { text: 'Conversation history (saved)', ok: true },
              { text: '30 content ideas/week', ok: true },
              { text: 'Content scheduler + reminders', ok: true },
              { text: 'Track 3 competitors', ok: 'limit' },
            ]},
            { id: 'max', name: 'Nexora Max', price: 49, desc: 'Full power. Zero limits. Total control.', badge: 'For serious creators', featured: false, features: [
              { text: 'Full dashboard (all-time data)', ok: true },
              { text: 'Unlimited AI Coach messages', ok: true },
              { text: 'Full conversation history', ok: true },
              { text: 'Unlimited content ideas', ok: true },
              { text: 'Content scheduler + reminders', ok: true },
              { text: 'Track 10 competitors', ok: true },
            ]},
          ]
          const activePlan = pricingPlans.find(p => p.id === mobilePricingTab)
          return (
            <div className="nx-pricing-mobile" style={{ display: 'none', maxWidth: 500, margin: '0 auto' }}>
              <div style={{ display: 'flex', background: '#1A1A1A', borderRadius: 12, padding: 4, marginBottom: 24, border: '1px solid #2A2A2A' }}>
                {pricingPlans.map((plan) => (
                  <button key={plan.id} onClick={() => setMobilePricingTab(plan.id)} style={{
                    flex: 1, padding: '12px 0', borderRadius: 10, border: 'none',
                    background: mobilePricingTab === plan.id ? (plan.featured ? '#FF0000' : '#2A2A2A') : 'transparent',
                    color: mobilePricingTab === plan.id ? '#fff' : '#888',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease',
                  }}>
                    {plan.name === 'Nexora Pro' ? 'Pro' : plan.name === 'Nexora Max' ? 'Max' : plan.name}
                  </button>
                ))}
              </div>
              {activePlan && (
                <div style={{
                  background: '#141414', borderRadius: 16, padding: '28px 24px',
                  border: activePlan.featured ? '2px solid #FF0000' : '1px solid #222',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {activePlan.badge && (
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 6, marginBottom: 14, alignSelf: 'flex-start', background: activePlan.featured ? 'rgba(255,0,0,0.12)' : 'rgba(255,255,255,0.06)', color: activePlan.featured ? '#FF4444' : '#AAA' }}>{activePlan.badge}</span>
                  )}
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{activePlan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                    <span style={{ fontSize: 42, fontWeight: 800 }}>${activePlan.price}</span>
                    <span style={{ fontSize: 15, color: '#717171' }}>/month</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>{activePlan.desc}</p>
                  <div style={{ height: 1, background: '#222', marginBottom: 20 }} />
                  <div style={{ background: '#0F0F0F', borderRadius: 12, border: '1px solid #222', overflow: 'hidden', marginBottom: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px', padding: '12px 16px', borderBottom: '1px solid #222' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#888' }}>Features</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: activePlan.featured ? '#FF0000' : '#F1F1F1', textAlign: 'center' }}>
                        {activePlan.name === 'Nexora Pro' ? 'Pro' : activePlan.name === 'Nexora Max' ? 'Max' : '✓'}
                      </span>
                    </div>
                    {activePlan.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'grid', gridTemplateColumns: '1fr 50px', padding: '12px 16px', borderBottom: fi < activePlan.features.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                        <span style={{ fontSize: 13, color: f.ok === false ? '#555' : '#CCC', lineHeight: 1.4 }}>{f.text}</span>
                        <div style={{ textAlign: 'center' }}>
                          {f.ok === true ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activePlan.featured ? '#FF0000' : '#3EA651'} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> : f.ok === 'limit' ? <span style={{ fontSize: 14, color: '#EF9F27' }}>~</span> : <span style={{ fontSize: 14, color: '#555' }}>—</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/signup" style={{
                    width: '100%', padding: '16px 0', borderRadius: 12, textAlign: 'center', textDecoration: 'none', display: 'block',
                    fontSize: 16, fontWeight: 700,
                    background: activePlan.featured ? 'linear-gradient(135deg, #FF0000, #CC0000)' : '#2A2A2A',
                    border: 'none', color: '#F1F1F1',
                  }}>{activePlan.id === 'free' ? 'Start Free' : 'Subscribe now'}</Link>
                </div>
              )}
            </div>
          )
        })()}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#555', marginTop: 20 }}>Payments handled securely by Paddle. Cancel anytime.</p>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <Section>
        <section className="nx-final-cta" style={{ padding: '100px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}/>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="nx-final-heading" style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, marginBottom: 16 }}>Ready to grow <span style={{ color: '#FF0000' }}>smarter</span>?</h2>
            <p style={{ fontSize: 17, color: '#888', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>Join the beta. Connect your YouTube channel. Let AI do the strategy.</p>
            <Link href="/signup" className="cta-primary" style={{
              padding: '18px 40px', borderRadius: 14, background: 'linear-gradient(135deg, #FF0000, #CC0000)',
              border: 'none', color: '#fff', fontSize: 18, fontWeight: 700, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
              Get Started — Free Beta
            </Link>
            <p style={{ fontSize: 13, color: '#555', marginTop: 14 }}>No credit card required · YouTube read-only access</p>
          </div>
        </section>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer className="nx-footer" style={{ padding: '30px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NexoraLogo size={22} />
          <span style={{ fontSize: 14, fontWeight: 700 }}>NEXORA</span>
          <span style={{ fontSize: 13, color: '#555', marginLeft: 8 }}>© 2026</span>
        </div>
        <div className="nx-footer-links" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#555' }}>
          <Link href="/ai-transparency" style={{ color: '#555', textDecoration: 'none' }}>AI Transparency</Link>
          <span>·</span>
          <Link href="/privacy" style={{ color: '#555', textDecoration: 'none' }}>Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" style={{ color: '#555', textDecoration: 'none' }}>Terms of Service</Link>
          <span>·</span>
          <Link href="/blog" style={{ color: '#555', textDecoration: 'none' }}>Blog</Link>
        </div>
      </footer>
    </div>
  )
}