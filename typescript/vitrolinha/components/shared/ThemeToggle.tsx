'use client'

type Theme = 'escuro' | 'claro' | 'sistema'

interface ThemeToggleProps {
  theme: Theme
  onChange: (t: Theme) => void
}

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'escuro', label: '🌙 Escuro' },
  { value: 'claro',  label: '☀️ Claro'  },
  { value: 'sistema', label: '⚙️ Sistema' },
]

export default function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {THEME_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`pill ${theme === value ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
