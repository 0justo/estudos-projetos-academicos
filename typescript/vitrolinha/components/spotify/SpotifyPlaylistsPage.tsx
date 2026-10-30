'use client'
import { useEffect, useState } from 'react'
import { useSpotify } from '@/lib/context/SpotifyContext'
import { getUserPlaylists, playContext, getCoverUrl, type SpotifyPlaylist } from '@/lib/services/spotify.service'

export default function SpotifyPlaylistsPage() {
  const { isConnected, player } = useSpotify()
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isConnected) return
    setLoading(true)
    getUserPlaylists().then(p => { setPlaylists(p); setLoading(false) }).catch(() => setLoading(false))
  }, [isConnected])

  if (!isConnected) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--dim)', fontSize: 12, fontFamily: 'var(--font-sans)', lineHeight: 1.8 }}>
        Conecte o Spotify para ver suas playlists.
      </div>
    )
  }

  return (
    <div>
      <div className="section-label">Suas Playlists</div>
      {loading ? (
        <div style={{ padding: '32px', textAlign: 'center', color: 'var(--dim)', fontSize: 12 }}>Carregando...</div>
      ) : playlists.length === 0 ? (
        <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--dim)', fontSize: 12 }}>Nenhuma playlist encontrada.</div>
      ) : (
        playlists.map(pl => {
          const cover = getCoverUrl(pl.images, 'sm')
          return (
            <div
              key={pl.id}
              className="album-chip"
              style={{ cursor: 'pointer' }}
              onClick={() => playContext(pl.uri, 0, player.deviceId ?? undefined).catch(() => {})}
            >
              <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'var(--raised)', flexShrink: 0 }}>
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt={pl.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎵</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="al-name">{pl.name}</div>
                <div className="al-sub">{pl.tracks.total} músicas · {pl.owner.display_name}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          )
        })
      )}
      <div style={{ height: 24 }} />
    </div>
  )
}
