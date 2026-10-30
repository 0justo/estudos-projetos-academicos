# VITROLINHA

Sua jukebox social. Resenhe, descubra, compartilhe.

---

## Setup rápido

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas chaves reais (veja seção abaixo).

### 3. Configure o banco Supabase

No painel do Supabase → **SQL Editor**, execute os arquivos na ordem:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_lastfm.sql
```

### 4. ⚠️ Desabilite confirmação de e-mail (recomendado para dev)

No painel Supabase → **Authentication → Providers → Email**:
- Desmarque **"Confirm email"**
- Salve

> Sem isso, ao criar conta o usuário precisará confirmar o e-mail antes de entrar.
> O app já trata esse caso com uma tela de aviso, mas para dev é mais prático desabilitar.

### 5. Rode

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Variáveis de ambiente

### Supabase

No painel → **Project Settings → API**:

- `NEXT_PUBLIC_SUPABASE_URL` → "Project URL"
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → "anon public" (começa com `eyJ...`)

> ⚠️ A chave anon deve ser o JWT longo (`eyJ...`), não o formato `sb_publishable_...`

### Spotify

1. Acesse [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Crie um app
3. Em **Edit Settings**, adicione Redirect URIs:
   - `http://localhost:3000/auth/spotify/callback` (dev)
   - `https://seudominio.com/auth/spotify/callback` (prod)

- `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` → Client ID do app
- `SPOTIFY_CLIENT_SECRET` → Client Secret

### Last.fm

1. Acesse [last.fm/api/account/create](https://www.last.fm/api/account/create)
2. Crie uma API key

- `LASTFM_API_KEY` → sua API key

### App URL

- `NEXT_PUBLIC_APP_URL` → `http://localhost:3000` em dev, seu domínio em prod

---

## Como funciona o cadastro

1. Usuário preenche nome, e-mail e senha
2. Se **confirmação desabilitada** no Supabase: entra direto no app ✅
3. Se **confirmação habilitada**: app mostra tela pedindo pra verificar o e-mail, depois o usuário pode clicar em "Já confirmei → Entrar"

