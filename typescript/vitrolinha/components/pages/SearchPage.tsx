'use client'
import { useState } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import AlbumCard from '@/components/cards/AlbumCard'

const GENRES = [
  { name: 'Rock',       color: '#2d1b4e', emoji: '🎸' },
  { name: 'MPB',        color: '#1a3a1a', emoji: '🌿' },
  { name: 'Jazz',       color: '#1a2a3a', emoji: '🎷' },
  { name: 'Hip-Hop',    color: '#2a1a1a', emoji: '🎤' },
  { name: 'Eletrônica', color: '#0d1a2a', emoji: '🎛️' },
  { name: 'Indie',      color: '#1a1a2a', emoji: '🌙' },
  { name: 'Clássica',   color: '#2a2a1a', emoji: '🎻' },
  { name: 'Samba',      color: '#2a1a0d', emoji: '🥁' },
  { name: 'Pop',        color: '#2a0d2a', emoji: '✨' },
  { name: 'Metal',      color: '#1a1a1a', emoji: '⚡' },
]

const RESULTS = [
  { type: 'track'  as const, title: 'Karma Police', sub: 'Radiohead · OK Computer', emoji: '🎵' },
  { type: 'artist' as const, title: 'Radiohead',    sub: '3.2M ouvintes',           emoji: '🎸' },
  { type: 'album'  as const, title: 'OK Computer',  sub: 'Radiohead · 1997',        emoji: '💿' },
  { type: 'user'   as const, title: 'biatakeda',    sub: '@biatakeda · 284 seguidores', emoji: '👤' },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />

      {query ? (
        <>
          <div className="section-label">Resultados</div>
          {RESULTS.map((r, i) => (
            <AlbumCard key={i} title={r.title} sub={r.sub} emoji={r.emoji} type={r.type} />
          ))}
        </>
      ) : (
        <>
          <div className="section-label">Explorar por gênero</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 20px' }}>
            {GENRES.map(g => (
              <div key={g.name} className="genre-card" style={{ background: g.color }}>
                <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 22 }}>{g.emoji}</span>
                <div className="genre-card-name">{g.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
