import { createClient } from '@/lib/supabase/client'
import type { Track } from '@/lib/supabase/database.types'

const supabase = createClient()

// ─── Tracks ───────────────────────────────────────────────────────────────

export async function getTrack(trackId: string): Promise<Track | null> {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', trackId)
    .single()

  if (error) return null
  return data
}

export async function searchTracks(query: string, limit = 20): Promise<Track[]> {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .or(`title.ilike.%${query}%,artist.ilike.%${query}%,album.ilike.%${query}%`)
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function upsertTrack(track: {
  title: string
  artist: string
  album?: string
  cover_emoji?: string
  cover_url?: string
  duration?: string
  spotify_id?: string
}): Promise<Track> {
  // Tenta encontrar por spotify_id primeiro, depois por título+artista
  if (track.spotify_id) {
    const { data } = await supabase
      .from('tracks')
      .select('*')
      .eq('spotify_id', track.spotify_id)
      .single()

    if (data) return data
  }

  const { data, error } = await supabase
    .from('tracks')
    .upsert(
      {
        title: track.title,
        artist: track.artist,
        album: track.album ?? null,
        cover_emoji: track.cover_emoji ?? '🎵',
        cover_url: track.cover_url ?? null,
        duration: track.duration ?? null,
        spotify_id: track.spotify_id ?? null,
      },
      { onConflict: 'spotify_id', ignoreDuplicates: false }
    )
    .select()
    .single()

  if (error) throw error
  return data
}
