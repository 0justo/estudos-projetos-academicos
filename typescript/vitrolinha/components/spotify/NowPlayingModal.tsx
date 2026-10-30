'use client'
import { useSpotify } from '@/lib/context/SpotifyContext'
import { getCoverUrl, formatDuration } from '@/lib/services/spotify.service'

interface NowPlayingModalProps {
  open: boolean
  onClose: () => void
}

export default function NowPlayingModal({ open, onClose }: NowPlayingModalProps) {
  const { player, togglePlay, skipNext, skipPrev, seekTo } = useSpotify()

  if (!open || !player.track) return null

  const track = player.track
  const coverUrl = getCoverUrl(track.album.images, 'lg')
  const artistName = track.artists.map(a => a.name).join(', ')

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    seekTo(Math.floor(frac * player.durationMs))
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'sheet-up 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Handle bar */}
      <div onClick={onClose} style={{ padding: '16px 40px 8px', cursor: 'pointer' }}>
        <div style={{ width: 36, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        width: '100%',
        maxWidth: 390,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 28px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 40px)',
      }}>

        {/* Album art */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0',
        }}>
          <div style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            background: 'var(--raised)',
          }}>
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt={track.album.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 80,
              }}>🎵</div>
            )}
          </div>
        </div>

        {/* Track info */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--white)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
            marginBottom: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {track.name}
          </div>
          <div style={{ fontSize: 14, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>
            {artistName}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-sans)', marginTop: 2 }}>
            {track.album.name}
          </div>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <div
            onClick={handleSeek}
            style={{
              height: 4,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.12)',
              cursor: 'pointer',
              marginBottom: 8,
              position: 'relative',
            }}
          >
            <div style={{
              height: '100%',
              borderRadius: 2,
              width: `${player.progress * 100}%`,
              background: '#1DB954',
              transition: 'width 0.9s linear',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>
            <span>{formatDuration(player.positionMs)}</span>
            <span>{formatDuration(player.durationMs)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <button onClick={skipPrev} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', opacity: 0.7, padding: 8 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--white)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {player.isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--bg)">
                <rect x="6" y="4" width="4" height="16" rx="1.5"/><rect x="14" y="4" width="4" height="16" rx="1.5"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--bg)">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </button>

          <button onClick={skipNext} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', opacity: 0.7, padding: 8 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        {/* Spotify badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span style={{ fontSize: 10, color: '#1DB954', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.08em' }}>
            VITROLINHA × SPOTIFY
          </span>
        </div>
      </div>
    </div>
  )
}
