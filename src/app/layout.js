import { Outfit } from 'next/font/google'
import Script from 'next/script'
import ThemeProvider from '@/components/shared/ThemeProvider'
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider>{children}</ThemeProvider>
        <Script 
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.Paddle) {
              window.Paddle.Initialize({ 
                token: 'live_3c5100e719eb15b9336ffb8f405',
              });
            }
          }}
        />
      </body>
    </html>
  )
}