import type { Metadata, Viewport } from 'next'
import './globals.css'
import InstallPrompt from '@/components/pwa/InstallPrompt'

export const metadata: Metadata = {
  title: 'VITROLINHA',
  description: 'Sua jukebox social. Resenhe, descubra, compartilhe.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'VITROLINHA' },
  other: { 'mobile-web-app-capable': 'yes' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  themeColor: '#070707',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){
          var mq=window.matchMedia('(prefers-color-scheme: light)');
          var saved=null,userChose=null;
          try{saved=localStorage.getItem('vitrolinha-theme');userChose=localStorage.getItem('vitrolinha-theme-user-set');}catch(e){}
          var theme=(userChose==='1'&&saved&&saved!=='sistema')?saved:'sistema';
          var effective=theme==='sistema'?(mq.matches?'claro':'escuro'):theme;
          document.documentElement.setAttribute('data-theme',effective);
          document.documentElement.style.background=effective==='claro'?'#F5F6F7':'#070707';
        })();` }} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512x512.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Pular para conteúdo</a>
        <div id="main-content">{children}</div>
        <InstallPrompt />
      </body>
    </html>
  )
}
