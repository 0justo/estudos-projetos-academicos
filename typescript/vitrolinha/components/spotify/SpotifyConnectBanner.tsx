'use client'
import { useSpotify } from '@/lib/context/SpotifyContext'
import { initiateSpotifyLogin } from '@/lib/services/spotify.service'

export default function SpotifyConnectBanner() {
  const { isConnected, spotifyUser, disconnect } = useSpotify()

  if (isConnected && spotifyUser) {
    return (
      <div style={{
        background: 'rgba(29,185,84,0.08)',
        border: '0.5px solid rgba(29,185,84,0.2)',
        borderRadius: 12,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '0 20px 16px',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#1DB954',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <SpotifyIcon size={18} color="#000" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1DB954', fontFamily: 'var(--font-sans)', letterSpacing: '0.04em' }}>
            SPOTIFY CONECTADO
          </div>
          <div style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--font-sans)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {spotifyUser.display_name}
          </div>
        </div>
        <button
          onClick={disconnect}
          style={{
            background: 'none',
            border: '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: 'var(--dim)',
            fontSize: 10,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.06em',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          DESCONECTAR
        </button>
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--raised)',
      border: '0.5px solid var(--border)',
      borderRadius: 12,
      padding: '16px',
      margin: '0 20px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <SpotifyIcon size={20} color="#1DB954" />
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>
          Conectar Spotify
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--font-sans)', lineHeight: 1.7, marginBottom: 14 }}>
        Busque músicas, artistas e playlists reais. Ouça direto pelo Vitrolinha com o Spotify Premium.
      </div>
      <button
        onClick={initiateSpotifyLogin}
        style={{
          width: '100%',
          background: '#1DB954',
          border: 'none',
          borderRadius: 10,
          padding: '12px',
          color: '#000',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <SpotifyIcon size={14} color="#000" />
        ENTRAR COM SPOTIFY
      </button>
    </div>
  )
}

function SpotifyIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}
