-- ============================================================
-- VITROLINHA — Supabase Migration
-- Execute no SQL Editor do seu projeto Supabase
-- ============================================================

-- ─── Extensões ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id                   UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  handle               TEXT        NOT NULL UNIQUE,
  name                 TEXT        NOT NULL,
  bio                  TEXT,
  avatar_url           TEXT,
  avatar_emoji         TEXT        NOT NULL DEFAULT '🎵',
  followers_count      INT         NOT NULL DEFAULT 0,
  following_count      INT         NOT NULL DEFAULT 0,
  reviews_count        INT         NOT NULL DEFAULT 0,
  now_playing_track_id UUID
);

-- ─── TRACKS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tracks (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  title           TEXT        NOT NULL,
  artist          TEXT        NOT NULL,
  album           TEXT,
  cover_emoji     TEXT        NOT NULL DEFAULT '🎵',
  cover_url       TEXT,
  duration        TEXT,
  spotify_id      TEXT        UNIQUE,
  musicbrainz_id  TEXT        UNIQUE
);

-- ─── REVIEWS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  track_id    UUID        NOT NULL REFERENCES tracks(id)   ON DELETE CASCADE,
  rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT,
  likes_count INT         NOT NULL DEFAULT 0,
  pinned      BOOLEAN     NOT NULL DEFAULT false,
  UNIQUE (user_id, track_id)
);

-- ─── PLAYLISTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS playlists (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id      UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name         TEXT        NOT NULL,
  description  TEXT,
  cover_emoji  TEXT        NOT NULL DEFAULT '🎵',
  is_public    BOOLEAN     NOT NULL DEFAULT false,
  tracks_count INT         NOT NULL DEFAULT 0
);

-- ─── PLAYLIST TRACKS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS playlist_tracks (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  playlist_id UUID        NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id    UUID        NOT NULL REFERENCES tracks(id)    ON DELETE CASCADE,
  position    INT         NOT NULL DEFAULT 0,
  added_by    UUID        NOT NULL REFERENCES profiles(id)  ON DELETE CASCADE,
  UNIQUE (playlist_id, track_id)
);

-- ─── FAVORITES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS favorites (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id      UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  track_id     UUID        REFERENCES tracks(id) ON DELETE SET NULL,
  album_name   TEXT,
  artist_name  TEXT,
  cover_emoji  TEXT        NOT NULL DEFAULT '🎵',
  type         TEXT        NOT NULL CHECK (type IN ('track','album','artist')),
  position     INT         NOT NULL DEFAULT 0
);

-- ─── HISTORY ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS history (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id      UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  track_id     UUID        NOT NULL REFERENCES tracks(id)   ON DELETE CASCADE,
  listened_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  source       TEXT
);
CREATE INDEX IF NOT EXISTS history_user_id_listened_at_idx ON history (user_id, listened_at DESC);

-- ─── FOLLOWS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS follows (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  follower_id  UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  UNIQUE (follower_id, following_id),
  CHECK (follower_id <> following_id)
);

