'use client'
import { memo, useCallback } from 'react'
import type { Page } from '@/lib/types'

// Memoized SVG icons — avoids re-creating on every render
const icons = {
  feed: (active: boolean) => (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={active ? 'var(--white)' : 'none'}
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  msgs: () => (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  profile: () => (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
}

const NAV_ITEMS = [
  { page: 'feed'   as Page, label: 'Início',    icon: (a: boolean) => icons.feed(a)   },
  { page: 'buscar' as Page, label: 'Buscar',    icon: () => icons.search()             },
  { page: 'msgs'   as Page, label: 'Mensagens', icon: () => icons.msgs()               },
  { page: 'perfil' as Page, label: 'Perfil',    icon: () => icons.profile()            },
]

interface Props {
  currentPage: Page
  onNavigate: (p: Page) => void
  onFabClick?: () => void
}

export default memo(function BottomNavigation({ currentPage, onNavigate, onFabClick }: Props) {
  const handleNav = useCallback((page: Page) => () => onNavigate(page), [onNavigate])

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {NAV_ITEMS.slice(0, 2).map(({ page, label, icon }) => {
        const active = currentPage === page
        return (
          <button
            key={page}
            className={`nav-btn${active ? ' active' : ''}`}
            onClick={handleNav(page)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            <span className={`nav-icon${active ? ' active' : ''}`}>
              {icon(active)}
            </span>
          </button>
        )
      })}

      <button
        className="fab-btn"
        onClick={onFabClick}
        aria-label="Nova resenha"
        title="Nova resenha"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      {NAV_ITEMS.slice(2).map(({ page, label, icon }) => {
        const active = currentPage === page
        return (
          <button
            key={page}
            className={`nav-btn${active ? ' active' : ''}`}
            onClick={handleNav(page)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
          >
            <span className={`nav-icon${active ? ' active' : ''}`}>
              {icon(active)}
            </span>
          </button>
        )
      })}
    </nav>
  )
})
