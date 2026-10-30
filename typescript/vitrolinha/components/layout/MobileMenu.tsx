'use client'
import { useEffect, useRef } from 'react'
import type { Page } from '@/lib/types'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  currentPage: Page
  onNavigate: (p: Page) => void
  onSettingsClick?: () => void
}

const NAV_ITEMS: { page: Page; label: string; emoji: string }[] = [
  { page: 'feed',   label: 'Início',     emoji: '🏠' },
  { page: 'buscar', label: 'Buscar',    emoji: '🔍' },
  { page: 'msgs',   label: 'Mensagens', emoji: '💬' },
  { page: 'perfil', label: 'Perfil',    emoji: '👤' },
]

export default function MobileMenu({ open, onClose, currentPage, onNavigate, onSettingsClick }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Trap focus inside modal when open
  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const handleNavigate = (p: Page) => { onNavigate(p); onClose() }

  return (
    <div
      className="settings-overlay open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      style={{ zIndex: 200 }}
    >
      <div
        className="settings-sheet"
        ref={sheetRef}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '60vh' }}
      >
        <div className="modal-handle" aria-hidden="true" />

        <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-brand)', fontSize: 16, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--white)' }}>
            VITROLINHA
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Fechar menu"
            style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: 20, cursor: 'pointer', padding: '4px 8px' }}
          >
            ×
          </button>
        </div>

        <nav aria-label="Menu" style={{ padding: '4px 12px 8px' }}>
          {NAV_ITEMS.map(({ page, label, emoji }) => {
            const active = currentPage === page
            return (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                aria-current={active ? 'page' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 10px', width: '100%',
                  background: active ? 'var(--raised)' : 'none',
                  border: 'none', borderRadius: 10, cursor: 'pointer',
                  color: active ? 'var(--white)' : 'var(--dim)',
                  fontFamily: 'var(--font-sans)', fontSize: 14,
                  fontWeight: active ? 700 : 400,
                  textAlign: 'left', marginBottom: 2,
                  transition: 'background var(--t-fast), color var(--t-fast)',
                }}
              >
                <span style={{ fontSize: 18 }} aria-hidden="true">{emoji}</span>
                {label}
              </button>
            )
          })}
        </nav>

        <div className="divider" role="separator" />

        <div style={{ padding: '8px 12px 16px' }}>
          <button
            onClick={() => { onSettingsClick?.(); onClose() }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 10px', width: '100%',
              background: 'none', border: 'none', borderRadius: 10,
              cursor: 'pointer', color: 'var(--dim)',
              fontFamily: 'var(--font-sans)', fontSize: 14, textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 18 }} aria-hidden="true">⚙️</span>
            Configurações
          </button>
        </div>
      </div>
    </div>
  )
}
