// Validação de variáveis de ambiente em runtime
// Importar em qualquer server component ou API route para garantir config correta

function requireEnv(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Variável de ambiente obrigatória não definida: ${key}\nVerifique seu .env.local ou as configurações da Vercel.`)
  return val
}

// Server-side only
export const serverEnv = {
  supabaseUrl:       () => requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey:   () => requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  spotifySecret:     () => requireEnv('SPOTIFY_CLIENT_SECRET'),
  lastfmApiKey:      () => requireEnv('LASTFM_API_KEY'),
}

// Client-safe (NEXT_PUBLIC_)
export const clientEnv = {
  supabaseUrl:       process.env.NEXT_PUBLIC_SUPABASE_URL    ?? '',
  supabaseAnonKey:   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  spotifyClientId:   process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '',
  appUrl:            process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
}
