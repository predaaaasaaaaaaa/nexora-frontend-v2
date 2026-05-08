'use client'

import Script from 'next/script'
import { log } from '@/lib/log'

// The Paddle "client token" is not a secret per Paddle's own docs —
// it's domain-scoped and is meant to live in client-side code. Still,
// we route it through an env var so dev / sandbox / prod can each use
// a different token without a source change. The literal fallback is
// the current production token, preserving today's behavior when the
// env var isn't set (e.g. on existing deploys until they're rotated).
const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
  || 'live_3c5100e719eb15b9336ffb8f405'

// Initialize Paddle the moment paddle.js has actually evaluated.
// The previous implementation polled with setTimeout(initPaddle, 500)
// and used strategy="lazyOnload" — meaning a fast user click on a
// checkout button could land before Paddle.js had even started
// loading, and the resulting Paddle.Checkout call would no-op because
// Initialize() had never run. onLoad is the deterministic hook.
export default function PaddleInit() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window === 'undefined' || !window.Paddle) return
        try {
          window.Paddle.Initialize({ token: PADDLE_TOKEN })
        } catch (err) {
          log.error('[paddle] Initialize failed', err?.message || err)
        }
      }}
      onError={(err) => {
        log.error('[paddle] paddle.js failed to load', err?.message || err)
      }}
    />
  )
}
