'use client'
import { useDeezer } from '@/lib/context/DeezerContext'
import type { DeezerTrack } from '@/lib/services/deezer.service'

function formatSeconds(total: number, progress: number) {
  const elapsed = Math.floor(total * progress)
  return `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`
}

export default function DeezerPreviewPlayer({ track }: { track: DeezerTrack }) {
  const { currentTrack, playerState, progress, play, pause, resume, stop } = useDeezer()
  const isThis = currentTrack?.id === track.id
  const isPlaying = isThis && playerState === 'playing'
  const isLoading = isThis && playerState === 'loading'
  const isActive = isThis && playerState !== 'idle'
  const coverUrl = track.album.cover_small || track.album.cover

  function handlePlay() {
    if (!isThis) { play(track) }
    else if (isPlaying) { pause() }
    else if (playerState === 'paused') { resume() }
    else { play(track) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {coverUrl && <img src={coverUrl} alt={track.album.title} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? '#A238FF' : 'var(--white)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
          <div style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>{track.artist.name}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {isActive && (
            <button onClick={e => { e.stopPropagation(); stop() }} aria-label="Parar" style={{ background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer', fontSize: 14, padding: '4px' }}>■</button>
          )}
          <button onClick={handlePlay} disabled={isLoading} aria-label={isPlaying ? 'Pausar' : 'Tocar prévia'} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: isActive ? '#A238FF' : 'rgba(162,56,255,0.15)', color: isActive ? '#fff' : '#A238FF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, transition: 'all var(--t-fast)' }}>
            {isLoading ? '…' : isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      {isActive && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 50 }}>
          <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)', width: 24, textAlign: 'right' }}>{formatSeconds(30, progress)}</span>
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress * 100}%`, background: '#A238FF', transition: 'width 0.1s linear' }} />
          </div>
          <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)', width: 24 }}>0:30</span>
        </div>
      )}

      {!isActive && (
        <div style={{ paddingLeft: 50 }}>
          <span style={{ fontSize: 9, color: '#A238FF', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.08em', background: 'rgba(162,56,255,0.12)', borderRadius: 20, padding: '2px 7px' }}>PRÉVIA 30s · DEEZER</span>
        </div>
      )}
    </div>
  )
}
