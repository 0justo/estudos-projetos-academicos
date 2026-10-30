'use client'
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from '@/lib/context/AuthContext'
import { SpotifyProvider, useSpotify } from '@/lib/context/SpotifyContext'
import { DeezerProvider } from '@/lib/context/DeezerContext'
import { signOut } from '@/lib/services/auth.service'
import { exchangeCodeForToken } from '@/lib/services/spotify.service'
import { useTheme } from '@/lib/hooks'
import TopBar from '@/components/layout/TopBar'
import BottomNavigation from '@/components/layout/BottomNavigation'
import type { Page } from '@/lib/types'

const FeedPage          = lazy(() => import('@/components/pages/FeedPage'))
const SpotifySearchPage = lazy(() => import('@/components/pages/SpotifySearchPage'))
const ProfilePage       = lazy(() => import('@/components/pages/ProfilePage'))
const MsgsPage          = lazy(() => import('@/components/pages/MsgsPage'))
const LoginScreen       = lazy(() => import('@/components/modals/LoginScreen'))
const SettingsModal     = lazy(() => import('@/components/modals/SettingsModal'))
const ReviewModal       = lazy(() => import('@/components/modals/ReviewModal'))
const SpotifyPlayer     = lazy(() => import('@/components/player/SpotifyPlayer'))
const NowPlayingModal   = lazy(() => import('@/components/spotify/NowPlayingModal'))
const LastfmImportModal = lazy(() => import('@/components/modals/LastfmImportModal'))

function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-hidden="true">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.06}s` }} />
      ))}
    </div>
  )
}

function Splash() {
  return (
    <div className="splash" role="status" aria-label="Carregando Vitrolinha">
      <span className="brand" style={{ opacity: 0.3 }}>VITROLINHA</span>
    </div>
  )
}

function AppShell() {
  const { user, loading } = useAuth()
  const { player, isConnected } = useSpotify()
  const { theme, setTheme } = useTheme()
  const [currentPage, setCurrentPage]       = useState<Page>('feed')
  const [settingsOpen, setSettingsOpen]     = useState(false)
  const [reviewOpen, setReviewOpen]         = useState(false)
  const [nowPlayingOpen, setNowPlayingOpen] = useState(false)
  const [lastfmOpen, setLastfmOpen]         = useState(false)

  // Handle Spotify OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('spotify_code')
    if (!code) return
    const url = new URL(window.location.href)
    url.searchParams.delete('spotify_code')
    window.history.replaceState({}, '', url.toString())
    exchangeCodeForToken(code).catch(console.error)
  }, [])

  // Handle shortcut from manifest (/?action=review)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('action') === 'review') {
      setReviewOpen(true)
      window.history.replaceState({}, '', '/')
    }
    if (params.get('page')) {
      const p = params.get('page') as Page
      setCurrentPage(p)
      window.history.replaceState({}, '', '/')
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    try { await signOut() } catch {}
    setSettingsOpen(false)
  }, [])

  if (loading) return <Splash />

  if (!user) {
    return (
      <Suspense fallback={<Splash />}>
        <LoginScreen onLogin={() => {}} />
      </Suspense>
    )
  }

  return (
    <>
      <div className="app-shell">
        <TopBar
          onBrandClick={() => setCurrentPage('feed')}
          onSettingsClick={() => setSettingsOpen(true)}
          showSettings={currentPage === 'perfil'}
        />

        <main id="main-content" className="content-area" aria-label={`Página ${currentPage}`}>
          <Suspense fallback={<PageSkeleton />}>
            {currentPage === 'feed'   && <FeedPage />}
            {currentPage === 'buscar' && <SpotifySearchPage />}
            {currentPage === 'perfil' && <ProfilePage onImportLastfm={() => setLastfmOpen(true)} />}
            {currentPage === 'msgs'   && <MsgsPage />}
          </Suspense>
        </main>

        {isConnected && player.track && (
          <Suspense fallback={null}>
            <SpotifyPlayer onTrackClick={() => setNowPlayingOpen(true)} />
          </Suspense>
        )}

        <BottomNavigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onFabClick={() => setReviewOpen(true)}
        />
      </div>

      <Suspense fallback={null}>
        {settingsOpen && (
          <SettingsModal
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            theme={theme}
            onThemeChange={setTheme}
            onSignOut={handleSignOut}
            onImportLastfm={() => { setSettingsOpen(false); setLastfmOpen(true) }}
          />
        )}
        {reviewOpen && (
          <ReviewModal open={reviewOpen} onClose={() => setReviewOpen(false)} />
        )}
        {nowPlayingOpen && (
          <NowPlayingModal open={nowPlayingOpen} onClose={() => setNowPlayingOpen(false)} />
        )}
        {lastfmOpen && (
          <LastfmImportModal
            onClose={() => setLastfmOpen(false)}
            onSuccess={(n) => console.log(`Last.fm: ${n} importados`)}
          />
        )}
      </Suspense>
    </>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <SpotifyProvider>
        <DeezerProvider>
          <AppShell />
        </DeezerProvider>
      </SpotifyProvider>
    </AuthProvider>
  )
}
