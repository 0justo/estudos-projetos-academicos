'use client'
import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { DeezerTrack } from '@/lib/services/deezer.service'

export type DeezerPlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended'

interface DeezerContextValue {
  currentTrack: DeezerTrack | null
  playerState: DeezerPlayerState
  progress: number
  play: (track: DeezerTrack) => void
  pause: () => void
  resume: () => void
  stop: () => void
}

const DeezerContext = createContext<DeezerContextValue | null>(null)

export function useDeezer() {
  const ctx = useContext(DeezerContext)
  if (!ctx) throw new Error('useDeezer deve ser usado dentro de DeezerProvider')
  return ctx
}

export function DeezerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<DeezerTrack | null>(null)
  const [playerState, setPlayerState] = useState<DeezerPlayerState>('idle')
  const [progress, setProgress] = useState(0)

  function getAudio() {
    if (!audioRef.current) { audioRef.current = new Audio(); audioRef.current.preload = 'none' }
    return audioRef.current
  }

  useEffect(() => {
    const audio = getAudio()
    const onTimeUpdate = () => { if (audio.duration > 0) setProgress(audio.currentTime / audio.duration) }
    const onEnded = () => { setPlayerState('ended'); setProgress(1); setTimeout(() => { setPlayerState('idle'); setProgress(0); setCurrentTrack(null) }, 800) }
    const onError = () => setPlayerState('idle')
    const onCanPlay = () => setPlayerState(prev => prev === 'loading' ? 'playing' : prev)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    audio.addEventListener('canplay', onCanPlay)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplay', onCanPlay)
    }
  }, [])

  const stopAudio = useCallback(() => { const a = getAudio(); a.pause(); a.currentTime = 0 }, [])

  const play = useCallback((track: DeezerTrack) => {
    const audio = getAudio()
    if (currentTrack?.id === track.id && playerState === 'paused') { audio.play().catch(() => {}); setPlayerState('playing'); return }
    stopAudio(); setProgress(0); setCurrentTrack(track); setPlayerState('loading')
    audio.src = track.preview
    audio.play().catch(() => setPlayerState('idle'))
  }, [currentTrack, playerState, stopAudio])

  const pause = useCallback(() => { getAudio().pause(); setPlayerState('paused') }, [])
  const resume = useCallback(() => { getAudio().play().catch(() => {}); setPlayerState('playing') }, [])
  const stop = useCallback(() => { stopAudio(); setPlayerState('idle'); setProgress(0); setCurrentTrack(null) }, [stopAudio])

  return (
    <DeezerContext.Provider value={{ currentTrack, playerState, progress, play, pause, resume, stop }}>
      {children}
    </DeezerContext.Provider>
  )
}
