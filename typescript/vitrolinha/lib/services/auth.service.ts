import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/database.types'

const supabase = createClient()

// ─── Autenticação ──────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error

  // Se confirmação de e-mail está ativada no Supabase, session será null
  if (!data.session && data.user && !data.user.confirmed_at) {
    throw Object.assign(new Error('EMAIL_CONFIRM_REQUIRED'), { code: 'EMAIL_CONFIRM_REQUIRED' })
  }

  return data
}

// Para habilitar login com Google:
// 1. No Google Cloud Console, crie um OAuth 2.0 Client ID
// 2. No Supabase → Authentication → Providers → Google, insira Client ID e Secret
// 3. Adicione nos Authorized redirect URIs: https://<projeto>.supabase.co/auth/v1/callback
// 4. Descomente a função abaixo e adicione o botão no LoginScreen
//
// export async function signInWithGoogle() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${window.location.origin}/auth/callback`,
//       queryParams: { access_type: 'offline', prompt: 'consent' },
//     },
//   })
//   if (error) throw error
//   return data
// }

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  if (error) throw error
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data.user
}

// ─── Perfil ────────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data
}

export async function createProfile(userId: string, name: string, email: string): Promise<Profile> {
  const baseHandle = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 20)

  const handle = `${baseHandle}${Math.floor(Math.random() * 9000) + 1000}`

  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: userId, name, handle, bio: null, avatar_emoji: '🎵' })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, updates: {
  name?: string
  handle?: string
  bio?: string
  avatar_url?: string
  avatar_emoji?: string
}) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback)
}
