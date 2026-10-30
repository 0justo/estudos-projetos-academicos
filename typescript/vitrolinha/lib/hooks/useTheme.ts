'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '@/lib/types'

const STORAGE_KEY = 'vitrolinha-theme'
const STORAGE_SET_KEY = 'vitrolinha-theme-user-set'

function getEffective(theme: Theme): 'claro' | 'escuro' {
  if (theme !== 'sistema') return theme
  if (typeof window === 'undefined') return 'escuro'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'escuro'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('sistema')

  const applyTheme = useCallback((t: Theme) => {
    const effective = getEffective(t)
    document.documentElement.setAttribute('data-theme', effective)
    document.body.style.background = effective === 'claro' ? '#F5F6F7' : '#070707'
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    applyTheme(t)
    try {
      localStorage.setItem(STORAGE_KEY, t)
      if (t !== 'sistema') localStorage.setItem(STORAGE_SET_KEY, '1')
    } catch {}
  }, [applyTheme])

  // Sync with system preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = () => { if (theme === 'sistema') applyTheme('sistema') }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme, applyTheme])

  return { theme, setTheme }
}
