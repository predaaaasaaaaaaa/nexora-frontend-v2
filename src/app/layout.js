import { Outfit } from 'next/font/google'
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}