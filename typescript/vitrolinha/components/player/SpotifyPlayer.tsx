'use client'
import { memo, useCallback } from 'react'
import { useSpotify } from '@/lib/context/SpotifyContext'
import { getCoverUrl, formatDuration } from '@/lib/services/spotify.service'

interface SpotifyPlayerProps {
  onTrackClick?: () => void
}

const SpotifyLogo = memo(() => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
))
SpotifyLogo.displayName = 'SpotifyLogo'

export default memo(function SpotifyPlayer({ onTrackClick }: SpotifyPlayerProps) {
  const { player, togglePlay, skipNext, skipPrev, seekTo, isConnected } = useSpotify()

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!player.durationMs) return
    const rect = e.currentTarget.getBoundingClientRect()
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    seekTo(Math.floor(frac * player.durationMs))
  }, [player.durationMs, seekTo])

  if (!isConnected || !player.track) return null

  const { track } = player
  const coverUrl = getCoverUrl(track.album.images, 'sm')
  const artistName = track.artists.map(a => a.name).join(', ')
  const progressPct = `${player.progress * 100}%`

  return (
    <section
      className="spotify-player"
      aria-label={`Tocando: ${track.name} por ${artistName}`}
    >
      {/* Seekable progress bar */}
      <div
        className="player-progress"
        onClick={handleSeek}
        role="slider"
        aria-label="Progresso da música"
        aria-valuemin={0}
        aria-valuemax={player.durationMs}
        aria-valuenow={player.positionMs}
        aria-valuetext={`${formatDuration(player.positionMs)} de ${formatDuration(player.durationMs)}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (!player.durationMs) return
          const step = player.durationMs * 0.05
          if (e.key === 'ArrowRight') seekTo(Math.min(player.positionMs + step, player.durationMs))
          if (e.key === 'ArrowLeft')  seekTo(Math.max(player.positionMs - step, 0))
        }}
      >
        <div
          className="player-progress-fill"
          style={{ width: progressPct }}
          aria-hidden="true"
        />
      </div>

      {/* Main row */}
      <div className="player-row">
        {/* Cover */}
        <button
          className="player-cover"
          onClick={onTrackClick}
          aria-label={`Ver detalhes: ${track.name}`}
        >
          {coverUrl
            ? <img src={coverUrl} alt={`Capa: ${track.album.name}`} loading="lazy" />
            : <div className="disc" style={{ width: 40, height: 40 }}><div className="disc-inner"><div className="disc-dot" /></div></div>
          }
        </button>

        {/* Track info */}
        <button className="player-info" onClick={onTrackClick} aria-label={`Ver ${track.name}`}>
          <span className="player-track-name">{track.name}</span>
          <span className="player-track-sub">
            <span className="player-artist">{artistName}</span>
            <span className="player-time">
              {formatDuration(player.positionMs)} / {formatDuration(player.durationMs)}
            </span>
          </span>
        </button>

        {/* Controls */}
        <div className="player-controls" role="group" aria-label="Controles">
          <button
            onClick={skipPrev}
            aria-label="Faixa anterior"
            className="player-ctrl-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          <button
            onClick={togglePlay}
            aria-label={player.isPlaying ? 'Pausar' : 'Reproduzir'}
            aria-pressed={player.isPlaying}
            className="player-play-btn"
          >
            {player.isPlaying
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="#000" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="#000" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
            }
          </button>

          <button
            onClick={skipNext}
            aria-label="Próxima faixa"
            className="player-ctrl-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Badge */}
      <div className="player-badge" aria-hidden="true">
        <SpotifyLogo />
        <span>TOCANDO NO SPOTIFY</span>
      </div>
    </section>
  )
})
