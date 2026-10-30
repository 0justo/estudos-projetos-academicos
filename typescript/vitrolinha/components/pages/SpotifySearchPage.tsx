'use client'
import { useState, useEffect, useCallback, memo } from 'react'
import SearchBar from '@/components/shared/SearchBar'
import { useSpotify } from '@/lib/context/SpotifyContext'
import { useDeezer } from '@/lib/context/DeezerContext'
import { useDebounce } from '@/lib/hooks'
import { search as deezerSearch, type DeezerTrack, type DeezerArtist, type DeezerAlbum, type DeezerSearchResults } from '@/lib/services/deezer.service'
import { search as spotifySearch, getCoverUrl, formatDuration, formatFollowers, playTrack, playContext, type SpotifyTrack, type SpotifyArtist, type SpotifyAlbum, type SpotifyPlaylist, type SearchResults } from '@/lib/services/spotify.service'
import DeezerPreviewPlayer from '@/components/player/DeezerPreviewPlayer'

type Source = 'spotify' | 'deezer'
type SpotifyTab = 'tracks' | 'artists' | 'albums' | 'playlists'

const GENRES = [
  { name: 'Rock', color: '#2d1b4e', emoji: '🎸' }, { name: 'MPB', color: '#1a3a1a', emoji: '🌿' },
  { name: 'Jazz', color: '#1a2a3a', emoji: '🎷' }, { name: 'Hip-Hop', color: '#2a1a1a', emoji: '🎤' },
  { name: 'Eletrônica', color: '#0d1a2a', emoji: '🎛️' }, { name: 'Indie', color: '#1a1a2a', emoji: '🌙' },
  { name: 'Clássica', color: '#2a2a1a', emoji: '🎻' }, { name: 'Samba', color: '#2a1a0d', emoji: '🥁' },
  { name: 'Pop', color: '#2a0d2a', emoji: '✨' }, { name: 'Metal', color: '#1a1a1a', emoji: '⚡' },
] as const

const CoverImg = memo(({ url, alt, size, radius }: { url: string; alt: string; size: number; radius: number }) => (
  <div style={{ width: size, height: size, borderRadius: radius, background: 'var(--raised)', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {url ? <img src={url} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : <span style={{ fontSize: size * 0.5 }}>🎵</span>}
  </div>
))
CoverImg.displayName = 'CoverImg'

function SpotifyTrackRow({ track, isPlaying, onPlay }: { track: SpotifyTrack; isPlaying: boolean; onPlay: () => void }) {
  return (
    <div className="album-chip" style={{ cursor: 'pointer', background: isPlaying ? 'rgba(29,185,84,0.06)' : undefined }} onClick={onPlay}>
      <CoverImg url={getCoverUrl(track.album.images, 'sm')} alt={track.album.name} size={40} radius={6} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="al-name" style={{ color: isPlaying ? '#1DB954' : undefined }}>{track.name}</div>
        <div className="al-sub">{track.artists.map(a => a.name).join(', ')} · {track.album.name}</div>
      </div>
      <span style={{ fontSize: 10, color: 'var(--dim)', fontFamily: 'var(--font-sans)', flexShrink: 0 }}>{formatDuration(track.duration_ms)}</span>
    </div>
  )
}

function SpotifyArtistRow({ artist, onPlay }: { artist: SpotifyArtist; onPlay: () => void }) {
  return (
    <div className="album-chip" style={{ cursor: 'pointer' }} onClick={onPlay}>
      <CoverImg url={getCoverUrl(artist.images, 'sm')} alt={artist.name} size={40} radius={20} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="al-name">{artist.name}</div>
        <div className="al-sub">{formatFollowers(artist.followers.total)} seguidores{artist.genres[0] ? ` · ${artist.genres[0]}` : ''}</div>
      </div>
      <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '2px 6px' }}>artista</span>
    </div>
  )
}

function SpotifyAlbumRow({ album, onPlay }: { album: SpotifyAlbum; onPlay: () => void }) {
  return (
    <div className="album-chip" style={{ cursor: 'pointer' }} onClick={onPlay}>
      <CoverImg url={getCoverUrl(album.images, 'sm')} alt={album.name} size={40} radius={6} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="al-name">{album.name}</div>
        <div className="al-sub">{album.artists.map(a => a.name).join(', ')} · {album.release_date.slice(0, 4)}</div>
      </div>
      <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '2px 6px' }}>álbum</span>
    </div>
  )
}

