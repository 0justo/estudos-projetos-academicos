import { memo } from 'react'

interface StarRatingProps {
  rating: number
  size?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  label?: string
}

export default memo(function StarRating({
  rating,
  size = 10,
  interactive = false,
  onChange,
  label,
}: StarRatingProps) {
  return (
    <div
      className="stars"
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={label ?? `Avaliação: ${rating} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className="star-svg"
          width={size}
          height={size}
          viewBox="0 0 10 10"
          onClick={() => interactive && onChange?.(i)}
          onKeyDown={interactive ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange?.(i) }
          } : undefined}
          role={interactive ? 'radio' : undefined}
          aria-checked={interactive ? i === rating : undefined}
          aria-label={interactive ? `${i} estrela${i !== 1 ? 's' : ''}` : undefined}
          tabIndex={interactive ? 0 : undefined}
          style={interactive ? { cursor: 'pointer', outline: 'none' } : undefined}
          focusable={interactive ? 'true' : 'false'}
        >
          <polygon
            points="5,0.5 6.2,3.8 9.8,3.8 6.9,5.9 8,9.3 5,7.3 2,9.3 3.1,5.9 0.2,3.8 3.8,3.8"
            fill={i <= rating ? 'var(--white)' : 'var(--muted)'}
          />
        </svg>
      ))}
    </div>
  )
})
