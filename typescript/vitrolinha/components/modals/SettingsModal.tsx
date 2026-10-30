'use client'
import ThemeToggle from '@/components/shared/ThemeToggle'
import SpotifyConnectBanner from '@/components/spotify/SpotifyConnectBanner'

type Theme = 'escuro' | 'claro' | 'sistema'

interface Props {
  open: boolean
  onClose: () => void
  theme: Theme
  onThemeChange: (t: Theme) => void
  onSignOut?: () => void
}

const OTHER_ITEMS = [
  { icon: '🔔', label: 'Notificações',       sub: 'Gerencie seus alertas'       },
  { icon: '🔒', label: 'Privacidade',        sub: 'Controle quem vê seu perfil' },
  { icon: '💾', label: 'Dados & Backup',     sub: 'Exporte suas resenhas'       },
]

export default function SettingsModal({ open, onClose, theme, onThemeChange, onSignOut }: Props) {
  if (!open) return null
  return (
    <div className="settings-overlay open" onClick={onClose}>
      <div className="settings-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ padding: '18px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-brand)', fontSize: 16, fontWeight: 900, letterSpacing: '0.2em', color: 'var(--white)' }}>
            VITROLINHA
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '0 20px 12px' }}>
          <div style={{ fontSize: 8, color: 'var(--dim)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>
            APARÊNCIA
          </div>
          <ThemeToggle theme={theme} onChange={onThemeChange} />
        </div>

        <div className="divider" />

        {/* Spotify connect banner */}
        <div style={{ paddingTop: 12 }}>
          <div style={{ fontSize: 8, color: 'var(--dim)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', padding: '0 20px 8px' }}>
            MÚSICA
          </div>
          <SpotifyConnectBanner />
        </div>

        <div className="divider" />

        {OTHER_ITEMS.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', cursor: 'pointer', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>{item.label}</div>
              <div style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>{item.sub}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        ))}

        <div style={{ padding: '16px 20px' }}>
          <button
            onClick={onSignOut}
            style={{ width: '100%', padding: '11px', background: 'transparent', border: '0.5px solid rgba(255,0,0,0.2)', borderRadius: 10, color: '#ff4444', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-sans)', cursor: 'pointer', letterSpacing: '0.05em' }}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}
