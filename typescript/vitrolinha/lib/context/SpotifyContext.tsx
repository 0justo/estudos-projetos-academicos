'use client'
import {
  createContext, useContext, useEffect, useState, useCallback, useRef,
  type ReactNode,
} from 'react'
import {
  getSpotifyUser, getValidToken, clearSpotifySession, transferPlayback,
  pausePlayback, nextTrack, prevTrack, seek as spotifySeek,
  type SpotifyUser, type SpotifyTrack,
} from '@/lib/services/spotify.service'

interface PlayerState {
  track: SpotifyTrack | null
  isPlaying: boolean
  progress: number       // 0-1
  positionMs: number
  durationMs: number
  volume: number         // 0-100
  deviceId: string | null
  isPremium: boolean
}

interface SpotifyContextValue {
  spotifyUser: SpotifyUser | null
  isConnected: boolean
  isLoading: boolean
  player: PlayerState
  connect: () => void
  disconnect: () => void
  togglePlay: () => Promise<void>
  skipNext: () => Promise<void>
  skipPrev: () => Promise<void>
  seekTo: (positionMs: number) => Promise<void>
}

const defaultPlayer: PlayerState = {
  track: null,
  isPlaying: false,
  progress: 0,
  positionMs: 0,
  durationMs: 0,
  volume: 80,
  deviceId: null,
  isPremium: false,
}

const SpotifyContext = createContext<SpotifyContextValue>({
  spotifyUser: null,
  isConnected: false,
  isLoading: true,
  player: defaultPlayer,
  connect: () => {},
  disconnect: () => {},
  togglePlay: async () => {},
  skipNext: async () => {},
  skipPrev: async () => {},
  seekTo: async () => {},
})

declare global {
  interface Window {
    Spotify: any
    onSpotifyWebPlaybackSDKReady: () => void
  }
}

export function SpotifyProvider({ children }: { children: ReactNode }) {
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [player, setPlayer] = useState<PlayerState>(defaultPlayer)
  const playerRef = useRef<any>(null)

  // ── Load SDK ──────────────────────────────────────────────────────────────
  const loadSDK = useCallback(() => {
    if (document.getElementById('spotify-sdk')) return
    const script = document.createElement('script')
    script.id = 'spotify-sdk'
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  // ── Init player after SDK loads ────────────────────────────────────────────
  const initPlayer = useCallback((token: string, isPremium: boolean) => {
    if (!isPremium || playerRef.current) return

    window.onSpotifyWebPlaybackSDKReady = () => {
      const p = new window.Spotify.Player({
        name: 'Vitrolinha',
        getOAuthToken: async (cb: (t: string) => void) => {
          const t = await getValidToken()
          if (t) cb(t)
        },
        volume: 0.8,
      })

      p.addListener('ready', ({ device_id }: { device_id: string }) => {
        setPlayer(s => ({ ...s, deviceId: device_id, isPremium: true }))
        transferPlayback(device_id).catch(() => {})
      })

      p.addListener('player_state_changed', (state: any) => {
        if (!state) return
        const track = state.track_window?.current_track
        setPlayer(s => ({
          ...s,
          track: track ? adaptSDKTrack(track) : s.track,
          isPlaying: !state.paused,
          positionMs: state.position,
          durationMs: state.duration,
          progress: state.duration ? state.position / state.duration : 0,
        }))
      })

      p.connect()
      playerRef.current = p
    }

    // SDK already loaded?
    if (window.Spotify) window.onSpotifyWebPlaybackSDKReady()
    else loadSDK()
  }, [loadSDK])

  // ── Check existing session ─────────────────────────────────────────────────
  useEffect(() => {
    const check = async () => {
      const token = await getValidToken()
      if (token) {
        try {
          const u = await getSpotifyUser()
          setSpotifyUser(u)
          setIsConnected(true)
          initPlayer(token, u.product === 'premium')
        } catch {
          clearSpotifySession()
        }
      }
      setIsLoading(false)
    }
    check()
  }, [initPlayer])

  // ── Progress ticker ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!player.isPlaying) return
    const id = setInterval(() => {
      setPlayer(s => {
        if (!s.isPlaying) return s
        const pos = Math.min(s.positionMs + 1000, s.durationMs)
        return { ...s, positionMs: pos, progress: s.durationMs ? pos / s.durationMs : 0 }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [player.isPlaying])

  const connect = useCallback(() => {
    window.location.href = '/auth/spotify'
  }, [])

  const disconnect = useCallback(() => {
    playerRef.current?.disconnect()
    playerRef.current = null
    clearSpotifySession()
    setSpotifyUser(null)
    setIsConnected(false)
    setPlayer(defaultPlayer)
  }, [])

  const togglePlay = useCallback(async () => {
    if (playerRef.current) {
      await playerRef.current.togglePlay()
    } else {
      // fallback via REST
      if (player.isPlaying) await pausePlayback(player.deviceId ?? undefined)
      // play needs a track URI — handled in player component
    }
  }, [player.isPlaying, player.deviceId])

  const skipNext = useCallback(async () => {
    if (playerRef.current) await playerRef.current.nextTrack()
    else await nextTrack(player.deviceId ?? undefined)
  }, [player.deviceId])

  const skipPrev = useCallback(async () => {
    if (playerRef.current) await playerRef.current.previousTrack()
    else await prevTrack(player.deviceId ?? undefined)
  }, [player.deviceId])

  const seekTo = useCallback(async (positionMs: number) => {
    if (playerRef.current) await playerRef.current.seek(positionMs)
    else await spotifySeek(positionMs, player.deviceId ?? undefined)
    setPlayer(s => ({ ...s, positionMs, progress: s.durationMs ? positionMs / s.durationMs : 0 }))
  }, [player.deviceId])

  return (
    <SpotifyContext.Provider value={{
      spotifyUser, isConnected, isLoading, player,
      connect, disconnect, togglePlay, skipNext, skipPrev, seekTo,
    }}>
      {children}
    </SpotifyContext.Provider>
  )
}

export function useSpotify() {
  return useContext(SpotifyContext)
}

// ── Adapts SDK track shape → SpotifyTrack ──────────────────────────────────
function adaptSDKTrack(t: any): SpotifyTrack {
  return {
    id: t.id,
    name: t.name,
    artists: t.artists?.map((a: any) => ({ id: a.uri.split(':')[2], name: a.name })) ?? [],
    album: {
      id: t.album?.uri?.split(':')[2] ?? '',
      name: t.album?.name ?? '',
      images: t.album?.images ?? [],
    },
    duration_ms: t.duration_ms,
    preview_url: null,
    uri: t.uri,
    explicit: t.is_explicit,
  }
}
