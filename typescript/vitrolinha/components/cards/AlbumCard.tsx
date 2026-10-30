interface AlbumCardProps {
  title: string
  sub: string
  emoji?: string
  type?: 'track' | 'artist' | 'album' | 'user'
  onClick?: () => void
}

export default function AlbumCard({ title, sub, emoji = '💿', type, onClick }: AlbumCardProps) {
  const isRound = type === 'artist' || type === 'user'

  return (
    <div className="album-chip" onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: isRound ? '50%' : 8,
        background: 'var(--raised)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="al-name">{title}</div>
        <div className="al-sub">{sub}</div>
      </div>
      {type && (
        <span style={{
          fontSize: 9,
          color: 'var(--muted)',
          fontFamily: 'var(--font-sans)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          padding: '2px 6px',
        }}>
          {type}
        </span>
      )}
    </div>
  )
}
