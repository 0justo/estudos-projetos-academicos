'use client'
import { useState, useId, useRef } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar músicas, artistas, usuários…',
  autoFocus,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="search-bar-wrap">
      <div className={`search-bar${focused ? ' focused' : ''}`}>
        <label htmlFor={inputId} className="sr-only">Buscar</label>
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="var(--muted)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref={inputRef}
          id={inputId}
          className="search-input"
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        {value && (
          <button
            onClick={() => { onChange(''); inputRef.current?.focus() }}
            aria-label="Limpar busca"
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0 4px', fontSize: 16, lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
