import { createClient } from '@/lib/supabase/client'
import type { Playlist, PlaylistTrack, Track } from '@/lib/supabase/database.types'

const supabase = createClient()

export type PlaylistWithTracks = Playlist & {
  tracks: (PlaylistTrack & { track: Track })[]
}

// ─── CRUD de Playlists ────────────────────────────────────────────────────

export async function getPlaylists(userId: string): Promise<Playlist[]> {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getPlaylist(playlistId: string): Promise<PlaylistWithTracks | null> {
  const { data, error } = await supabase
    .from('playlists')
    .select(`
      *,
      tracks:playlist_tracks (
        *,
        track:tracks (*)
      )
    `)
    .eq('id', playlistId)
    .order('position', { referencedTable: 'playlist_tracks', ascending: true })
    .single()

  if (error) return null
  return data as PlaylistWithTracks
}

export async function createPlaylist(userId: string, params: {
  name: string
  description?: string
  cover_emoji?: string
  is_public?: boolean
}): Promise<Playlist> {
  const { data, error } = await supabase
    .from('playlists')
    .insert({
      user_id: userId,
      name: params.name,
      description: params.description ?? null,
      cover_emoji: params.cover_emoji ?? '🎵',
      is_public: params.is_public ?? false,
      tracks_count: 0,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePlaylist(playlistId: string, updates: {
  name?: string
  description?: string
  cover_emoji?: string
  is_public?: boolean
}): Promise<Playlist> {
  const { data, error } = await supabase
    .from('playlists')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', playlistId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePlaylist(playlistId: string): Promise<void> {
  const { error } = await supabase
    .from('playlists')
    .delete()
    .eq('id', playlistId)

  if (error) throw error
}

// ─── Faixas na Playlist ────────────────────────────────────────────────────

export async function addTrackToPlaylist(
  playlistId: string,
  trackId: string,
  userId: string
): Promise<void> {
  // Busca a posição máxima atual
  const { data: existing } = await supabase
    .from('playlist_tracks')
    .select('position')
    .eq('playlist_id', playlistId)
    .order('position', { ascending: false })
    .limit(1)

  const nextPosition = existing && existing.length > 0 ? existing[0].position + 1 : 0

  const { error } = await supabase
    .from('playlist_tracks')
    .insert({
      playlist_id: playlistId,
      track_id: trackId,
      position: nextPosition,
      added_by: userId,
    })

  if (error) throw error

  // Atualiza contador
  await supabase.rpc('increment_playlist_tracks', { playlist_id: playlistId })
}

export async function removeTrackFromPlaylist(
  playlistId: string,
  trackId: string
): Promise<void> {
  const { error } = await supabase
    .from('playlist_tracks')
    .delete()
    .eq('playlist_id', playlistId)
    .eq('track_id', trackId)

  if (error) throw error
}

export async function reorderPlaylistTracks(
  playlistId: string,
  trackIds: string[]
): Promise<void> {
  const updates = trackIds.map((trackId, index) =>
    supabase
      .from('playlist_tracks')
      .update({ position: index })
      .eq('playlist_id', playlistId)
      .eq('track_id', trackId)
  )

  await Promise.all(updates)
}
