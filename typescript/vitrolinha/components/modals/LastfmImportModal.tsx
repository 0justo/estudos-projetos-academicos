'use client'
import { useState } from 'react'

type Step = 'idle' | 'loading' | 'success' | 'error'

interface Props { onClose: () => void; onSuccess?: (imported: number) => void }

const PAGE_OPTIONS = [
  { label: '200 recentes', pages: 1 },
  { label: '1.000', pages: 5 },
  { label: '2.000', pages: 10 },
  { label: '5.000', pages: 25 },
]

export default function LastfmImportModal({ onClose, onSuccess }: Props) {
  const [username, setUsername] = useState('')
  const [maxPages, setMaxPages] = useState(5)
  const [step, setStep] = useState<Step>('idle')
  const [result, setResult] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleImport() {
    if (!username.trim()) return
    setStep('loading'); setResult(null); setErrorMsg('')
    try {
      const res = await fetch('/api/lastfm/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username.trim(), maxPages }) })
      const json = await res.json()
      if (!res.ok) { setErrorMsg(json.error ?? `Erro ${res.status}`); setStep('error'); return }
      setResult(json); setStep('success'); onSuccess?.(json.imported)
    } catch { setErrorMsg('Falha de rede. Tente novamente.'); setStep('error') }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'var(--surface)', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 480, padding: '20px 20px 36px', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--muted)', margin: '0 auto 18px', opacity: 0.35 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ fontSize: 24, color: '#d51007' }}>📻</span>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, color: 'var(--white)' }}>Importar do Last.fm</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--dim)', marginTop: 2 }}>Traga seu histórico real de scrobbles</div>
          </div>
        </div>

        {(step === 'idle' || step === 'error') && (
          <>
            {step === 'error' && <div role="alert" style={{ background: 'rgba(255,60,60,0.12)', border: '1px solid rgba(255,60,60,0.3)', borderRadius: 10, padding: '10px 12px', marginBottom: 14, fontFamily: 'var(--font-sans)', fontSize: 12, color: '#ff6b6b' }}>{errorMsg}</div>}
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Usuário Last.fm</label>
            <input type="text" placeholder="ex: rj" value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleImport()} autoCapitalize="none" autoCorrect="off" style={{ display: 'block', width: '100%', marginTop: 6, marginBottom: 14, padding: '10px 12px', background: 'var(--raised)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, color: 'var(--white)', fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            <label style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Quantidade</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8, marginBottom: 18 }}>
              {PAGE_OPTIONS.map(opt => (
                <button key={opt.pages} onClick={() => setMaxPages(opt.pages)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, background: maxPages === opt.pages ? 'var(--white)' : 'var(--raised)', color: maxPages === opt.pages ? '#000' : 'var(--muted)', transition: 'all 0.14s' }}>{opt.label}</button>
              ))}
            </div>
            <button onClick={handleImport} disabled={!username.trim()} style={{ width: '100%', padding: '13px 0', borderRadius: 12, border: 'none', background: username.trim() ? 'var(--white)' : 'var(--raised)', color: username.trim() ? '#000' : 'var(--muted)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, cursor: username.trim() ? 'pointer' : 'default' }}>
              Importar scrobbles
            </button>
          </>
        )}

        {step === 'loading' && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--muted)' }}>Buscando scrobbles de <strong style={{ color: 'var(--white)' }}>{username}</strong>…</div>
          </div>
        )}

        {step === 'success' && result && (
          <div>
            <div style={{ background: 'rgba(80,220,120,0.1)', border: '1px solid rgba(80,220,120,0.25)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, color: '#6dde9a', marginBottom: 10, textAlign: 'center' }}>✓ Importação concluída!</div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {[{ num: result.imported, label: 'importados' }, { num: result.skipped, label: 'já existiam' }, { num: result.total, label: 'encontrados' }].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 22, color: 'var(--white)' }}>{s.num}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onClose} style={{ width: '100%', padding: '13px 0', borderRadius: 12, border: 'none', background: 'var(--white)', color: '#000', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  )
}
