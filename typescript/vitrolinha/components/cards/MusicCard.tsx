interface MusicCardProps {
  title: string
  artist: string
  album?: string
  emoji?: string
  size?: 'sm' | 'md'
}

export default function MusicCard({ title, artist, album, emoji = '🎵', size = 'md' }: MusicCardProps) {
  const discSize = size === 'sm' ? 32 : 36

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: size === 'sm' ? '6px 10px' : '8px',
      background: 'var(--ghost)',
      borderRadius: 8,
    }}>
      <div
        className="disc"
        style={{ width: discSize, height: discSize, background: 'var(--raised)', flexShrink: 0 }}
      >
        <div className="disc-inner">
          <div className="disc-dot" />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: size === 'sm' ? 11 : 12,
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
    </div>
  )
}
