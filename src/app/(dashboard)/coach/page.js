'use client'

import { useState, useRef, useEffect } from 'react'
import { chatWithCoach, listCoachConversations, getCoachMessages, deleteCoachConversation, getYouTubeStatus, getCurrentPlan } from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'
import UpgradePrompt from '@/components/shared/UpgradePrompt'

const themes = {
  dark: {
    card: '#1A1A1A', cardHover: '#222', text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)', redGlow: 'rgba(255,0,0,0.12)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    chip: '#2A2A2A', chipActive: '#FF0000', chipActiveText: '#fff',
    userBubble: '#FF0000', userBubbleText: '#fff',
    aiBubble: '#1A1A1A', aiBubbleText: '#F1F1F1',
    inputBg: '#1A1A1A', inputBorder: '#2A2A2A',
    histBg: '#161616', histHover: '#1E1E1E', histActive: '#222',
    warnBg: 'rgba(255,140,0,0.08)', warnBorder: 'rgba(255,140,0,0.25)', warnText: '#FF8C00',
    overlay: 'rgba(0,0,0,0.6)',
  },
  light: {
    card: '#FFFFFF', cardHover: '#F5F5F5', text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)', redGlow: 'rgba(255,0,0,0.06)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    chip: '#F2F2F2', chipActive: '#FF0000', chipActiveText: '#fff',
    userBubble: '#FF0000', userBubbleText: '#fff',
    aiBubble: '#F2F2F2', aiBubbleText: '#0F0F0F',
    inputBg: '#FFFFFF', inputBorder: '#E5E5E5',
    histBg: '#FAFAFA', histHover: '#F2F2F2', histActive: '#EDEDED',
    warnBg: 'rgba(255,140,0,0.06)', warnBorder: 'rgba(255,140,0,0.2)', warnText: '#E67E00',
    overlay: 'rgba(0,0,0,0.4)',
  },
}

const I = {
  Sparkle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Chat: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Trash: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  Clock: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  BarChart: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  TrendUp: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Bulb: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>,
  Eye: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Target: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Users: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  Video: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="15" height="16" rx="2"/><polygon points="22 8 17 12 22 16 22 8"/></svg>,
  YouTube: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.7A11.87 11.87 0 0012 3.5a11.87 11.87 0 00-3.82.49 4.83 4.83 0 01-3.77 2.7A4.78 4.78 0 002 11.5v1a4.78 4.78 0 002.41 4.31 4.83 4.83 0 013.77 2.7 11.87 11.87 0 003.82.49 11.87 11.87 0 003.82-.49 4.83 4.83 0 013.77-2.7A4.78 4.78 0 0022 12.5v-1a4.78 4.78 0 00-2.41-4.81zM10 15.5v-7l6 3.5z"/></svg>,
  Warning: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  PanelLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
}

const DATA_DEPENDENT_PROMPTS = ['channel audit','my channel','my data','my video','my analytics','my subscribers','my views','my engagement','my performance','give me action steps','go deeper','next video idea','growth strategy','audience insights','video review','how am i doing','my latest','my stats','my top']
function requiresYouTubeData(msg) { const l = msg.toLowerCase(); return DATA_DEPENDENT_PROMPTS.some(p => l.includes(p)) }

