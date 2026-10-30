'use client'
import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY = 'vitrolinha-install-dismissed'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    try { if (localStorage.getItem(STORAGE_KEY) === '1') return } catch { return }
    if (window.matchMedia('(display-mode: standalone)').matches) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setTimeout(() => setVisible(true), 2000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = (permanent = false) => {
    setHiding(true)
    if (permanent) { try { localStorage.setItem(STORAGE_KEY, '1') } catch {} }
    setTimeout(() => { setVisible(false); setHiding(false) }, 300)
  }

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    dismiss(outcome === 'accepted')
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Instalar Vitrolinha"
      style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)',
        left: '50%',
        transform: `translateX(-50%) translateY(${hiding ? '120%' : '0'})`,
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
        opacity: hiding ? 0 : 1,
        width: 'calc(100% - 32px)',
        maxWidth: '358px',
        zIndex: 9999,
        backgroundColor: '#111',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <circle cx="18" cy="18" r="10" stroke="rgba(242,239,233,0.12)" strokeWidth="1"/>
        <circle cx="18" cy="18" r="6" fill="rgba(242,239,233,0.1)"/>
        <circle cx="18" cy="18" r="2.5" fill="#070707"/>
        <circle cx="18" cy="18" r="1.5" fill="rgba(242,239,233,0.5)"/>
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#F2EFE9', letterSpacing: '0.01em' }}>
          Instalar Vitrolinha
        </p>
        <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(242,239,233,0.45)', lineHeight: 1.4 }}>
          Acesso rápido, offline e tela cheia
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={() => dismiss(true)} aria-label="Agora não" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, color: 'rgba(242,239,233,0.45)', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, padding: '6px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Agora não
        </button>
        <button onClick={install} aria-label="Instalar" style={{ background: '#F2EFE9', border: 'none', borderRadius: 7, color: '#070707', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
          Instalar
        </button>
      </div>
    </div>
  )
}
