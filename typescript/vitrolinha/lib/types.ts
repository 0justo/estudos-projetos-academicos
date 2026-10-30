// ─── Navegação ────────────────────────────────────────────────────────────
export type Page = 'feed' | 'buscar' | 'perfil' | 'msgs' | 'notif' | 'artist' | 'album' | 'ouUser'

// ─── Tipos legados (compatibilidade com componentes existentes) ────────────
export interface Track {
  id: string
  title: string
  artist: string
  album?: string
  coverEmoji?: string
  coverUrl?: string
  duration?: string
}

export interface UserProfile {
  name: string
  handle: string
  avatar: string
  bio: string
  nowPlaying?: Track
  followers: number
  following: number
  reviews: number
}

export interface Review {
  id: string
  user: UserProfile
  track: Track
  rating: number
  text: string
  likes: number
  timestamp: string
  pinned?: boolean
}

export interface AppState {
  currentPage: Page
  theme: 'escuro' | 'claro' | 'sistema'
  user: UserProfile | null
  isLoggedIn: boolean
  notifBadge: number
  msgsBadge: number
}