export default function CoachPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [conversations, setConversations] = useState([])
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [ytConnected, setYtConnected] = useState(null)
  const [userPlan, setUserPlan] = useState(null)
  const [upgradePrompt, setUpgradePrompt] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { dark } = useTheme()
  const c = dark ? themes.dark : themes.light

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages])
  useEffect(() => { loadConversations(); checkYouTubeStatus(); loadPlanInfo() }, [])
  useEffect(() => { if (!loadingHistory) inputRef.current?.focus() }, [loadingHistory, activeConversationId])

  async function loadPlanInfo() { try { const r = await getCurrentPlan(); if (r.success) setUserPlan(r) } catch {} }
  async function checkYouTubeStatus() { try { const d = await getYouTubeStatus(); setYtConnected(d.connected === true) } catch { setYtConnected(false) } }
  async function loadConversations() {
    try { setLoadingHistory(true); const d = await listCoachConversations(); if (d.limitReached) { setConversations([]); return }; setConversations(d.conversations || []) }
    catch {} finally { setLoadingHistory(false) }
  }
  async function loadMessages(id) {
    try { setLoading(true); const d = await getCoachMessages(id); if (d.limitReached) return
      setMessages((d.messages||[]).map(m => ({ role: m.role, content: m.content, timestamp: new Date(m.created_at), contextUsed: m.context_used })))
      setActiveConversationId(id); setHistoryOpen(false)
    } catch {} finally { setLoading(false) }
  }
  function handleNewChat() { setMessages([]); setActiveConversationId(null); setUpgradePrompt(null); setHistoryOpen(false); inputRef.current?.focus() }
  async function handleDeleteConversation(e, id) {
    e.stopPropagation(); if (!confirm('Delete this conversation?')) return
    try { await deleteCoachConversation(id); setConversations(p => p.filter(c => c.id !== id)); if (activeConversationId === id) handleNewChat() } catch {}
  }
  async function handleSubmit(e) {
    e.preventDefault(); if (!input.trim() || loading) return
    if (!ytConnected && requiresYouTubeData(input)) {
      setMessages(p => [...p, { role: 'user', content: input, timestamp: new Date() }, { role: 'assistant', content: "To give you personalized insights, I need access to your YouTube data.\n\nGo to **Settings → Connected Platforms → YouTube → Connect** to link your account.\n\nOnce connected, I'll have your real analytics for tailored advice. 🎯", timestamp: new Date(), isGuard: true }])
      setInput(''); return
    }
    setMessages(p => [...p, { role: 'user', content: input, timestamp: new Date() }])
    const ci = input; setInput(''); setLoading(true)
    try {
      const r = await chatWithCoach(ci, selectedPlatform, activeConversationId)
      if (r.limitReached) { setUpgradePrompt({ message: r.message, currentPlan: r.currentPlan, upgradeTo: r.upgradeTo, usage: r.usage }); setMessages(p => p.slice(0,-1)); setLoading(false); return }
      setMessages(p => [...p, { role: 'assistant', content: r.response, timestamp: new Date(), contextUsed: r.contextUsed }])
      if (r.conversationId) setActiveConversationId(r.conversationId)
      await loadConversations(); await loadPlanInfo()
    } catch { setMessages(p => [...p, { role: 'assistant', content: "Sorry, I'm having trouble right now. Please try again.", timestamp: new Date(), error: true }]) }
    finally { setLoading(false); inputRef.current?.focus() }
  }
  function handleQuickPrompt(p) { setInput(p); setTimeout(() => document.getElementById('coach-form')?.requestSubmit(), 100) }
  function timeAgo(d) { const m = Math.floor((new Date()-new Date(d))/60000); if(m<1) return 'Just now'; if(m<60) return `${m}m`; const h=Math.floor(m/60); if(h<24) return `${h}h`; const dy=Math.floor(h/24); if(dy<7) return `${dy}d`; return new Date(d).toLocaleDateString() }
  function groupConversations(cs) { const t=[],w=[],o=[],n=new Date(); cs.forEach(c => { const d=Math.floor((n-new Date(c.updated_at))/(1000*60*60*24)); if(d<1)t.push(c);else if(d<7)w.push(c);else o.push(c) }); return {today:t,week:w,older:o} }
  function formatCoachMessage(t) {
    let s = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    s = s.replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight:600;color:${c.text}">$1</strong>`)
    s = s.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    s = s.replace(/^(\d+)\.\s/gm, `<span style="font-weight:600;color:${c.red}">$1.</span> `)
    s = s.replace(/^[-•]\s/gm, `<span style="color:${c.red};margin-right:4px">•</span> `)
    s = s.replace(/@([\w.-]+)/g, `<span style="font-weight:600;color:#9b6dff">@$1</span>`)
    return s
  }

  const isFreePlan = !userPlan || userPlan?.subscription?.plan === 'free'
  const grouped = groupConversations(conversations)
  const isWelcome = messages.length === 0 && !loading

  const quickActions = [
    { icon: I.BarChart, label: 'Channel Audit', prompt: 'Give me a quick audit of my channel — what am I doing well and what needs improvement?', color: c.red, bg: c.redBg, border: c.redBorder, needsYT: true },
    { icon: I.TrendUp, label: 'Growth Strategy', prompt: 'Based on my data, what is the #1 thing I should focus on to grow faster?', color: c.green, bg: c.greenBg, border: c.greenBorder, needsYT: true },
    { icon: I.Bulb, label: 'Next Video Idea', prompt: 'Give me 3 video ideas based on what performs best on my channel', color: '#FFD600', bg: 'rgba(255,214,0,0.1)', border: 'rgba(255,214,0,0.2)', needsYT: true },
    { icon: I.Eye, label: 'Spy on Competitor', prompt: 'Find 5 competitors in my niche and analyze what makes their top videos successful', color: c.red, bg: c.redBg, border: c.redBorder, needsYT: false },
    { icon: I.Target, label: 'Compare Channels', prompt: 'Compare my channel with @MrBeast and tell me the biggest gaps and opportunities', color: c.green, bg: c.greenBg, border: c.greenBorder, needsYT: false },
    { icon: I.Users, label: 'Audience Insights', prompt: 'What does my engagement data tell you about my audience?', color: '#4D9EFF', bg: 'rgba(77,158,255,0.1)', border: 'rgba(77,158,255,0.2)', needsYT: true },
  ]

  // ── Input bar (reused in welcome center + bottom) ──
  const inputBar = (
    <div style={{ maxWidth: 780, margin: '0 auto', width: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: c.inputBg, border: `1.5px solid ${input ? c.red : c.inputBorder}`,
        borderRadius: 14, padding: '4px 6px 4px 18px',
        transition: 'border-color 0.2s ease',
        boxShadow: input ? `0 0 0 3px ${c.redGlow}` : 'none',
      }}>
        <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
          placeholder={ytConnected ? "Ask about your channel, competitors, or strategy..." : "Ask a question or connect YouTube for coaching..."}
          disabled={loading}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: c.text, fontSize: 14, fontFamily: 'inherit', padding: '12px 0' }}
        />
        <button type="submit" disabled={!input.trim() || loading} style={{
          width: 40, height: 40, borderRadius: 10,
          background: input.trim() ? c.red : c.chip,
          border: 'none', cursor: input.trim() ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: input.trim() ? '#fff' : c.textDim,
          transition: 'all 0.15s ease', flexShrink: 0,
        }}><I.Send /></button>
      </div>
    </div>
  )

  return (
    <form id="coach-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', marginTop: -24, marginLeft: -32, marginRight: -32, marginBottom: -40 }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slidePanelIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .msg-in { animation: fadeIn 0.3s ease forwards; }
        .hist-item { transition: background 0.12s ease; cursor: pointer; }
        .hist-item:hover { background: ${c.histHover} !important; }
        .qa-btn { transition: all 0.15s ease; cursor: pointer; border: none; }
        .qa-btn:hover:not(.qa-locked) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .qa-locked { opacity: 0.4; cursor: not-allowed !important; }
        @media (max-width: 768px) {
          .nx-coach-root { height: calc(100vh - 60px) !important; margin: -16px -16px -32px !important; }
          .nx-coach-msg-bubble { max-width: 85% !important; }
          .nx-coach-qa-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
          .nx-coach-welcome-title { font-size: 18px !important; }
          .nx-coach-welcome-sub { font-size: 13px !important; }
          .nx-coach-panel { width: 280px !important; }
          .nx-coach-yt-banner { margin: 8px 14px 0 !important; padding: 10px 12px !important; }
          .nx-coach-input-wrap { padding: 10px 14px !important; }
          .nx-coach-messages-area { padding: 16px !important; }
        }
      `}</style>

      {/* ── History slide-over panel ── */}
      {historyOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div onClick={() => setHistoryOpen(false)} style={{ position: 'absolute', inset: 0, background: c.overlay }}/>
          <div className="nx-coach-panel" style={{ position: 'relative', width: 320, maxWidth: '85vw', background: c.histBg, display: 'flex', flexDirection: 'column', animation: 'slidePanelIn 0.2s ease', zIndex: 201, borderRight: `1px solid ${c.border}` }}>
            <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: c.text }}>Chat History</span>
              <button onClick={() => setHistoryOpen(false)} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.X /></button>
            </div>
            <div style={{ padding: '0 16px 12px' }}>
              <button type="button" onClick={handleNewChat} style={{ width: '100%', padding: '10px', background: c.red, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><I.Plus /> New Chat</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
              {isFreePlan ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{ color: c.textDim, marginBottom: 8, display: 'flex', justifyContent: 'center' }}><I.Lock /></div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 4 }}>Conversation History</p>
                  <p style={{ fontSize: 12, color: c.textDim, marginBottom: 12 }}>Upgrade to save and revisit sessions.</p>
                  <a href="/pricing" style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, padding: '8px 16px', borderRadius: 8, background: c.red, color: '#fff', textDecoration: 'none' }}>Upgrade to Pro</a>
                </div>
              ) : loadingHistory ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}><div style={{ width: 20, height: 20, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/></div>
              ) : conversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: c.textDim }}><I.Chat /><p style={{ fontSize: 12, marginTop: 8 }}>No conversations yet</p></div>
              ) : (
                [{label:'Today',items:grouped.today},{label:'This Week',items:grouped.week},{label:'Older',items:grouped.older}].map(g => g.items.length > 0 && (
                  <div key={g.label}>
                    <div style={{ padding: '8px 12px', fontSize: 11, fontWeight: 600, letterSpacing: 1, color: c.textDim, textTransform: 'uppercase' }}>{g.label}</div>
                    {g.items.map(cv => (
                      <div key={cv.id} className="hist-item" onClick={() => loadMessages(cv.id)} style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 2, background: activeConversationId === cv.id ? c.histActive : 'transparent', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ color: c.textDim, flexShrink: 0, marginTop: 2 }}><I.Chat /></div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ fontSize: 13, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{cv.title}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, fontSize: 11, color: c.textDim }}><I.Clock /> {timeAgo(cv.updated_at)}</div>
                        </div>
                        <button type="button" onClick={e => handleDeleteConversation(e, cv.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, color: c.textDim, opacity: 0.4 }}
                          onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0.4}><I.Trash /></button>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Minimal top bar (just history toggle + YT warning if needed) ── */}
      {ytConnected === false && (
        <div className="nx-coach-yt-banner" style={{ margin: '12px 24px 0', padding: '10px 16px', background: c.warnBg, border: `1px solid ${c.warnBorder}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ color: c.warnText, flexShrink: 0 }}><I.Warning /></div>
            <span style={{ fontSize: 12, color: c.warnText, fontWeight: 500 }}>YouTube not connected — <a href="/settings" style={{ color: c.warnText, fontWeight: 700, textDecoration: 'underline' }}>Connect now</a></span>
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="nx-coach-messages-area" style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column' }}>
        {isWelcome ? (
          /* ── WELCOME: centered ── */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: 680, margin: '0 auto', width: '100%' }}>
            {/* History toggle — floating top-left */}
            <button type="button" onClick={() => setHistoryOpen(true)} style={{
              position: 'absolute', top: 14, left: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8, border: `1px solid ${c.border}`,
              background: c.card, color: c.text, cursor: 'pointer',
            }} title="Chat history"><I.PanelLeft /></button>

            <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: `0 0 40px ${c.redGlow}`, color: '#fff' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            </div>
            <h2 className="nx-coach-welcome-title" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: c.text }}>What can I help you with?</h2>
            <p className="nx-coach-welcome-sub" style={{ fontSize: 14, color: c.textSec, maxWidth: 480, lineHeight: 1.5, marginBottom: 28 }}>
              {ytConnected ? "Ask about your channel, competitors, or growth strategy." : "Ask general questions or connect YouTube for personalized coaching."}
            </p>

            {/* Input centered */}
            {inputBar}

            {/* Quick actions below input */}
            <div className="nx-coach-qa-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 500, width: '100%', marginTop: 20 }}>
              {quickActions.map((qa, i) => {
                const QIcon = qa.icon; const locked = qa.needsYT && !ytConnected
                return (
                  <button key={i} type="button" className={`qa-btn${locked ? ' qa-locked' : ''}`} onClick={() => !locked && handleQuickPrompt(qa.prompt)} title={locked ? 'Connect YouTube' : ''} style={{ padding: '12px 10px', borderRadius: 12, background: qa.bg, border: `1px solid ${qa.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: qa.color, fontFamily: 'inherit', position: 'relative' }}>
                    <QIcon />{qa.label}
                    {locked && <span style={{ fontSize: 8, color: c.textDim }}>needs YT</span>}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          /* ── CHAT: messages + input at bottom ── */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* History toggle — top left */}
            <div style={{ marginBottom: 16 }}>
              <button type="button" onClick={() => setHistoryOpen(true)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 8, border: `1px solid ${c.border}`,
                background: c.card, color: c.text, cursor: 'pointer',
              }} title="Chat history"><I.PanelLeft /></button>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {messages.map((msg, i) => (
                  <div key={i} className="msg-in" style={{ display: 'flex', gap: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                      {msg.role === 'user' ? 'Y' : <I.Sparkle />}
                    </div>
                    <div className="nx-coach-msg-bubble" style={{
                      maxWidth: '70%', padding: '14px 18px',
                      borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background: msg.role === 'user' ? c.userBubble : msg.isGuard ? c.warnBg : c.aiBubble,
                      color: msg.role === 'user' ? c.userBubbleText : c.aiBubbleText,
                      border: msg.role === 'assistant' ? `1px solid ${msg.isGuard ? c.warnBorder : c.border}` : 'none',
                      fontSize: 14, lineHeight: 1.6,
                    }}>
                      {msg.role === 'user' ? <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p> : <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: formatCoachMessage(msg.content) }} />}
                      {msg.isGuard && <a href="/settings" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, padding: '8px 14px', borderRadius: 8, background: c.warnText, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}><I.YouTube /> Connect YouTube</a>}
                    </div>
                  </div>
                ))}
                {upgradePrompt && <div style={{ maxWidth: '70%' }}><UpgradePrompt message={upgradePrompt.message} currentPlan={upgradePrompt.currentPlan} upgradeTo={upgradePrompt.upgradeTo} usage={upgradePrompt.usage} onDismiss={() => setUpgradePrompt(null)} /></div>}
                {loading && (
                  <div className="msg-in" style={{ display: 'flex', gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><I.Sparkle /></div>
                    <div style={{ padding: '14px 18px', borderRadius: '14px 14px 14px 4px', background: c.aiBubble, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.textDim }}>
                      <div style={{ width: 16, height: 16, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>Analyzing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom input (only when chatting, not on welcome) ── */}
      {!isWelcome && (
        <>
          {messages.length > 0 && messages.length < 8 && !loading && !upgradePrompt && (
            <div style={{ padding: '6px 24px 0', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Go deeper', 'Give me action steps', 'Next video idea'].map((q, i) => (
                <button key={i} type="button" onClick={() => handleQuickPrompt(q)} style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: c.chip, border: 'none', color: c.textSec, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
              ))}
            </div>
          )}
          <div className="nx-coach-input-wrap" style={{ padding: '12px 24px 16px', flexShrink: 0 }}>
            {inputBar}
          </div>
        </>
      )}
    </form>
  )
}