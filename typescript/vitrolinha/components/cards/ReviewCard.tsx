import { memo, useState, useCallback } from 'react'
import type { Review } from '@/lib/types'
import StarRating from '@/components/shared/StarRating'
import MusicCard from '@/components/cards/MusicCard'

interface ReviewCardProps {
  review: Review
  animationDelay?: string
}

export default memo(function ReviewCard({ review, animationDelay }: ReviewCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(review.likes)

  const handleLike = useCallback(() => {
    setLiked(prev => {
      setLikeCount(c => prev ? c - 1 : c + 1)
      return !prev
    })
  }, [])

  return (
    <article
      className="review-card feed-card-anim"
      style={{ animationDelay }}
      aria-label={`Resenha de ${review.user.name} sobre ${review.track.title}`}
    >
      {review.pinned && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
          <span
            style={{
              fontSize: 9, color: 'var(--dim)', fontFamily: 'var(--font-sans)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '2px 6px',
            }}
            aria-label="Resenha fixada"
          >
            📌 fixado
          </span>
        </div>
      )}

      {/* User header */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--raised)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          aria-hidden="true"
        >
          {review.user.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>
              {review.user.name}
            </span>
            <span style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>
              {review.user.handle}
            </span>
          </div>
          <StarRating rating={review.rating} label={`${review.rating} de 5 estrelas`} />
        </div>
        <time
          dateTime={review.timestamp}
          style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)' }}
        >
          {review.timestamp}
        </time>
      </header>

      {/* Track info */}
      <div style={{ marginBottom: 10 }}>
        <MusicCard
          title={review.track.title}
          artist={review.track.artist}
          album={review.track.album}
        />
      </div>

      {/* Review text */}
      <p style={{
        fontSize: 13, color: 'var(--dim)', fontFamily: 'var(--font-sans)',
        lineHeight: 1.55, fontStyle: 'italic', marginBottom: 12,
      }}>
        {review.text}
      </p>

      {/* Actions */}
      <footer style={{
        display: 'flex', alignItems: 'center', gap: 14,
        paddingTop: 10, borderTop: '0.5px solid rgba(255,255,255,0.05)',
      }}>
        <button
          onClick={handleLike}
          aria-label={liked ? `Descurtir resenha (${likeCount} curtidas)` : `Curtir resenha (${likeCount} curtidas)`}
          aria-pressed={liked}
          style={{
            background: 'none', border: 'none',
            color: liked ? 'var(--white)' : 'var(--dim)',
            fontSize: 11, fontFamily: 'var(--font-sans)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            transition: 'color var(--t-fast)',
          }}
        >
          {liked ? '♥' : '♡'} {likeCount}
        </button>
        <button
          aria-label="Responder resenha"
          style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: 11, fontFamily: 'var(--font-sans)', cursor: 'pointer' }}
        >
          💬 Responder
        </button>
        <button
          aria-label="Compartilhar resenha"
          style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: 11, fontFamily: 'var(--font-sans)', cursor: 'pointer', marginLeft: 'auto' }}
        >
          ↗ Compartilhar
        </button>
      </footer>
    </article>
  )
})
