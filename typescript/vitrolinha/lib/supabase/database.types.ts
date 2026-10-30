export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          handle: string
          name: string
          bio: string | null
          avatar_url: string | null
          avatar_emoji: string | null
          followers_count: number
          following_count: number
          reviews_count: number
          now_playing_track_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          handle: string
          name: string
          bio?: string | null
          avatar_url?: string | null
          avatar_emoji?: string | null
          followers_count?: number
          following_count?: number
          reviews_count?: number
          now_playing_track_id?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          handle?: string
          name?: string
          bio?: string | null
          avatar_url?: string | null
          avatar_emoji?: string | null
          followers_count?: number
          following_count?: number
          reviews_count?: number
          now_playing_track_id?: string | null
        }
      }
      tracks: {
        Row: {
          id: string
          created_at: string
          title: string
          artist: string
          album: string | null
          cover_emoji: string | null
          cover_url: string | null
          duration: string | null
          spotify_id: string | null
          musicbrainz_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          artist: string
          album?: string | null
          cover_emoji?: string | null
          cover_url?: string | null
          duration?: string | null
          spotify_id?: string | null
          musicbrainz_id?: string | null
        }
        Update: {
          title?: string
          artist?: string
          album?: string | null
          cover_emoji?: string | null
          cover_url?: string | null
          duration?: string | null
          spotify_id?: string | null
          musicbrainz_id?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          track_id: string
          rating: number
          text: string | null
          likes_count: number
          pinned: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          track_id: string
          rating: number
          text?: string | null
          likes_count?: number
          pinned?: boolean
        }
        Update: {
          rating?: number
          text?: string | null
          likes_count?: number
          pinned?: boolean
          updated_at?: string
        }
      }
      playlists: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          description: string | null
          cover_emoji: string | null
          is_public: boolean
          tracks_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          description?: string | null
          cover_emoji?: string | null
          is_public?: boolean
          tracks_count?: number
        }
        Update: {
          name?: string
          description?: string | null
          cover_emoji?: string | null
          is_public?: boolean
          tracks_count?: number
          updated_at?: string
        }
      }
      playlist_tracks: {
        Row: {
          id: string
          created_at: string
          playlist_id: string
          track_id: string
          position: number
          added_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          playlist_id: string
          track_id: string
          position: number
          added_by: string
        }
        Update: {
          position?: number
        }
      }
      favorites: {
        Row: {
          id: string
          created_at: string
          user_id: string
          track_id: string | null
          album_name: string | null
          artist_name: string | null
          cover_emoji: string | null
          type: 'track' | 'album' | 'artist'
          position: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          track_id?: string | null
          album_name?: string | null
          artist_name?: string | null
          cover_emoji?: string | null
          type: 'track' | 'album' | 'artist'
          position?: number
        }
        Update: {
          position?: number
          cover_emoji?: string | null
        }
      }
      history: {
        Row: {
          id: string
          created_at: string
          user_id: string
          track_id: string
          listened_at: string
          source: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          track_id: string
          listened_at?: string
          source?: string | null
        }
        Update: {
          listened_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: never
      }
      review_likes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          review_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          review_id: string
        }
        Update: never
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Tipos derivados convenientes
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Track = Database['public']['Tables']['tracks']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Playlist = Database['public']['Tables']['playlists']['Row']
export type PlaylistTrack = Database['public']['Tables']['playlist_tracks']['Row']
export type Favorite = Database['public']['Tables']['favorites']['Row']
export type HistoryEntry = Database['public']['Tables']['history']['Row']
