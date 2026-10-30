'use client'
import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ReviewModal({ open, onClose }: Props) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  if (!open) return null
  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 0' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>Nova Resenha</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>

        <div className="review-modal-body">
          {/* Track search */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>MÚSICA</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--raised)', borderRadius: 10, border: '0.5px solid rgba(255,255,255,0.07)', cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>🎵</span>
              <span style={{ fontSize: 13, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>Buscar música…</span>
            </div>
          </div>

          {/* Star rating */}
          <div>
            <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>NOTA</div>
            <div className="review-stars-row">
              {[1,2,3,4,5].map(i => (
                <button
                  key={i}
                  className="review-star-btn"
                  onClick={() => setRating(i)}
                  style={{ background: i <= rating ? 'rgba(255,255,255,0.1)' : 'var(--raised)' }}
                >
                  {i <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: 8 }}>RESENHA</div>
            <textarea
              className="review-textarea"
              placeholder="O que você achou?"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={4}
            />
          </div>

          <button className="review-submit-btn" onClick={onClose}>Publicar Resenha</button>
        </div>
      </div>
    </div>
  )
}
