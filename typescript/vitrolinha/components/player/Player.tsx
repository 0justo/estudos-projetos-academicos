'use client'
import { useState } from 'react'

interface PlayerProps {
  title?: string
  artist?: string
  album?: string
  isPlaying?: boolean
  onPlayPause?: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function Player({
  title = 'Exit Music (For a Film)',
  artist = 'Radiohead',
  album = 'OK Computer',
  isPlaying = true,
  onPlayPause,
  onNext,
  onPrev,
}: PlayerProps) {
  const [playing, setPlaying] = useState(isPlaying)

  const handlePlayPause = () => {
    setPlaying(p => !p)
    onPlayPause?.()
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      background: 'var(--raised)',
      borderTop: '0.5px solid rgba(255,255,255,0.06)',
    }}>
      {/* Disc */}
      <div className="disc" style={{ width: 36, height: 36, flexShrink: 0 }}>
        <div className="disc-inner"><div className="disc-dot" /></div>
      </div>

      {/* Track info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--white)',
          fontFamily: 'var(--font-sans)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {title}
        </div>
        <div style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>
          {artist}{album ? ` · ${album}` : ''}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onPrev} style={{ background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer', fontSize: 16, padding: 0 }}>
          ⏮
        </button>
        <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontSize: 20, padding: 0 }}>
          {playing ? '⏸' : '▶️'}
        </button>
        <button onClick={onNext} style={{ background: 'none', border: 'none', color: 'var(--dim)', cursor: 'pointer', fontSize: 16, padding: 0 }}>
          ⏭
        </button>
      </div>
    </div>
  )
}
