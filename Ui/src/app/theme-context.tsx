import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContext = {
  theme: { theme: Theme; hello: string }
  toggle(): void
}

const ThemeContext = createContext<ThemeContext | null>(null)

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggle() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: { theme, hello: 'world' }, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
