const DEEZER_BASE = 'https://api.deezer.com'

export interface DeezerTrack {
  id: number; title: string; duration: number; preview: string; link: string
  artist: DeezerArtist; album: DeezerAlbum
}
export interface DeezerArtist {
  id: number; name: string; picture: string; picture_small: string
  picture_medium: string; picture_big: string; link: string; nb_fan?: number
}
export interface DeezerAlbum {
  id: number; title: string; cover: string; cover_small: string
  cover_medium: string; cover_big: string; link: string
  release_date?: string; nb_tracks?: number
}
export interface DeezerSearchResults {
  tracks: DeezerTrack[]; artists: DeezerArtist[]; albums: DeezerAlbum[]
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${DEEZER_BASE}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Deezer HTTP ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(`Deezer erro ${json.error.code}: ${json.error.message}`)
  return json as T
}

interface DeezerList<T> { data: T[]; total: number }

export async function search(query: string, limit = 10): Promise<DeezerSearchResults> {
  const q = encodeURIComponent(query.trim())
  if (!q) return { tracks: [], artists: [], albums: [] }
  const [t, a, al] = await Promise.allSettled([
    apiFetch<DeezerList<DeezerTrack>>(`/search/track?q=${q}&limit=${limit}`),
    apiFetch<DeezerList<DeezerArtist>>(`/search/artist?q=${q}&limit=${limit}`),
    apiFetch<DeezerList<DeezerAlbum>>(`/search/album?q=${q}&limit=${limit}`),
  ])
  return {
    tracks:  t.status  === 'fulfilled' ? t.value.data  : [],
    artists: a.status  === 'fulfilled' ? a.value.data  : [],
    albums:  al.status === 'fulfilled' ? al.value.data : [],
  }
}

export async function getArtistTopTracks(artistId: number, limit = 10): Promise<DeezerTrack[]> {
  const data = await apiFetch<DeezerList<DeezerTrack>>(`/artist/${artistId}/top?limit=${limit}`)
  return data.data ?? []
}

export async function getAlbum(albumId: number): Promise<{ album: DeezerAlbum; tracks: DeezerTrack[] }> {
  const [album, tracksData] = await Promise.all([
    apiFetch<DeezerAlbum>(`/album/${albumId}`),
    apiFetch<DeezerList<DeezerTrack>>(`/album/${albumId}/tracks`),
  ])
  const tracks = (tracksData.data ?? []).map(t => ({ ...t, album }))
  return { album, tracks }
}
