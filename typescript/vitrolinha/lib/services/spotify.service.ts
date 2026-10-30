// ─── Spotify API Service ──────────────────────────────────────────────────

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!
const REDIRECT_URI =
  typeof window !== 'undefined'
    ? `${window.location.origin}/auth/spotify/callback`
    : ''

const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-top-read',
  'user-library-read',
].join(' ')

// ─── PKCE helpers ──────────────────────────────────────────────────────────

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  let result = ''
  const arr = new Uint8Array(length)
  crypto.getRandomValues(arr)
  arr.forEach(b => (result += chars[b % chars.length]))
  return result
}

async function generateCodeChallenge(verifier: string) {
  const enc = new TextEncoder().encode(verifier)
  const hash = await crypto.subtle.digest('SHA-256', enc)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// ─── Auth ──────────────────────────────────────────────────────────────────

export async function initiateSpotifyLogin() {
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)
  sessionStorage.setItem('spotify_verifier', verifier)

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: SCOPES,
  })

  window.location.href = `https://accounts.spotify.com/authorize?${params}`
}

export async function exchangeCodeForToken(code: string) {
  const verifier = sessionStorage.getItem('spotify_verifier')
  if (!verifier) throw new Error('No verifier found')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    }),
  })

  if (!res.ok) throw new Error('Token exchange failed')
  const data = await res.json()

  const expiresAt = Date.now() + data.expires_in * 1000
  localStorage.setItem('spotify_access_token', data.access_token)
  localStorage.setItem('spotify_refresh_token', data.refresh_token)
  localStorage.setItem('spotify_expires_at', String(expiresAt))
  sessionStorage.removeItem('spotify_verifier')

  return data.access_token as string
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('spotify_refresh_token')
  if (!refreshToken) throw new Error('No refresh token')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!res.ok) throw new Error('Refresh failed')
  const data = await res.json()

  const expiresAt = Date.now() + data.expires_in * 1000
  localStorage.setItem('spotify_access_token', data.access_token)
  localStorage.setItem('spotify_expires_at', String(expiresAt))
  if (data.refresh_token) {
    localStorage.setItem('spotify_refresh_token', data.refresh_token)
  }

  return data.access_token as string
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  const token = localStorage.getItem('spotify_access_token')
  const expiresAt = Number(localStorage.getItem('spotify_expires_at') || 0)
  if (!token || Date.now() >= expiresAt - 60_000) return null
  return token
}

export async function getValidToken(): Promise<string | null> {
  const token = getStoredToken()
  if (token) return token
  try { return await refreshAccessToken() } catch { return null }
}

export function clearSpotifySession() {
  localStorage.removeItem('spotify_access_token')
  localStorage.removeItem('spotify_refresh_token')
  localStorage.removeItem('spotify_expires_at')
}

// ─── API fetch helper ──────────────────────────────────────────────────────

