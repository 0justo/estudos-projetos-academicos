'use client'
import { type Page } from '@/lib/types'

interface SidebarProps {
  currentPage: Page
  onNavigate: (p: Page) => void
  onReviewClick?: () => void
  onSettingsClick?: () => void
}

const NAV_ITEMS: { page: Page; label: string; emoji: string }[] = [
  { page: 'feed',   label: 'Feed',      emoji: '🏠' },
  { page: 'buscar', label: 'Buscar',    emoji: '🔍' },
  { page: 'msgs',   label: 'Mensagens', emoji: '💬' },
  { page: 'perfil', label: 'Perfil',    emoji: '👤' },
]

export default function Sidebar({ currentPage, onNavigate, onReviewClick, onSettingsClick }: SidebarProps) {
  return (
    <aside style={{
      width: 220,
      height: '100%',
      background: 'var(--card)',
      borderRight: '0.5px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 12px',
      gap: 4,
    }}>
      {/* Brand */}
      <div style={{
        fontFamily: 'var(--font-brand)',
        fontSize: 18,
        fontWeight: 900,
        letterSpacing: '0.2em',
        color: 'var(--white)',
        padding: '8px 12px 20px',
      }}>
        VITROLINHA
      </div>

      {/* Nav items */}
      {NAV_ITEMS.map(({ page, label, emoji }) => (
        <button
          key={page}
          onClick={() => onNavigate(page)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: currentPage === page ? 'var(--raised)' : 'none',
            border: 'none',
            cursor: 'pointer',
            color: currentPage === page ? 'var(--white)' : 'var(--dim)',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: currentPage === page ? 700 : 400,
            textAlign: 'left',
            width: '100%',
            transition: 'background 0.14s, color 0.14s',
          }}
        >
          <span style={{ fontSize: 16 }}>{emoji}</span>
          {label}
        </button>
      ))}

      {/* FAB equivalent */}
      <button
        onClick={onReviewClick}
        style={{
          marginTop: 12,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'var(--white)',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--bg)',
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        + Nova Resenha
      </button>

      {/* Settings at bottom */}
      <div style={{ flex: 1 }} />
      <button
        onClick={onSettingsClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--dim)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          textAlign: 'left',
          width: '100%',
        }}
      >
        <span style={{ fontSize: 16 }}>⚙️</span>
        Configurações
      </button>
    </aside>
  )
}
