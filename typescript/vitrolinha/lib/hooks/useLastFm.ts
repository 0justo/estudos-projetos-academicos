'use client'
import { useState, useEffect } from 'react'
import type { LastfmTrack } from '@/lib/services/lastfm.service'

interface UseLastFmResult {
  recentTracks: LastfmTrack[]
  loading: boolean
  error: string | null
}

export function useLastFm(lastfmUsername: string | null | undefined): UseLastFmResult {
  const [recentTracks, setRecentTracks] = useState<LastfmTrack[]>([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)

  useEffect(() => {
    if (!lastfmUsername) { setRecentTracks([]); return }
    let cancelled = false
    setLoading(true); setError(null)
    fetch(`/api/lastfm/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: lastfmUsername, maxPages: 1 }),
    })
      .then(r => r.json())
      .then(data => { if (!cancelled) setRecentTracks(data.tracks ?? []) })
      .catch(e => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [lastfmUsername])

  return { recentTracks, loading, error }
}
