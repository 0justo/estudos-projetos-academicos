'use client'
const CONVOS = [
  { name: 'Leo Manzini', handle: '@leomanz', avatar: '🥁', last: 'cara aquele álbum do Nick Drake…', time: '2 min', unread: 2 },
  { name: 'Carol N.', handle: '@carolneves', avatar: '🎹', last: 'Temos gosto muito parecido haha', time: '1h', unread: 0 },
  { name: 'Pedro K.', handle: '@pedrokauer', avatar: '🎸', last: 'ouviu o novo EP?', time: '3h', unread: 1 },
  { name: 'Ana Lima', handle: '@analima', avatar: '🎵', last: '😮 que resenha incrível!', time: 'ontem', unread: 0 },
]

export default function MsgsPage() {
  return (
    <div>
      <div className="section-label">Mensagens</div>
      {CONVOS.map((c, i) => (
        <div key={i} className="msg-row">
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: '1px solid rgba(255,255,255,0.07)' }}>{c.avatar}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>{c.name}</span>
              <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)' }}>{c.time}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--dim)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last}</div>
          </div>
          {c.unread > 0 && (
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--white)', color: 'var(--bg)', fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', flexShrink: 0 }}>{c.unread}</div>
          )}
        </div>
      ))}
      <div style={{ height: 24 }} />
    </div>
  )
}
