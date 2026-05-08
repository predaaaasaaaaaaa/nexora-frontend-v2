'use client'

import { useState, useRef, useEffect } from 'react'
import { chatWithCoach, listCoachConversations, getCoachMessages, deleteCoachConversation } from '@/lib/api'
import { useTheme } from '@/components/shared/ThemeProvider'
import { useUserPlan, useYouTubeStatus } from '@/components/shared/DashboardDataProvider'
import { useConfirm } from '@/components/shared/ConfirmDialog'
import { log } from '@/lib/log'
import UpgradePrompt from '@/components/shared/UpgradePrompt'

const themes = {
  dark: {
    card: '#1A1A1A', cardHover: '#222', text: '#F1F1F1', textSec: '#AAA', textDim: '#717171',
    border: '#2A2A2A', borderLight: '#222', bg: '#0F0F0F',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.08)', redBorder: 'rgba(255,0,0,0.18)', redGlow: 'rgba(255,0,0,0.12)',
    green: '#3EA651', greenBg: 'rgba(62,166,81,0.1)', greenBorder: 'rgba(62,166,81,0.2)',
    chip: '#2A2A2A',
    userBubble: '#FF0000', userBubbleText: '#fff',
    aiBubble: '#1A1A1A', aiBubbleText: '#F1F1F1',
    inputBg: '#1A1A1A', inputBorder: '#2A2A2A',
    histBg: '#161616', histHover: '#1E1E1E', histActive: '#222',
    warnBg: 'rgba(255,140,0,0.08)', warnBorder: 'rgba(255,140,0,0.25)', warnText: '#FF8C00',
    overlay: 'rgba(0,0,0,0.6)',
  },
  light: {
    card: '#FFFFFF', cardHover: '#F5F5F5', text: '#0F0F0F', textSec: '#606060', textDim: '#909090',
    border: '#E5E5E5', borderLight: '#F0F0F0', bg: '#FFFFFF',
    red: '#FF0000', redDark: '#CC0000',
    redBg: 'rgba(255,0,0,0.05)', redBorder: 'rgba(255,0,0,0.12)', redGlow: 'rgba(255,0,0,0.06)',
    green: '#2BA640', greenBg: 'rgba(43,166,64,0.08)', greenBorder: 'rgba(43,166,64,0.15)',
    chip: '#F2F2F2',
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
  YouTube: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.7A11.87 11.87 0 0012 3.5a11.87 11.87 0 00-3.82.49 4.83 4.83 0 01-3.77 2.7A4.78 4.78 0 002 11.5v1a4.78 4.78 0 002.41 4.31 4.83 4.83 0 013.77 2.7 11.87 11.87 0 003.82.49 11.87 11.87 0 003.82-.49 4.83 4.83 0 013.77-2.7A4.78 4.78 0 0022 12.5v-1a4.78 4.78 0 00-2.41-4.81zM10 15.5v-7l6 3.5z"/></svg>,
  Warning: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  PanelLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
}

const DATA_DEPENDENT_PROMPTS = ['channel audit','my channel','my data','my video','my analytics','my subscribers','my views','my engagement','my performance','give me action steps','go deeper','next video idea','growth strategy','audience insights','video review','how am i doing','my latest','my stats','my top']
function requiresYouTubeData(msg) { return DATA_DEPENDENT_PROMPTS.some(p => msg.toLowerCase().includes(p)) }

