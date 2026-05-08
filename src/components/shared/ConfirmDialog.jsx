'use client'

// In-app replacement for window.confirm(). The native dialog can be
// globally suppressed by the user's browser (Chrome's "Prevent this
// page from creating additional dialogs"), in which case the call
// returns false silently — and a destructive action like "delete
// conversation" or "disconnect YouTube" then quietly never runs (or
// worse, a different code path treats the false as "user said cancel"
// when they never saw the dialog).
//
// Usage:
//   const confirm = useConfirm()
//   const ok = await confirm({
//     title: 'Disconnect YouTube?',
//     body: 'Your analytics will stop updating until you reconnect.',
//     confirmLabel: 'Disconnect',
//     danger: true,
//   })
//   if (!ok) return

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { useTheme } from '@/components/shared/ThemeProvider'

const ConfirmContext = createContext(async () => false)
export const useConfirm = () => useContext(ConfirmContext)

const DEFAULTS = {
  title: 'Are you sure?',
  body: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  danger: false,
}

export default function ConfirmProvider({ children }) {
  const [state, setState] = useState({ open: false, ...DEFAULTS })
  // Promise resolver for the in-flight confirm() call. Stored on a ref
  // so re-renders don't drop it.
  const resolverRef = useRef(null)
  const { dark } = useTheme()

  const confirm = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      // If a previous dialog is somehow still open (shouldn't happen —
      // each call awaits the prior resolution), resolve it false so we
      // don't leak the resolver.
      if (resolverRef.current) {
        try { resolverRef.current(false) } catch {}
      }
      resolverRef.current = resolve
      setState({ open: true, ...DEFAULTS, ...opts })
    })
  }, [])

  const close = useCallback((result) => {
    setState(s => ({ ...s, open: false }))
    const r = resolverRef.current
    resolverRef.current = null
    if (r) r(result)
  }, [])

  // Keyboard: Esc cancels, Enter confirms — only when the dialog is open.
  useEffect(() => {
    if (!state.open) return
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(false) }
      else if (e.key === 'Enter') { e.preventDefault(); close(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.open, close])

  const c = dark
    ? {
        overlay: 'rgba(0,0,0,0.75)',
        card: '#141414', border: '#222',
        text: '#F1F1F1', textSec: '#AAA',
        cancelBg: 'transparent', cancelBorder: '#2A2A2A', cancelText: '#AAA',
      }
    : {
        overlay: 'rgba(0,0,0,0.4)',
        card: '#FFFFFF', border: '#E5E5E5',
        text: '#0F0F0F', textSec: '#606060',
        cancelBg: 'transparent', cancelBorder: '#E5E5E5', cancelText: '#606060',
      }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state.open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="nx-confirm-title"
          onClick={() => close(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: c.overlay, backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, fontFamily: "'Outfit', -apple-system, sans-serif",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: c.card, border: `1px solid ${c.border}`,
              borderRadius: 16, width: '100%', maxWidth: 400,
              padding: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              animation: 'nxConfirmIn 0.18s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
          >
            <style>{`
              @keyframes nxConfirmIn {
                from { opacity: 0; transform: scale(0.94) translateY(8px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
            <h3 id="nx-confirm-title" style={{ fontSize: 18, fontWeight: 700, color: c.text, marginBottom: state.body ? 8 : 20 }}>
              {state.title}
            </h3>
            {state.body && (
              <p style={{ fontSize: 14, color: c.textSec, lineHeight: 1.5, marginBottom: 20 }}>
                {state.body}
              </p>
            )}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => close(false)}
                style={{
                  padding: '10px 18px', borderRadius: 10,
                  background: c.cancelBg, border: `1px solid ${c.cancelBorder}`,
                  color: c.cancelText, fontSize: 13, fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer',
                }}
              >
                {state.cancelLabel}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => close(true)}
                style={{
                  padding: '10px 18px', borderRadius: 10,
                  background: state.danger
                    ? 'linear-gradient(135deg, #FF0000, #CC0000)'
                    : 'linear-gradient(135deg, #FF0000, #CC0000)',
                  border: 'none', color: '#fff',
                  fontSize: 13, fontWeight: 700,
                  fontFamily: 'inherit', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255,0,0,0.25)',
                }}
              >
                {state.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}
