import { createClient } from '@/lib/supabase/client'
import type { HistoryEntry, Track } from '@/lib/supabase/database.types'

const supabase = createClient()

export type HistoryEntryWithTrack = HistoryEntry & { track: Track }

// ─── Histórico ────────────────────────────────────────────────────────────

export async function getHistory(
  userId: string,
  limit = 50
): Promise<HistoryEntryWithTrack[]> {
  const { data, error } = await supabase
    .from('history')
    .select(`
      *,
      track:tracks (*)
    `)
    .eq('user_id', userId)
    .order('listened_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as HistoryEntryWithTrack[]
}

export async function addToHistory(
  userId: string,
  trackId: string,
  source?: string
): Promise<void> {
  const { error } = await supabase
    .from('history')
    .insert({
      user_id: userId,
      track_id: trackId,
      listened_at: new Date().toISOString(),
      source: source ?? null,
    })

  if (error) throw error
}

export async function clearHistory(userId: string): Promise<void> {
  const { error } = await supabase
    .from('history')
    .delete()
    .eq('user_id', userId)

  if (error) throw error
}

export async function removeFromHistory(historyId: string): Promise<void> {
  const { error } = await supabase
    .from('history')
    .delete()
    .eq('id', historyId)

  if (error) throw error
}

// ─── Pódio (top plays) ────────────────────────────────────────────────────

export async function getTopTracks(
  userId: string,
  limit = 5
): Promise<{ track: Track; plays: number }[]> {
  const { data, error } = await supabase
    .from('history')
    .select(`
      track_id,
      track:tracks (*)
    `)
    .eq('user_id', userId)

  if (error) throw error
  if (!data) return []

  // Agrupa e conta por track_id no cliente
  const counts: Record<string, { track: Track; plays: number }> = {}

  for (const entry of data as any[]) {
    const id = entry.track_id
    if (!counts[id]) {
      counts[id] = { track: entry.track, plays: 0 }
    }
    counts[id].plays++
  }

  return Object.values(counts)
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit)
}
