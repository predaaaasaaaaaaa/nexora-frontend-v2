import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NEXORA - AI-Powered Social Media Coach',
  description: 'Grow your Instagram, YouTube, TikTok, and Twitter with AI-powered insights and coaching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

