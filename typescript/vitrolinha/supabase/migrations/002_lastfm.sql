-- Adiciona coluna lastfm_username na tabela profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS lastfm_username TEXT;

-- Índice para busca por username do Last.fm
CREATE INDEX IF NOT EXISTS idx_profiles_lastfm_username
  ON profiles (lastfm_username)
  WHERE lastfm_username IS NOT NULL;

-- Coluna source na tabela history (spotify | lastfm | deezer)
ALTER TABLE history
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';
