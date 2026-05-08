import { Outfit } from 'next/font/google'
import ThemeProvider from '@/components/shared/ThemeProvider'
import PaddleInit from '@/components/shared/PaddleInit'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-display',
  display: 'swap',
})

export const metadata = {
  title: 'NEXORA - AI-Powered Social Media Coach',
  description: 'Grow your Instagram, YouTube, TikTok, and Twitter with AI-powered insights and coaching',
  alternates: {
    canonical: 'https://nexora-ai.org',
  },
}

// Apply the saved theme class before React hydrates so users don't see
// a light flash on first paint when their preference is dark (or vice
// versa). Placed as the first child of <body> — App Router auto-manages
// <head> via the metadata API, and adding a manual <head> to the root
// layout breaks Turbopack route resolution in Next 16.
//
// Reads the new namespaced key first ('nx:theme') and falls back to
// the legacy unprefixed key for users who haven't yet hit a code path
// that triggers the storage helper's migration. ThemeProvider does
// the actual migration on mount.
//
// ⚠️ XSS GUARDRAIL — DO NOT interpolate runtime / user / request data
// into this string. It's emitted via dangerouslySetInnerHTML below
// and runs as inline script in the document. Anything that comes
// from outside this file (req headers, cookies, URL, env vars set by
// users, DB rows) MUST NOT be templated in here. If you need
// per-request behavior, do it inside a client component that runs
// AFTER hydration, never in this bootstrap. The string is a frozen
// constant on purpose.
const themeBootstrap = `
  try {
    var t = localStorage.getItem('nx:theme') || localStorage.getItem('nexora-theme');
    if (t === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  } catch (_) { document.documentElement.classList.add('dark'); }
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={outfit.className}>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <ThemeProvider>{children}</ThemeProvider>
        <PaddleInit />
      </body>
    </html>
  )
}