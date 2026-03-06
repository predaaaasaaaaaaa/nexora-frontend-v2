'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({
  dark: true,
  setDark: () => {},
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('nexora-theme')
    if (saved !== null) {
      setDark(saved === 'dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('nexora-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle: () => setDark(prev => !prev) }}>
      {children}
    </ThemeContext.Provider>
  )
}