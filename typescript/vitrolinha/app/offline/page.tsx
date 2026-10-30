export default function OfflinePage() {
  return (
    <div style={{
      height: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#070707', gap: 16, padding: 32,
    }}>
      <div style={{ fontFamily: 'var(--font-brand)', fontSize: 24, fontWeight: 900, color: 'rgba(242,239,233,0.9)', letterSpacing: '0.28em' }}>
        VITROLINHA
      </div>
      <div style={{ fontSize: 32 }}>📡</div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 1.6, maxWidth: 260 }}>
        Você está offline.<br />
        Suas resenhas salvas continuam disponíveis.
      </p>
    </div>
  )
}
