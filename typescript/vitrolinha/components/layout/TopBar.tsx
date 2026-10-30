'use client'
import { memo } from 'react'

interface TopBarProps {
  onBrandClick?: () => void
  onSettingsClick?: () => void
  showSettings?: boolean
}

export default memo(function TopBar({ onBrandClick, onSettingsClick, showSettings = false }: TopBarProps) {
  return (
    <header className="topbar" role="banner">
      <button
        className="brand"
        onClick={onBrandClick}
        aria-label="Vitrolinha — voltar ao feed"
      >
        VITROLINHA
      </button>

      {showSettings && (
        <button
          onClick={onSettingsClick}
          aria-label="Abrir configurações"
          style={{
            position: 'absolute',
            right: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--white)',
            padding: '8px 4px',
            letterSpacing: 2,
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          •••
        </button>
      )}
    </header>
  )
})
