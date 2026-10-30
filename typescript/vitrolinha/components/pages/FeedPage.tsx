'use client'
import { useState, memo } from 'react'
import ReviewCard from '@/components/cards/ReviewCard'
import type { Review, UserProfile } from '@/lib/types'

const TABS = ['Amigos', 'Global', 'Seguindo', 'Descobrir'] as const
const TRENDING = ['#shoegaze', '#mpb', '#vaporwave', '#bedroom pop', '#jazz fusion', '#lofi']

const MOCK_USER: UserProfile = {
  name: 'Bia Takeda',  handle: '@biatakeda', avatar: '🎸',
  bio: '',             followers: 284,         following: 142, reviews: 67,
}

const MOCK_REVIEWS: Review[] = [
  { id: '1', user: MOCK_USER,
    track: { id: 't1', title: 'Motion Picture Soundtrack', artist: 'Radiohead', album: 'Kid A' },
    rating: 5, text: 'Uma obra de arte que só melhora com o tempo. A voz do Thom Yorke parece vir de outro plano de existência.',
    likes: 42, timestamp: 'agora', pinned: true },
  { id: '2', user: { ...MOCK_USER, name: 'Leo Manzini', handle: '@leomanz', avatar: '🥁' },
    track: { id: 't2', title: 'Pink Moon', artist: 'Nick Drake', album: 'Pink Moon' },
    rating: 5, text: 'Perfeito para madrugadas solitárias. Nick Drake era um gênio incompreendido.',
    likes: 28, timestamp: '3 min', pinned: false },
  { id: '3', user: { ...MOCK_USER, name: 'Carol N.', handle: '@carolneves', avatar: '🎹' },
    track: { id: 't3', title: 'Trem das Cores', artist: 'Gilberto Gil', album: 'Refavela' },
    rating: 4, text: 'Clássico absoluto. Aquela guitarra no início é pura magia tropical.',
    likes: 67, timestamp: '12 min', pinned: false },
]

const SUGGEST_USERS = [
  { name: 'Ana Lima',  handle: '@analima',    avatar: '🎵', match: '94% gosto similar' },
  { name: 'Pedro K.',  handle: '@pedrokauer', avatar: '🎸', match: 'Segue Radiohead' },
]

const SuggestUser = memo(function SuggestUser({ u }: { u: typeof SUGGEST_USERS[0] }) {
  const [following, setFollowing] = useState(false)
  return (
    <div className="suggest-chip">
      <div
        style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}
        aria-hidden="true"
      >
        {u.avatar}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="suggest-name">{u.name}</div>
        <div className="suggest-handle">
          {u.handle} · <span style={{ color: '#5adb8a' }}>{u.match}</span>
        </div>
      </div>
      <button
        className={`suggest-follow-btn${following ? ' following' : ''}`}
        aria-label={following ? `Deixar de seguir ${u.name}` : `Seguir ${u.name}`}
        aria-pressed={following}
        onClick={() => setFollowing(f => !f)}
      >
        {following ? 'Seguindo' : 'Seguir'}
      </button>
    </div>
  )
})

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section aria-label="Feed">
      {/* Trending bar */}
      <div className="feed-trending-bar" role="list" aria-label="Trending">
        <span className="feed-trending-label" aria-hidden="true">EM ALTA</span>
        {TRENDING.map(tag => (
          <span key={tag} className="feed-trending-tag" role="listitem">{tag}</span>
        ))}
      </div>

      {/* Live count */}
      <div className="feed-live-row" aria-live="polite" aria-atomic="true">
        <span className="feed-live-dot-anim" aria-hidden="true" />
        <span className="feed-live-text">AO VIVO</span>
        <span className="feed-live-count">• 247 ouvindo agora</span>
      </div>

      {/* Tab strip */}
      <div
        className="feed-tab-strip"
        role="tablist"
        aria-label="Filtro do feed"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === i}
            id={`feed-tab-${i}`}
            aria-controls={`feed-panel-${i}`}
            className={`feed-tab-item${activeTab === i ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
            {i === 0 && <span className="feed-new-badge" style={{ marginLeft: 6 }} aria-label="3 novas resenhas">3</span>}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`feed-panel-${activeTab}`}
        aria-labelledby={`feed-tab-${activeTab}`}
      >
        <div className="section-label">
          Resenhas Recentes
          <button className="action" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Ver todas →
          </button>
        </div>

        {MOCK_REVIEWS.map((review, i) => (
          <ReviewCard
            key={review.id}
            review={review}
            animationDelay={`${i * 0.06}s`}
          />
        ))}
      </div>

      {/* Suggestions */}
      <div className="section-label">
        Quem Seguir
        <button className="action" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          Ver todos →
        </button>
      </div>
      <div className="divider" role="separator" />
      {SUGGEST_USERS.map(u => <SuggestUser key={u.handle} u={u} />)}

      <div style={{ height: 24 }} aria-hidden="true" />
    </section>
  )
}