function SpotifyPlaylistRow({ playlist, onPlay }: { playlist: SpotifyPlaylist; onPlay: () => void }) {
  return (
    <div className="album-chip" style={{ cursor: 'pointer' }} onClick={onPlay}>
      <CoverImg url={getCoverUrl(playlist.images, 'sm')} alt={playlist.name} size={40} radius={6} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="al-name">{playlist.name}</div>
        <div className="al-sub">{playlist.owner.display_name} · {playlist.tracks.total} músicas</div>
      </div>
      <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-sans)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '2px 6px' }}>playlist</span>
    </div>
  )
}

function DeezerTrackRow({ track }: { track: DeezerTrack }) {
  return (
    <div style={{ padding: '8px 14px', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
      <DeezerPreviewPlayer track={track} />
    </div>
  )
}

export default function SpotifySearchPage() {
  const { isConnected, player } = useSpotify()
  const [source, setSource] = useState<Source>(() => isConnected ? 'spotify' : 'deezer')
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<SpotifyTab>('tracks')
  const [spotifyResults, setSpotifyResults] = useState<SearchResults | null>(null)
  const [deezerResults, setDeezerResults] = useState<DeezerSearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 380)

  useEffect(() => { if (!isConnected && source === 'spotify') setSource('deezer') }, [isConnected, source])
  useEffect(() => { if (player.track) setPlayingId(player.track.id) }, [player.track])

  useEffect(() => {
    if (!debouncedQuery.trim()) { setSpotifyResults(null); setDeezerResults(null); return }
    let cancelled = false
    setLoading(true)
    if (source === 'spotify' && isConnected) {
      spotifySearch(debouncedQuery).then(r => { if (!cancelled) setSpotifyResults(r) }).catch(() => {}).finally(() => { if (!cancelled) setLoading(false) })
    } else if (source === 'deezer') {
      deezerSearch(debouncedQuery).then(r => { if (!cancelled) setDeezerResults(r) }).catch(() => {}).finally(() => { if (!cancelled) setLoading(false) })
    } else { setLoading(false) }
    return () => { cancelled = true }
  }, [debouncedQuery, source, isConnected])

  const handlePlaySpotifyTrack = useCallback(async (t: SpotifyTrack) => {
    try { await playTrack(t.uri, player.deviceId ?? undefined); setPlayingId(t.id) } catch {}
  }, [player.deviceId])

  const handlePlayContext = useCallback(async (uri: string) => {
    try { await playContext(uri, 0, player.deviceId ?? undefined) } catch {}
  }, [player.deviceId])

  const SPOTIFY_TABS = [{ key: 'tracks' as SpotifyTab, label: 'Músicas' }, { key: 'artists' as SpotifyTab, label: 'Artistas' }, { key: 'albums' as SpotifyTab, label: 'Álbuns' }, { key: 'playlists' as SpotifyTab, label: 'Playlists' }]

  return (
    <section aria-label="Buscar músicas">
      {/* Source selector */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 4px', alignItems: 'center' }}>
        <span style={{ fontSize: 9, fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--dim)', textTransform: 'uppercase' }}>Fonte</span>
        <button onClick={() => isConnected && setSource('spotify')} disabled={!isConnected} className={`pill${source === 'spotify' ? ' active' : ''}`} style={{ background: source === 'spotify' ? '#1DB954' : undefined, borderColor: source === 'spotify' ? '#1DB954' : undefined, color: source === 'spotify' ? '#000' : undefined, opacity: !isConnected ? 0.4 : 1 }}>
          Spotify{!isConnected && ' (desconectado)'}
        </button>
        <button onClick={() => setSource('deezer')} className={`pill${source === 'deezer' ? ' active' : ''}`} style={{ background: source === 'deezer' ? '#A238FF' : undefined, borderColor: source === 'deezer' ? '#A238FF' : undefined, color: source === 'deezer' ? '#fff' : undefined }}>
          Deezer <span style={{ opacity: 0.6, fontSize: 8 }}>(prévia 30s)</span>
        </button>
      </div>

      <SearchBar value={query} onChange={setQuery} placeholder={source === 'deezer' ? 'Buscar no Deezer…' : 'Buscar no Spotify…'} />

      {!query && (
        <>
          <div className="section-label">Explorar por gênero</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px 20px' }}>
            {GENRES.map(g => (
              <div key={g.name} className="genre-card" style={{ background: g.color }} onClick={() => setQuery(g.name)} tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setQuery(g.name)}>
                <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 22 }}>{g.emoji}</span>
                <div className="genre-card-name">{g.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {query && loading && <div style={{ padding: 40, textAlign: 'center', color: 'var(--dim)', fontSize: 12 }} role="status">Buscando…</div>}

      {/* Spotify results */}
      {query && !loading && source === 'spotify' && spotifyResults && (
        <>
          <div role="tablist" style={{ display: 'flex', borderBottom: '0.5px solid var(--border)', padding: '0 16px', overflowX: 'auto' }}>
            {SPOTIFY_TABS.map(t => (
              <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)} style={{ background: 'none', border: 'none', borderBottom: tab === t.key ? '1.5px solid var(--white)' : '1.5px solid transparent', color: tab === t.key ? 'var(--white)' : 'var(--dim)', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: '0.06em', padding: '10px 12px 8px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {t.label.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ padding: '8px 0' }}>
            {tab === 'tracks'    && spotifyResults.tracks.map(t => <SpotifyTrackRow key={t.id} track={t} isPlaying={playingId === t.id} onPlay={() => handlePlaySpotifyTrack(t)} />)}
            {tab === 'artists'   && spotifyResults.artists.map(a => <SpotifyArtistRow key={a.id} artist={a} onPlay={() => handlePlayContext(a.uri)} />)}
            {tab === 'albums'    && spotifyResults.albums.map(a => <SpotifyAlbumRow key={a.id} album={a} onPlay={() => handlePlayContext(a.uri)} />)}
            {tab === 'playlists' && spotifyResults.playlists.map(p => <SpotifyPlaylistRow key={p.id} playlist={p} onPlay={() => handlePlayContext(p.uri)} />)}
          </div>
        </>
      )}

      {/* Deezer results */}
      {query && !loading && source === 'deezer' && deezerResults && (
        <div>
          {deezerResults.tracks.length > 0 && (
            <>
              <div className="section-label">Músicas <span style={{ marginLeft: 8, fontSize: 9, color: '#A238FF', background: 'rgba(162,56,255,0.12)', borderRadius: 20, padding: '2px 7px', fontWeight: 700 }}>PRÉVIA 30s</span></div>
              {deezerResults.tracks.map(t => <DeezerTrackRow key={t.id} track={t} />)}
            </>
          )}
          {deezerResults.artists.length > 0 && (
            <>
              <div className="section-label">Artistas</div>
              {deezerResults.artists.map(a => (
                <div key={a.id} className="album-chip">
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--raised)', overflow: 'hidden', flexShrink: 0 }}>
                    {a.picture_small ? <img src={a.picture_small} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>🎤</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}><div className="al-name">{a.name}</div>{a.nb_fan && <div className="al-sub">{a.nb_fan.toLocaleString('pt-BR')} fãs</div>}</div>
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: '#A238FF', fontFamily: 'var(--font-sans)', fontWeight: 600, textDecoration: 'none' }}>Ver ↗</a>
                </div>
              ))}
            </>
          )}
          {deezerResults.albums.length > 0 && (
            <>
              <div className="section-label">Álbuns</div>
              {deezerResults.albums.map(a => (
                <div key={a.id} className="album-chip">
                  <div style={{ width: 40, height: 40, borderRadius: 6, background: 'var(--raised)', overflow: 'hidden', flexShrink: 0 }}>
                    {a.cover_small ? <img src={a.cover_small} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : <span style={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>💿</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}><div className="al-name">{a.title}</div>{a.release_date && <div className="al-sub">{new Date(a.release_date).getFullYear()}{a.nb_tracks ? ` · ${a.nb_tracks} faixas` : ''}</div>}</div>
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: '#A238FF', fontFamily: 'var(--font-sans)', fontWeight: 600, textDecoration: 'none' }}>Ver ↗</a>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </section>
  )
}
