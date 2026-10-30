import { createClient } from '@/lib/supabase/client'
import type { Review, Track, Profile } from '@/lib/supabase/database.types'

const supabase = createClient()

export type ReviewWithDetails = Review & {
  track: Track
  profile: Profile
  liked_by_me?: boolean
}

// ─── Reviews ──────────────────────────────────────────────────────────────

export async function getFeedReviews(
  currentUserId?: string,
  limit = 20
): Promise<ReviewWithDetails[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      track:tracks (*),
      profile:profiles (*)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  if (!data) return []

  // Verifica likes do usuário atual
  if (currentUserId) {
    const reviewIds = data.map((r: any) => r.id)
    const { data: likes } = await supabase
      .from('review_likes')
      .select('review_id')
      .eq('user_id', currentUserId)
      .in('review_id', reviewIds)

    const likedSet = new Set((likes ?? []).map((l: any) => l.review_id))
    return data.map((r: any) => ({ ...r, liked_by_me: likedSet.has(r.id) }))
  }

  return data as ReviewWithDetails[]
}

export async function getUserReviews(
  userId: string
): Promise<ReviewWithDetails[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      track:tracks (*),
      profile:profiles (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as ReviewWithDetails[]
}

export async function createReview(params: {
  user_id: string
  track_id: string
  rating: number
  text?: string
}): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      user_id: params.user_id,
      track_id: params.track_id,
      rating: params.rating,
      text: params.text ?? null,
      likes_count: 0,
      pinned: false,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateReview(reviewId: string, updates: {
  rating?: number
  text?: string
}): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', reviewId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteReview(reviewId: string): Promise<void> {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)

  if (error) throw error
}

export async function toggleReviewLike(
  userId: string,
  reviewId: string,
  currentlyLiked: boolean
): Promise<void> {
  if (currentlyLiked) {
    await supabase
      .from('review_likes')
      .delete()
      .eq('user_id', userId)
      .eq('review_id', reviewId)
  } else {
    await supabase
      .from('review_likes')
      .insert({ user_id: userId, review_id: reviewId })
  }
}
