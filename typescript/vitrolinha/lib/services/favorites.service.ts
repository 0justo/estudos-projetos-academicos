import { createClient } from '@/lib/supabase/client'
import type { Favorite } from '@/lib/supabase/database.types'

const supabase = createClient()

export type FavoriteType = 'track' | 'album' | 'artist'

// ─── Favoritos ────────────────────────────────────────────────────────────

export async function getFavorites(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('position', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function addFavorite(userId: string, params: {
  type: FavoriteType
  track_id?: string
  album_name?: string
  artist_name?: string
  cover_emoji?: string
}): Promise<Favorite> {
  // Verifica posição máxima (máx 4 favoritos)
  const existing = await getFavorites(userId)
  if (existing.length >= 4) {
    throw new Error('Limite de 4 favoritos atingido')
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      type: params.type,
      track_id: params.track_id ?? null,
      album_name: params.album_name ?? null,
      artist_name: params.artist_name ?? null,
      cover_emoji: params.cover_emoji ?? '🎵',
      position: existing.length,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeFavorite(favoriteId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', favoriteId)

  if (error) throw error
}

export async function reorderFavorites(
  userId: string,
  favoriteIds: string[]
): Promise<void> {
  const updates = favoriteIds.map((id, index) =>
    supabase
      .from('favorites')
      .update({ position: index })
      .eq('id', id)
      .eq('user_id', userId)
  )

  await Promise.all(updates)
}

export async function isFavorite(userId: string, params: {
  type: FavoriteType
  track_id?: string
  album_name?: string
  artist_name?: string
}): Promise<boolean> {
  let query = supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('type', params.type)

  if (params.track_id)   query = query.eq('track_id', params.track_id)
  if (params.album_name) query = query.eq('album_name', params.album_name)
  if (params.artist_name) query = query.eq('artist_name', params.artist_name)

  const { data } = await query.limit(1)
  return (data?.length ?? 0) > 0
}
