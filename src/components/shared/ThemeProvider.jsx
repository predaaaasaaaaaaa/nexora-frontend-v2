'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { STORAGE_KEYS, getItem, setItem } from '@/lib/storage'

const ThemeContext = createContext({
  dark: true,
  setDark: () => {},
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    // Check if user has a saved preference (migrates from legacy
    // 'nexora-theme' on first read).
    const saved = getItem(STORAGE_KEYS.THEME)
    if (saved !== null) {
      setDark(saved === 'dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    setItem(STORAGE_KEYS.THEME, dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle: () => setDark(prev => !prev) }}>
      {children}
    </ThemeContext.Provider>
  )
}