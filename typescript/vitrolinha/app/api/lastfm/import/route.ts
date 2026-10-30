import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getLastfmUser, fetchAllScrobbles } from '@/lib/services/lastfm.service'
import type { Database } from '@/lib/supabase/database.types'

async function createSupabase() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

async function upsertTrack(supabase: any, t: { title: string; artist: string; album: string; coverUrl: string | null }): Promise<string | null> {
  const { data: existing } = await supabase.from('tracks').select('id').eq('title', t.title).eq('artist', t.artist).maybeSingle()
  if (existing) return existing.id
  const { data: inserted, error } = await supabase.from('tracks').insert({ title: t.title, artist: t.artist, album: t.album || null, cover_url: t.coverUrl ?? null, cover_emoji: '🎵' }).select('id').single()
  if (error) {
    const { data: retry } = await supabase.from('tracks').select('id').eq('title', t.title).eq('artist', t.artist).maybeSingle()
    return retry?.id ?? null
  }
  return inserted?.id ?? null
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabase()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })

  let body: { username?: string; maxPages?: number }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Body inválido.' }, { status: 400 }) }

  const { username, maxPages = 5 } = body
  if (!username) return NextResponse.json({ error: 'username obrigatório.' }, { status: 400 })

  let lastfmInfo
  try { lastfmInfo = await getLastfmUser(username.trim()) }
  catch { return NextResponse.json({ error: `Usuário "${username}" não encontrado no Last.fm.` }, { status: 404 }) }

  let scrobbles
  try { scrobbles = await fetchAllScrobbles(username.trim(), Math.min(maxPages, 25)) }
  catch (e: any) { return NextResponse.json({ error: `Erro ao buscar scrobbles: ${e.message}` }, { status: 502 }) }

  if (scrobbles.length === 0) return NextResponse.json({ imported: 0, skipped: 0, lastfmUser: lastfmInfo })

  let imported = 0, skipped = 0
  const BATCH = 50
  for (let i = 0; i < scrobbles.length; i += BATCH) {
    const batch = scrobbles.slice(i, i + BATCH)
    const trackIds = await Promise.all(batch.map(t => upsertTrack(supabase, t)))
    const rows = batch.map((s, idx) => ({ user_id: user.id, track_id: trackIds[idx], listened_at: s.listenedAt, source: 'lastfm' })).filter(r => r.track_id) as any[]
    if (!rows.length) continue
    const times = rows.map((r: any) => r.listened_at)
    const { data: existing } = await supabase.from('history').select('track_id, listened_at').eq('user_id', user.id).in('listened_at', times)
    const existingSet = new Set((existing ?? []).map((e: any) => `${e.track_id}|${e.listened_at}`))
    const toInsert = rows.filter((r: any) => !existingSet.has(`${r.track_id}|${r.listened_at}`))
    skipped += rows.length - toInsert.length
    if (toInsert.length > 0) {
      const { error: err } = await supabase.from('history').insert(toInsert)
      if (!err) imported += toInsert.length
    }
  }

  await supabase.from('profiles').update({ lastfm_username: username.trim() } as any).eq('id', user.id)
  return NextResponse.json({ imported, skipped, total: scrobbles.length, lastfmUser: lastfmInfo })
}
