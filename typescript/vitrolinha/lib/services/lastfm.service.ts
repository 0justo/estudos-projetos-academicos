const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0'

export interface LastfmTrack {
  title: string; artist: string; album: string
  coverUrl: string | null; listenedAt: string
}
export interface LastfmUserInfo {
  name: string; realname: string; image: string | null; playcount: number
}

function bestImage(images: { '#text': string; size: string }[]): string | null {
  for (const size of ['extralarge', 'large', 'medium', 'small']) {
    const found = images.find(i => i.size === size && i['#text'])
    if (found) return found['#text']
  }
  return null
}

async function apiFetch<T>(params: Record<string, string>): Promise<T> {
  const key = process.env.LASTFM_API_KEY
  if (!key) throw new Error('LASTFM_API_KEY não configurada')
  const p = new URLSearchParams({ ...params, api_key: key, format: 'json' })
  const res = await fetch(`${LASTFM_BASE}?${p}`, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error(`Last.fm HTTP ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(`Last.fm erro ${json.error}: ${json.message}`)
  return json as T
}

export async function getLastfmUser(username: string): Promise<LastfmUserInfo> {
  const data = await apiFetch<{ user: any }>({ method: 'user.getinfo', user: username })
  const u = data.user
  return { name: u.name, realname: u.realname ?? '', image: bestImage(u.image ?? []), playcount: Number(u.playcount ?? 0) }
}

export async function getRecentTracks(username: string, page = 1, limit = 200) {
  const data = await apiFetch<{ recenttracks: any }>({ method: 'user.getrecenttracks', user: username, page: String(page), limit: String(Math.min(limit, 200)), extended: '0' })
  const raw = data.recenttracks.track ?? []
  const attr = data.recenttracks['@attr'] ?? {}
  const tracks: LastfmTrack[] = raw
    .filter((t: any) => !t['@attr']?.nowplaying)
    .map((t: any) => ({
      title: t.name, artist: t.artist['#text'], album: t.album['#text'],
      coverUrl: bestImage(t.image ?? []),
      listenedAt: t.date ? new Date(Number(t.date.uts) * 1000).toISOString() : 'now',
    }))
  return { tracks, totalPages: Number(attr.totalPages ?? 1), totalScrobbles: Number(attr.total ?? 0) }
}

export async function fetchAllScrobbles(username: string, maxPages = 5, onProgress?: (fetched: number, total: number) => void): Promise<LastfmTrack[]> {
  const first = await getRecentTracks(username, 1, 200)
  const pagesToFetch = Math.min(first.totalPages, maxPages)
  let all = [...first.tracks]
  onProgress?.(all.length, first.totalScrobbles)
  for (let p = 2; p <= pagesToFetch; p++) {
    const page = await getRecentTracks(username, p, 200)
    all = all.concat(page.tracks)
    onProgress?.(all.length, first.totalScrobbles)
  }
  return all
}