-- ─── REVIEW LIKES ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS review_likes (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id     UUID        NOT NULL REFERENCES profiles(id)  ON DELETE CASCADE,
  review_id   UUID        NOT NULL REFERENCES reviews(id)   ON DELETE CASCADE,
  UNIQUE (user_id, review_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews         ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists       ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites       ENABLE ROW LEVEL SECURITY;
ALTER TABLE history         ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows         ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_likes    ENABLE ROW LEVEL SECURITY;

-- Profiles: público para leitura, só dono edita
CREATE POLICY "profiles_select_public"  ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own"     ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own"     ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own"     ON profiles FOR DELETE USING (auth.uid() = id);

-- Tracks: público para leitura, autenticados criam
CREATE POLICY "tracks_select_public"    ON tracks FOR SELECT USING (true);
CREATE POLICY "tracks_insert_auth"      ON tracks FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Reviews: público para leitura, só dono escreve
CREATE POLICY "reviews_select_public"   ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_own"      ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update_own"      ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_delete_own"      ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Playlists: públicas legíveis se is_public=true, privadas só para dono
CREATE POLICY "playlists_select"        ON playlists FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "playlists_insert_own"    ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "playlists_update_own"    ON playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "playlists_delete_own"    ON playlists FOR DELETE USING (auth.uid() = user_id);

-- Playlist Tracks: herdado da playlist
CREATE POLICY "playlist_tracks_select"  ON playlist_tracks FOR SELECT USING (
  EXISTS (SELECT 1 FROM playlists p WHERE p.id = playlist_id AND (p.is_public = true OR auth.uid() = p.user_id))
);
CREATE POLICY "playlist_tracks_insert"  ON playlist_tracks FOR INSERT WITH CHECK (auth.uid() = added_by);
CREATE POLICY "playlist_tracks_update"  ON playlist_tracks FOR UPDATE USING (
  EXISTS (SELECT 1 FROM playlists p WHERE p.id = playlist_id AND auth.uid() = p.user_id)
);
CREATE POLICY "playlist_tracks_delete"  ON playlist_tracks FOR DELETE USING (
  EXISTS (SELECT 1 FROM playlists p WHERE p.id = playlist_id AND auth.uid() = p.user_id)
);

-- Favorites: privados, só o dono acessa
CREATE POLICY "favorites_own"           ON favorites USING (auth.uid() = user_id);

-- History: privado, só o dono acessa
CREATE POLICY "history_own"             ON history USING (auth.uid() = user_id);

-- Follows: público para leitura
CREATE POLICY "follows_select_public"   ON follows FOR SELECT USING (true);
CREATE POLICY "follows_insert_own"      ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_delete_own"      ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Review Likes: público para leitura
CREATE POLICY "review_likes_select"     ON review_likes FOR SELECT USING (true);
CREATE POLICY "review_likes_insert_own" ON review_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "review_likes_delete_own" ON review_likes FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGERS — auto-criação de perfil e contadores
-- ============================================================

-- Cria perfil automaticamente após signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  base_handle TEXT;
  final_handle TEXT;
  suffix       INT := 0;
BEGIN
  base_handle := lower(regexp_replace(
    coalesce(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    '[^a-z0-9]', '', 'g'
  ));
  base_handle := left(base_handle, 20);
  final_handle := base_handle || floor(random() * 9000 + 1000)::TEXT;

  -- Garante unicidade
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE handle = final_handle) LOOP
    suffix := suffix + 1;
    final_handle := base_handle || (floor(random() * 9000 + 1000)::INT + suffix)::TEXT;
  END LOOP;

  INSERT INTO public.profiles (id, name, handle, avatar_emoji)
  VALUES (
    NEW.id,
    coalesce(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1), 'Usuário'),
    final_handle,
    '🎵'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Atualiza contador de reviews no perfil
CREATE OR REPLACE FUNCTION update_reviews_count()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET reviews_count = reviews_count + 1 WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET reviews_count = GREATEST(reviews_count - 1, 0) WHERE id = OLD.user_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER reviews_count_trigger
  AFTER INSERT OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_reviews_count();

-- Atualiza contadores de follows
CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET following_count  = following_count  + 1 WHERE id = NEW.follower_id;
    UPDATE profiles SET followers_count  = followers_count  + 1 WHERE id = NEW.following_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET following_count  = GREATEST(following_count  - 1, 0) WHERE id = OLD.follower_id;
    UPDATE profiles SET followers_count  = GREATEST(followers_count  - 1, 0) WHERE id = OLD.following_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER follows_count_trigger
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW EXECUTE FUNCTION update_follow_counts();

-- Atualiza contador de likes nas reviews
CREATE OR REPLACE FUNCTION update_review_likes_count()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reviews SET likes_count = likes_count + 1 WHERE id = NEW.review_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reviews SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.review_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER review_likes_count_trigger
  AFTER INSERT OR DELETE ON review_likes
  FOR EACH ROW EXECUTE FUNCTION update_review_likes_count();

-- Atualiza updated_at automaticamente
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at  BEFORE UPDATE ON profiles  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER reviews_updated_at   BEFORE UPDATE ON reviews   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER playlists_updated_at BEFORE UPDATE ON playlists FOR EACH ROW EXECUTE FUNCTION set_updated_at();
