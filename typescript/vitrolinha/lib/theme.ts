export type Theme = 'escuro' | 'claro' | 'sistema'

export function getEffectiveTheme(theme: Theme): 'escuro' | 'claro' {
  if (theme === 'sistema') {
    if (typeof window === 'undefined') return 'escuro'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'escuro'
  }
  return theme
}

export function applyTheme(theme: Theme) {
  const effective = getEffectiveTheme(theme)
  document.documentElement.setAttribute('data-theme', effective)
  document.body.style.background = effective === 'claro' ? '#F5F6F7' : '#000'
}

export function initTheme() {
  const saved = localStorage.getItem('vitrolinha-theme') as Theme | null
  const userChose = localStorage.getItem('vitrolinha-theme-user-set')
  const theme = (userChose === '1' && saved && saved !== 'sistema') ? saved : 'sistema'
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  const effective = theme === 'sistema' ? (mq.matches ? 'claro' : 'escuro') : theme
  document.documentElement.setAttribute('data-theme', effective)
}
