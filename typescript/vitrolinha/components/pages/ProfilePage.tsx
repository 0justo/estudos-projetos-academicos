'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import { getHistory, getTopTracks } from '@/lib/services/history.service'
import { getFavorites } from '@/lib/services/favorites.service'
import { getUserReviews } from '@/lib/services/reviews.service'
import type { HistoryEntryWithTrack } from '@/lib/services/history.service'
import type { Favorite } from '@/lib/supabase/database.types'

export default function ProfilePage() {
  const { user, profile } = useAuth()
  const [activeSection, setActiveSection] = useState<'hist' | 'podio' | 'resenhas'>('hist')

  const [history, setHistory]     = useState<HistoryEntryWithTrack[]>([])
  const [topTracks, setTopTracks] = useState<{ track: any; plays: number }[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [reviewsCount, setReviewsCount] = useState(0)
  const [loadingData, setLoadingData]   = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([
      getHistory(user.id, 20),
      getTopTracks(user.id, 5),
      getFavorites(user.id),
      getUserReviews(user.id),
    ]).then(([hist, top, favs, revs]) => {
      setHistory(hist)
      setTopTracks(top)
      setFavorites(favs)
      setReviewsCount(revs.length)
    }).catch(() => {}).finally(() => setLoadingData(false))
  }, [user])

  const displayName   = profile?.name   ?? user?.user_metadata?.full_name ?? 'Usuário'
  const displayHandle = profile?.handle ?? 'sem_handle'
  const avatarEmoji   = profile?.avatar_emoji ?? '🎵'
  const bio           = profile?.bio ?? ''

  function formatTime(isoStr: string): string {
    const diff = (Date.now() - new Date(isoStr).getTime()) / 1000
    if (diff < 60)           return 'agora'
    if (diff < 3600)         return `${Math.floor(diff / 60)} min`
    if (diff < 86400)        return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
  }

  return (
    <div>
      {/* Header */}
      <div className="profile-header">
        <div className="profile-top">
          <div className="avatar">
            <span style={{ fontSize: 26 }}>
              {profile?.avatar_url
                ? <img src={profile.avatar_url} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                : avatarEmoji}
            </span>
            <span className="avatar-dot" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="profile-name">{displayName}</div>
            <div className="profile-handle">@{displayHandle}</div>
          </div>
        </div>

        <div className="profile-stats">
          {[
            { num: String(profile?.followers_count ?? 0), label: 'SEGUIDORES' },
            { num: String(profile?.following_count ?? 0), label: 'SEGUINDO' },
            { num: String(profile?.reviews_count ?? reviewsCount), label: 'RESENHAS' },
          ].map(s => (
            <div key={s.label} className="stat">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="profile-body">
        {bio && (
          <div className="profile-body-bio" style={{ fontSize: 12, color: 'var(--dim)', fontStyle: 'italic', fontFamily: 'var(--font-sans)', lineHeight: 1.55, marginBottom: 12, letterSpacing: '0.01em' }}>
            {bio}
          </div>
        )}

        <div className="profile-actions">
          <button className="profile-btn">Editar Perfil</button>
          <button className="profile-btn">Compartilhar</button>
        </div>
      </div>

      <div className="divider" />

      {/* Favoritos */}
      <div className="section-label">Favoritos</div>
      <div className="fav-grid">
        {favorites.length > 0
          ? favorites.map((fav, i) => (
              <div key={fav.id} className="fav-slot-wrap">
                <div className={`fav-slot ${i < 2 ? 'round' : ''}`}>
                  <span style={{ fontSize: 24 }}>{fav.cover_emoji ?? '🎵'}</span>
                </div>
                <div className="fav-slot-label">
                  <span>{fav.album_name ?? fav.artist_name ?? 'Favorito'}</span>
                </div>
              </div>
            ))
          : [0,1,2,3].map(i => (
              <div key={i} className="fav-slot-wrap">
                <div className={`fav-slot ${i < 2 ? 'round' : ''}`} style={{ opacity: 0.3 }}>
                  <span style={{ fontSize: 24 }}>＋</span>
                </div>
                <div className="fav-slot-label"><span style={{ opacity: 0.3 }}>Adicionar</span></div>
              </div>
            ))
        }
      </div>

      <div className="divider" />

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(255,255,255,0.06)', marginBottom: 0 }}>
        {(['hist', 'podio', 'resenhas'] as const).map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{ flex: 1, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-sans)', letterSpacing: '0.12em', textTransform: 'uppercase', color: activeSection === s ? 'var(--white)' : 'var(--muted)', borderBottom: activeSection === s ? '1.5px solid var(--white)' : '1.5px solid transparent', transition: 'color 0.14s' }}>
            {s === 'hist' ? 'Histórico' : s === 'podio' ? 'Pódio' : 'Resenhas'}
          </button>
        ))}
      </div>

      {activeSection === 'hist' && (
        <>
          {loadingData
            ? <div style={{ padding: 20, textAlign: 'center', color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-sans)' }}>Carregando...</div>
            : history.length === 0
              ? <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
                  Nenhum histórico ainda.<br />
                  <span style={{ fontSize: 11, color: 'var(--dim)', marginTop: 6, display: 'block' }}>Ouça músicas para aparecerem aqui.</span>
                </div>
              : history.map((item) => (
                  <div key={item.id} className="hist-item">
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                      {item.track?.cover_emoji ?? '🎵'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.track?.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)' }}>{item.track?.artist} · {item.track?.album}</div>
                    </div>
                    <span className="hist-time">{formatTime(item.listened_at)}</span>
                  </div>
                ))
          }
        </>
      )}

      {activeSection === 'podio' && (
        <>
          {loadingData
            ? <div style={{ padding: 20, textAlign: 'center', color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-sans)' }}>Carregando...</div>
            : topTracks.length === 0
              ? <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
                  Seu pódio aparecerá aqui<br />após ouvir músicas.
                </div>
              : topTracks.map((item, i) => (
                  <div key={item.track?.id ?? i} className="podio-item">
                    <span className="podio-rank">{i + 1}</span>
                    <div className="podio-art" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                      {item.track?.cover_emoji ?? '🎵'}
                    </div>
                    <div className="podio-info">
                      <div className="podio-title">{item.track?.title}</div>
                      <div className="podio-sub">{item.track?.artist}</div>
                    </div>
                    <span className="podio-plays">{item.plays} plays</span>
                  </div>
                ))
          }
        </>
      )}

      {activeSection === 'resenhas' && (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
          {reviewsCount === 0
            ? <>Nenhuma resenha ainda.<br /><span style={{ fontSize: 11, color: 'var(--dim)', marginTop: 6, display: 'block' }}>Toque + para adicionar sua primeira.</span></>
            : <span style={{ fontSize: 11, color: 'var(--dim)' }}>{reviewsCount} resenha{reviewsCount !== 1 ? 's' : ''}</span>
          }
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  )
}