async function spotifyFetch(path: string, options?: RequestInit) {
  const token = await getValidToken()
  if (!token) throw new Error('Not authenticated')

  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })

  if (res.status === 204) return null
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Spotify API error ${res.status}`)
  }
  return res.json()
}

// ─── User ──────────────────────────────────────────────────────────────────

export interface SpotifyUser {
  id: string
  display_name: string
  email: string
  images: { url: string }[]
  followers: { total: number }
  product: string
}

export async function getSpotifyUser(): Promise<SpotifyUser> {
  return spotifyFetch('/me')
}

// ─── Search ───────────────────────────────────────────────────────────────

export interface SpotifyTrack {
  id: string
  name: string
  artists: { id: string; name: string }[]
  album: { id: string; name: string; images: { url: string }[] }
  duration_ms: number
  preview_url: string | null
  uri: string
  explicit: boolean
}

export interface SpotifyArtist {
  id: string
  name: string
  images: { url: string }[]
  followers: { total: number }
  genres: string[]
  popularity: number
  uri: string
}

export interface SpotifyAlbum {
  id: string
  name: string
  artists: { id: string; name: string }[]
  images: { url: string }[]
  release_date: string
  total_tracks: number
  uri: string
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: { url: string }[]
  owner: { display_name: string }
  tracks: { total: number }
  uri: string
}

export interface SearchResults {
  tracks: SpotifyTrack[]
  artists: SpotifyArtist[]
  albums: SpotifyAlbum[]
  playlists: SpotifyPlaylist[]
}

export async function search(query: string, types = ['track', 'artist', 'album', 'playlist'], limit = 6): Promise<SearchResults> {
  const params = new URLSearchParams({ q: query, type: types.join(','), limit: String(limit) })
  const data = await spotifyFetch(`/search?${params}`)
  return {
    tracks:    data.tracks?.items    ?? [],
    artists:   data.artists?.items   ?? [],
    albums:    data.albums?.items    ?? [],
    playlists: data.playlists?.items ?? [],
  }
}

// ─── Artist ───────────────────────────────────────────────────────────────

export async function getArtist(id: string): Promise<SpotifyArtist> {
  return spotifyFetch(`/artists/${id}`)
}

export async function getArtistTopTracks(id: string): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch(`/artists/${id}/top-tracks?market=BR`)
  return data.tracks ?? []
}

export async function getArtistAlbums(id: string): Promise<SpotifyAlbum[]> {
  const data = await spotifyFetch(`/artists/${id}/albums?include_groups=album,single&market=BR&limit=10`)
  return data.items ?? []
}

// ─── Album ────────────────────────────────────────────────────────────────

export interface SpotifyAlbumFull extends SpotifyAlbum {
  tracks: { items: SpotifyTrack[] }
}

export async function getAlbum(id: string): Promise<SpotifyAlbumFull> {
  return spotifyFetch(`/albums/${id}?market=BR`)
}

// ─── Playlists ────────────────────────────────────────────────────────────

export interface SpotifyPlaylistFull extends SpotifyPlaylist {
  tracks: { items: { track: SpotifyTrack }[] }
}

export async function getPlaylist(id: string): Promise<SpotifyPlaylistFull> {
  return spotifyFetch(`/playlists/${id}?market=BR`)
}

export async function getUserPlaylists(): Promise<SpotifyPlaylist[]> {
  const data = await spotifyFetch('/me/playlists?limit=20')
  return data.items ?? []
}

// ─── Player ───────────────────────────────────────────────────────────────

export async function getPlaybackState() {
  return spotifyFetch('/me/player?market=BR')
}

export async function playTrack(uri: string, deviceId?: string) {
  const params = deviceId ? `?device_id=${deviceId}` : ''
  return spotifyFetch(`/me/player/play${params}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [uri] }),
  })
}

export async function playContext(contextUri: string, offset?: number, deviceId?: string) {
  const params = deviceId ? `?device_id=${deviceId}` : ''
  return spotifyFetch(`/me/player/play${params}`, {
    method: 'PUT',
    body: JSON.stringify({
      context_uri: contextUri,
      ...(offset !== undefined ? { offset: { position: offset } } : {}),
    }),
  })
}

export async function pausePlayback(deviceId?: string) {
  const params = deviceId ? `?device_id=${deviceId}` : ''
  return spotifyFetch(`/me/player/pause${params}`, { method: 'PUT' })
}

export async function nextTrack(deviceId?: string) {
  const params = deviceId ? `?device_id=${deviceId}` : ''
  return spotifyFetch(`/me/player/next${params}`, { method: 'POST' })
}

export async function prevTrack(deviceId?: string) {
  const params = deviceId ? `?device_id=${deviceId}` : ''
  return spotifyFetch(`/me/player/previous${params}`, { method: 'POST' })
}

export async function seek(positionMs: number, deviceId?: string) {
  const params = new URLSearchParams({ position_ms: String(positionMs) })
  if (deviceId) params.set('device_id', deviceId)
  return spotifyFetch(`/me/player/seek?${params}`, { method: 'PUT' })
}

export async function setVolume(volumePercent: number, deviceId?: string) {
  const params = new URLSearchParams({ volume_percent: String(volumePercent) })
  if (deviceId) params.set('device_id', deviceId)
  return spotifyFetch(`/me/player/volume?${params}`, { method: 'PUT' })
}

export async function transferPlayback(deviceId: string) {
  return spotifyFetch('/me/player', {
    method: 'PUT',
    body: JSON.stringify({ device_ids: [deviceId], play: true }),
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getCoverUrl(images: { url: string }[], size: 'sm' | 'md' | 'lg' = 'md'): string {
  if (!images?.length) return ''
  const sorted = [...images].sort((a: any, b: any) => (b.width ?? 0) - (a.width ?? 0))
  if (size === 'sm') return sorted[sorted.length - 1]?.url ?? sorted[0].url
  if (size === 'lg') return sorted[0].url
  return sorted[Math.floor(sorted.length / 2)]?.url ?? sorted[0].url
}

export function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.floor(n / 1_000)}k`
  return String(n)
}