export default function CoachPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')
  const [conversations, setConversations] = useState([])
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [upgradePrompt, setUpgradePrompt] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { dark } = useTheme()
  const c = dark ? themes.dark : themes.light

  // Plan + YouTube status now come from the shared provider — no
  // per-page fetches and no re-fetch on every nav. We still call
  // refreshPlan() after each chat so the usage counter stays accurate.
  const { plan: userPlan, refreshPlan } = useUserPlan()
  const { ytStatus, ytLoaded } = useYouTubeStatus()
  const ytConnected = ytLoaded ? (ytStatus?.connected === true) : null
  const confirm = useConfirm()

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages])
  useEffect(() => { loadConversations() }, [])
  useEffect(() => { if (!loadingHistory) inputRef.current?.focus() }, [loadingHistory, activeConversationId])

  async function loadConversations() {
    try { setLoadingHistory(true); const d = await listCoachConversations(); setConversations(d.limitReached ? [] : d.conversations || []) }
    catch (err) { log.warn('[coach] list conversations failed', err?.message || err) }
    finally { setLoadingHistory(false) }
  }
  async function loadMessages(id) {
    try { setLoading(true); const d = await getCoachMessages(id); if (d.limitReached) return
      setMessages((d.messages||[]).map(m => ({ role: m.role, content: m.content, timestamp: new Date(m.created_at) })))
      setActiveConversationId(id); setHistoryOpen(false)
    } catch (err) { log.warn('[coach] load messages failed', err?.message || err) }
    finally { setLoading(false) }
  }
  function handleNewChat() { setMessages([]); setActiveConversationId(null); setUpgradePrompt(null); setHistoryOpen(false); inputRef.current?.focus() }
  async function handleDeleteConversation(e, id) {
    e.stopPropagation()
    const ok = await confirm({
      title: 'Delete this conversation?',
      body: 'This conversation and its messages will be permanently removed.',
      confirmLabel: 'Delete',
      danger: true,
    })
    if (!ok) return
    try { await deleteCoachConversation(id); setConversations(p => p.filter(c => c.id !== id)); if (activeConversationId === id) handleNewChat() }
    catch (err) { log.warn('[coach] delete conversation failed', err?.message || err) }
  }
  async function handleSubmit(e) {
    e.preventDefault(); if (!input.trim() || loading) return
    if (!ytConnected && requiresYouTubeData(input)) {
      setMessages(p => [...p, { role: 'user', content: input, timestamp: new Date() }, { role: 'assistant', content: "To give you personalized insights, I need your YouTube data.\n\nGo to **Settings → Connected Platforms → YouTube → Connect**.\n\nOnce connected, I'll have your real analytics for tailored advice. 🎯", timestamp: new Date(), isGuard: true }])
      setInput(''); return
    }
    setMessages(p => [...p, { role: 'user', content: input, timestamp: new Date() }])
    const ci = input; setInput(''); setLoading(true)
    try {
      const r = await chatWithCoach(ci, selectedPlatform, activeConversationId)
      if (r.limitReached) { setUpgradePrompt({ message: r.message, currentPlan: r.currentPlan, upgradeTo: r.upgradeTo, usage: r.usage }); setMessages(p => p.slice(0,-1)); setLoading(false); return }
      setMessages(p => [...p, { role: 'assistant', content: r.response, timestamp: new Date() }])
      if (r.conversationId) setActiveConversationId(r.conversationId)
      await loadConversations(); await refreshPlan()
    } catch (err) { log.warn('[coach] chat send failed', err?.message || err); setMessages(p => [...p, { role: 'assistant', content: "Sorry, something went wrong. Try again.", timestamp: new Date(), error: true }]) }
    finally { setLoading(false); inputRef.current?.focus() }
  }
  function handleQuickPrompt(p) { setInput(p); setTimeout(() => document.getElementById('coach-form')?.requestSubmit(), 100) }
  function timeAgo(d) { const m = Math.floor((new Date()-new Date(d))/60000); if(m<1) return 'now'; if(m<60) return `${m}m`; const h=Math.floor(m/60); if(h<24) return `${h}h`; return `${Math.floor(h/24)}d` }
  function groupConversations(cs) { const t=[],w=[],o=[]; cs.forEach(c => { const d=Math.floor((new Date()-new Date(c.updated_at))/(864e5)); if(d<1)t.push(c);else if(d<7)w.push(c);else o.push(c) }); return {today:t,week:w,older:o} }
  // Render an AI message as React elements (no HTML strings, no
  // dangerouslySetInnerHTML). Each line is split into segments around
  // **bold** and @handles; the line prefix (numbered list / bullet) is
  // emitted as a styled span. Anything we don't recognize is rendered as
  // plain text, so a future AI output containing < > & or HTML tags is
  // shown literally instead of being parsed by the browser.
  function renderMsg(text) {
    if (!text) return null
    const lines = String(text).split('\n')

    return lines.map((line, li) => {
      let prefix = null
      let body = line

      const numMatch = body.match(/^(\d+)\.\s/)
      if (numMatch) {
        prefix = <span style={{ fontWeight: 600, color: c.red }}>{numMatch[1]}.</span>
        body = body.slice(numMatch[0].length)
      } else {
        const bulletMatch = body.match(/^[-•]\s/)
        if (bulletMatch) {
          prefix = <span style={{ color: c.red, marginRight: 4 }}>•</span>
          body = body.slice(bulletMatch[0].length)
        }
      }

      // Inline pass: split around **bold** segments first, then split each
      // remaining run around @handle tokens.
      const boldParts = body.split(/(\*\*[^*]+\*\*)/g)
      const segments = []
      boldParts.forEach((part, bi) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          segments.push(
            <strong key={`b${bi}`} style={{ fontWeight: 600, color: c.text }}>
              {part.slice(2, -2)}
            </strong>
          )
          return
        }
        const handleParts = part.split(/(@[\w.-]+)/g)
        handleParts.forEach((sub, hi) => {
          if (/^@[\w.-]+$/.test(sub)) {
            segments.push(
              <span key={`b${bi}h${hi}`} style={{ fontWeight: 600, color: '#9b6dff' }}>
                {sub}
              </span>
            )
          } else if (sub) {
            segments.push(<span key={`b${bi}t${hi}`}>{sub}</span>)
          }
        })
      })

      return (
        <span key={li}>
          {prefix}
          {segments}
          {li < lines.length - 1 && <br />}
        </span>
      )
    })
  }

  const isFreePlan = !userPlan || userPlan?.subscription?.plan === 'free'
  const grouped = groupConversations(conversations)
  const isWelcome = messages.length === 0 && !loading
  const quickActions = [
    { icon: I.BarChart, label: 'Channel Audit', prompt: 'Give me a quick audit of my channel', color: c.red, bg: c.redBg, border: c.redBorder, needsYT: true },
    { icon: I.TrendUp, label: 'Growth Strategy', prompt: 'What should I focus on to grow faster?', color: c.green, bg: c.greenBg, border: c.greenBorder, needsYT: true },
    { icon: I.Bulb, label: 'Video Ideas', prompt: 'Give me 3 video ideas based on my best content', color: '#FFD600', bg: 'rgba(255,214,0,0.1)', border: 'rgba(255,214,0,0.2)', needsYT: true },
    { icon: I.Eye, label: 'Spy Competitors', prompt: 'Find 5 competitors and analyze their top videos', color: c.red, bg: c.redBg, border: c.redBorder, needsYT: false },
    { icon: I.Target, label: 'Compare Channels', prompt: 'Compare my channel with @MrBeast', color: c.green, bg: c.greenBg, border: c.greenBorder, needsYT: false },
    { icon: I.Users, label: 'Audience Insights', prompt: 'What does my engagement data say about my audience?', color: '#4D9EFF', bg: 'rgba(77,158,255,0.1)', border: 'rgba(77,158,255,0.2)', needsYT: true },
  ]

  return (
    <form id="coach-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', marginTop: -24, marginLeft: -32, marginRight: -32, marginBottom: -40, position: 'relative' }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slidePanelIn { from { transform:translateX(-100%); } to { transform:translateX(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        .msg-in { animation: fadeIn 0.3s ease forwards; }
        .hist-item { transition: background 0.12s ease; cursor: pointer; }
        .hist-item:hover { background: ${c.histHover} !important; }
        .qa-btn { transition: all 0.15s ease; cursor: pointer; border: none; }
        .qa-btn:hover:not(.qa-locked) { transform: translateY(-1px); }
        .qa-locked { opacity: 0.4; cursor: not-allowed !important; }
        /* Themed scrollbar */
        .nx-coach-scroll::-webkit-scrollbar { width: 6px; }
        .nx-coach-scroll::-webkit-scrollbar-track { background: transparent; }
        .nx-coach-scroll::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
        .nx-coach-scroll::-webkit-scrollbar-thumb:hover { background: ${c.textDim}; }

        @media (max-width: 768px) {
          .nx-cr { height: calc(100vh - 60px) !important; margin: -16px -16px -32px !important; }
          .nx-cb { max-width: 88% !important; }
          .nx-cw-title { font-size: 18px !important; }
          .nx-cw-sub { font-size: 13px !important; }
          .nx-cp { width: 280px !important; }
          .nx-cqa { grid-template-columns: repeat(2, 1fr) !important; }
          .nx-ci-wrap { padding: 8px 10px !important; }
          .nx-ci-inner { border-radius: 22px !important; padding: 2px 4px 2px 14px !important; }
          .nx-ci-inner input { font-size: 13px !important; padding: 10px 0 !important; }
          .nx-ci-inner button { width: 34px !important; height: 34px !important; border-radius: 17px !important; }
          .nx-csug { padding: 0 10px 4px !important; gap: 6px !important; flex-wrap: nowrap !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .nx-csug::-webkit-scrollbar { display: none; }
          .nx-csug button { white-space: nowrap; flex-shrink: 0; }
          .nx-cyt { margin: 6px 10px 0 !important; padding: 8px 12px !important; }
        }
      `}</style>

      {/* ── History panel ── */}
      {historyOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div onClick={() => setHistoryOpen(false)} style={{ position: 'absolute', inset: 0, background: c.overlay }}/>
          <div className="nx-cp" style={{ position: 'relative', width: 320, maxWidth: '85vw', background: c.histBg, display: 'flex', flexDirection: 'column', animation: 'slidePanelIn 0.2s ease', zIndex: 201, borderRight: `1px solid ${c.border}` }}>
            <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: c.text }}>Chat History</span>
              <button type="button" onClick={() => setHistoryOpen(false)} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${c.border}`, background: 'transparent', color: c.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.X /></button>
            </div>
            <div style={{ padding: '0 16px 12px' }}>
              <button type="button" onClick={handleNewChat} style={{ width: '100%', padding: '10px', background: c.red, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><I.Plus /> New Chat</button>
            </div>
            <div className="nx-coach-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
              {isFreePlan ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{ color: c.textDim, marginBottom: 8, display: 'flex', justifyContent: 'center' }}><I.Lock /></div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 4 }}>Conversation History</p>
                  <p style={{ fontSize: 12, color: c.textDim, marginBottom: 12 }}>Upgrade to save sessions.</p>
                  <a href="/pricing" style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, padding: '8px 16px', borderRadius: 8, background: c.red, color: '#fff', textDecoration: 'none' }}>Upgrade to Pro</a>
                </div>
              ) : loadingHistory ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}><div style={{ width: 20, height: 20, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/></div>
              ) : conversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: c.textDim }}><p style={{ fontSize: 12 }}>No conversations yet</p></div>
              ) : (
                [{label:'Today',items:grouped.today},{label:'This Week',items:grouped.week},{label:'Older',items:grouped.older}].map(g => g.items.length > 0 && (
                  <div key={g.label}>
                    <div style={{ padding: '8px 12px', fontSize: 10, fontWeight: 700, letterSpacing: 1, color: c.textDim, textTransform: 'uppercase' }}>{g.label}</div>
                    {g.items.map(cv => (
                      <div key={cv.id} className="hist-item" onClick={() => loadMessages(cv.id)} style={{ padding: '10px 12px', borderRadius: 8, marginBottom: 2, background: activeConversationId === cv.id ? c.histActive : 'transparent', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ color: c.textDim, flexShrink: 0 }}><I.Chat /></div>
                        <span style={{ flex: 1, fontSize: 13, color: c.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cv.title}</span>
                        <span style={{ fontSize: 10, color: c.textDim, flexShrink: 0 }}>{timeAgo(cv.updated_at)}</span>
                        <button type="button" onClick={e => handleDeleteConversation(e, cv.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, color: c.textDim, opacity: 0.3 }}
                          onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0.3}><I.Trash /></button>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky history button (always visible, follows scroll) ── */}
      <button type="button" onClick={() => setHistoryOpen(true)} style={{
        position: 'absolute', top: 12, left: 12, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 8, border: `1px solid ${c.border}`,
        background: c.card, color: c.textSec, cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }} title="Chat history"><I.PanelLeft /></button>

      {/* ── YT warning ── */}
      {ytConnected === false && (
        <div className="nx-cyt" style={{ margin: '8px 24px 0', padding: '8px 14px', background: c.warnBg, border: `1px solid ${c.warnBorder}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <I.Warning /><span style={{ fontSize: 12, color: c.warnText, fontWeight: 500 }}>YouTube not connected — <a href="/settings" style={{ color: c.warnText, fontWeight: 700, textDecoration: 'underline' }}>Connect</a></span>
        </div>
      )}

      {/* ── Main scrollable area ── */}
      <div className="nx-coach-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {isWelcome ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 0 30px ${c.redGlow}`, color: '#fff' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
            </div>
            <h2 className="nx-cw-title" style={{ fontSize: 24, fontWeight: 800, color: c.text, marginBottom: 6 }}>What can I help you with?</h2>
            <p className="nx-cw-sub" style={{ fontSize: 14, color: c.textSec, maxWidth: 440, lineHeight: 1.5, marginBottom: 24 }}>
              {ytConnected ? "Ask about your channel, competitors, or growth strategy." : "Ask questions or connect YouTube for personalized coaching."}
            </p>
            <div className="nx-cqa" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 480, width: '100%', marginBottom: 24 }}>
              {quickActions.map((qa, i) => {
                const QIcon = qa.icon; const locked = qa.needsYT && !ytConnected
                return <button key={i} type="button" className={`qa-btn${locked ? ' qa-locked' : ''}`} onClick={() => !locked && handleQuickPrompt(qa.prompt)} style={{ padding: '10px 8px', borderRadius: 10, background: qa.bg, border: `1px solid ${qa.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: qa.color, fontFamily: 'inherit' }}><QIcon />{qa.label}{locked && <span style={{ fontSize: 8, color: c.textDim }}>needs YT</span>}</button>
              })}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, padding: '20px 24px' }}>
            <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 40 }}>
              {messages.map((msg, i) => (
                <div key={i} className="msg-in" style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>
                    {msg.role === 'user' ? 'Y' : <I.Sparkle />}
                  </div>
                  <div className="nx-cb" style={{
                    maxWidth: '70%', padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                    background: msg.role === 'user' ? c.userBubble : msg.isGuard ? c.warnBg : c.aiBubble,
                    color: msg.role === 'user' ? c.userBubbleText : c.aiBubbleText,
                    border: msg.role === 'assistant' ? `1px solid ${msg.isGuard ? c.warnBorder : c.border}` : 'none',
                    fontSize: 14, lineHeight: 1.6,
                  }}>
                    {msg.role === 'user' ? <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p> : <div style={{ whiteSpace: 'pre-wrap' }}>{renderMsg(msg.content)}</div>}
                    {msg.isGuard && <a href="/settings" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '6px 12px', borderRadius: 8, background: c.warnText, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}><I.YouTube /> Connect YouTube</a>}
                  </div>
                </div>
              ))}
              {upgradePrompt && <div style={{ maxWidth: '70%' }}><UpgradePrompt message={upgradePrompt.message} currentPlan={upgradePrompt.currentPlan} upgradeTo={upgradePrompt.upgradeTo} usage={upgradePrompt.usage} onDismiss={() => setUpgradePrompt(null)} /></div>}
              {loading && (
                <div className="msg-in" style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${c.red}, ${c.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><I.Sparkle /></div>
                  <div style={{ padding: '12px 16px', borderRadius: '12px 12px 12px 4px', background: c.aiBubble, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: c.textDim }}>
                    <div style={{ width: 14, height: 14, border: `2px solid ${c.border}`, borderTopColor: c.red, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>Analyzing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom: suggestions + input (floating, no bg bar) ── */}
      <div style={{ flexShrink: 0 }}>
        {/* Suggestions — horizontal scroll on mobile, transparent */}
        {!isWelcome && messages.length > 0 && messages.length < 8 && !loading && !upgradePrompt && (
          <div className="nx-csug" style={{ padding: '0 24px 6px', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Go deeper', 'Give me action steps', 'Next video idea'].map((q, i) => (
              <button key={i} type="button" onClick={() => handleQuickPrompt(q)} style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, background: c.chip, border: `1px solid ${c.border}`, color: c.textSec, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
            ))}
          </div>
        )}
        {/* Input — visible when chatting or on welcome (welcome has its own centered one but this stays for consistency) */}
        {!isWelcome && (
          <div className="nx-ci-wrap" style={{ padding: '0 24px 12px' }}>
            <div className="nx-ci-inner" style={{ maxWidth: 780, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, background: c.inputBg, border: `1.5px solid ${input ? c.red : c.inputBorder}`, borderRadius: 14, padding: '4px 6px 4px 18px', transition: 'border-color 0.2s', boxShadow: input ? `0 0 0 3px ${c.redGlow}` : 'none' }}>
              <input ref={!isWelcome ? inputRef : null} type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder={ytConnected ? "Ask about your channel, competitors, or strategy..." : "Ask a question..."}
                disabled={loading}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: c.text, fontSize: 14, fontFamily: 'inherit', padding: '12px 0' }}
              />
              <button type="submit" disabled={!input.trim() || loading} style={{ width: 38, height: 38, borderRadius: 10, background: input.trim() ? c.red : c.chip, border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: input.trim() ? '#fff' : c.textDim, flexShrink: 0 }}><I.Send /></button>
            </div>
          </div>
        )}
        {/* Welcome mode input (centered in the welcome area, using same ref) */}
        {isWelcome && (
          <div className="nx-ci-wrap" style={{ padding: '0 24px 16px' }}>
            <div className="nx-ci-inner" style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, background: c.inputBg, border: `1.5px solid ${input ? c.red : c.inputBorder}`, borderRadius: 14, padding: '4px 6px 4px 18px', transition: 'border-color 0.2s', boxShadow: input ? `0 0 0 3px ${c.redGlow}` : 'none' }}>
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder={ytConnected ? "Ask about your channel, competitors, or strategy..." : "Ask a question..."}
                disabled={loading}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: c.text, fontSize: 14, fontFamily: 'inherit', padding: '12px 0' }}
              />
              <button type="submit" disabled={!input.trim() || loading} style={{ width: 38, height: 38, borderRadius: 10, background: input.trim() ? c.red : c.chip, border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: input.trim() ? '#fff' : c.textDim, flexShrink: 0 }}><I.Send /></button>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}