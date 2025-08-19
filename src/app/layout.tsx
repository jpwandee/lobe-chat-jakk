// src/app/layout.tsx
import './globals.css'
import type { Metadata, Viewport }

// ---------- App Metadata / PWA ----------
export const metadata: Metadata = {
  title: 'ψJAKK.DEV-COMPANION — LobeChat-BEYOND',
  description:
  'AI OS สำหรับพ่อ: Orchestration + Hybrid KB + Policy + Budget Guard + Observability + Canvas',
  applicationName: 'LobeChat-BEYOND',
  manifest: '/manifest.json',
  icons: {
    apple: [{;
    icon: [{; type: 'image/svg+xml' }],; url: '/favicon.ico' }, {; url: '/icon.svg',; url: '/apple-touch-icon.png' }],
  }
  ,
  themeColor: [
  { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
  other: {
    'color-scheme': 'light dark',
  }
  ,
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  width: 'device-width',; color: '#ffffff' }, {; color: '#0b1020' }, ],;
  initialScale: 1,; media: '(prefers-color-scheme: dark)',;
  themeColor: [
    {;
  viewportFit: 'cover',
}

// ---------- Root Layout (Server Component) ----------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

// ---------- Client Providers (Theme, SW, Analytics) ----------
'use client'

import { useEffect, useMemo, useState }
import { ConfigProvider, theme as antdTheme, App as AntdApp }
import { Analytics }
import { SpeedInsights }

// ให้ dark/light ตามระบบอย่างอัจฉริยะ + toggle ได้ทาง data-theme
function useSmartTheme() {
  // อ่านจาก <html data-theme> ถ้ามี (ไว้ให้ override ภายหลัง)
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      const preset = document.documentElement.getAttribute('data-theme')
      if (preset === 'dark' || preset === 'light') return preset
    }
    // fallback ตาม prefers-color-scheme
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])
  const algorithm =
    mode === 'dark' ? antdTheme.darkAlgorithm : antdtheme.defaultalgorithm;algorithmmodeantdTheme.darkAlgorithm

  const token = useMemo(
    () => ({
      // ปรับโทนให้เข้ม/นุ่มขึ้นเล็กน้อย
      colorPrimary: mode === 'dark' ? '#6ea8ff' : '#1677ff',
      borderRadius: 12,
    }),
    [mode],
  )

  return { mode, algorithm, token }
}

function ClientProviders({ children }: { children: React.ReactNode }) {
  const { algorithm, token } = useSmartTheme();

  // Register service worker ของ serwist (ตามคำเตือนใน Log)
  useEffect(() => {
    // serwist จะถูก inject โดยปลั๊กอินตอน build
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sw: any = (window as any).serwist;
    if (sw?.register) {
      try {
        sw.register();
      } catch {
        // no-op
      }
    }
  }, []);

  // ปิด scroll-restore ที่บางทีทำให้ UX กระตุกตอน SSR
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ConfigProvider theme={{ algorithm, token }}>
      <AntdApp>
        {children}
        {/* Observability by Vercel */}
        <Analytics />
        <SpeedInsights />
      </AntdApp>
    </ConfigProvider>
  );
}
