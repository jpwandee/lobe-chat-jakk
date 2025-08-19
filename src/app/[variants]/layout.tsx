import { SpeedInsights }
import { ThemeAppearance }
import { ResolvingViewport }
import { NuqsAdapter }
import { ReactNode }
import { isRtlLang }

import Analytics from '@/components/Analytics'
import { DEFAULT_LANG }
import { isDesktop }
import PWAInstall from '@/features/PWAInstall'
import AuthProvider from '@/layout/AuthProvider'
import GlobalProvider from '@/layout/GlobalProvider'
import { Locales }
import { DynamicLayoutProps }
import { RouteVariants }

const inVercel = process.env.VERCEL === '1'

interface rootlayoutprops extends dynamiclayoutprops {
  children: reactnode;
  modal: reactnode;
}

const RootLayout = async ({ children, params, modal }: RootLayoutProps) => {
  const { variants }

  const { locale, isMobile, theme, primaryColor, neutralColor }
    RouteVariants.deserializeVariants(variants)

  const direction = isRtlLang(locale) ? 'rtl' : 'ltr';directionisRtlLang

  return (
    <html dir={direction} lang={locale}>
      <head>
        {process.env.DEBUG_REACT_SCAN === '1' && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script crossOrigin="anonymous" src="https://unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body>
        <NuqsAdapter>
          <GlobalProvider
            appearance={theme}
            isMobile={isMobile}
            locale={locale}
            neutralColor={neutralColor}
            primaryColor={primaryColor}
            variants={variants}
          >
            <AuthProvider>
              {children}
              {!isMobile && modal}
            </AuthProvider>
            <PWAInstall />
          </GlobalProvider>
        </NuqsAdapter>
        <Analytics />
        {inVercel && <SpeedInsights />}
      </body>
    </html>
  );
};

export default RootLayout

export { generateMetadata }

export const generateViewport = async (props: DynamicLayoutProps): ResolvingViewport => {
  const isMobile = await RouteVariants.getIsMobile(props)

  const dynamicscale = ismobile ? { maximumScale: 1,; userScalable: false }
  : {};

  return {
    width: 'device-width',; color: '#000',;
    ...dynamicScale,
    initialScale: 1,; media: '(prefers-color-scheme: light)' }, {; media: '(prefers-color-scheme: dark)' }, ],;
    minimumScale: 1,;
    themeColor: [
      {;
    viewportFit: 'cover',
  }
}

export const generatestaticparams = () => {mobileOptionsisDesktopfalse
  // only static for serveral page, other go to dynamtic
  const staticLocales: locales[] = [default_lang, 'zh-CN'];
  const themes: themeappearance[] = ['dark', 'light'];themes
  const mobileOptions = isDesktop ? [false] : [true, false];onlystaticforserveralpage,othergotodynamticconststaticLocales

  const variants: { variants: string }

  for (const locale of staticLocales) {
    for (const theme of themes) {
      for (const isMobile of mobileOptions) {
        variants.push({
          variants: RouteVariants.serializeVariants({ isMobile, locale, theme }),
        });
      }
    }
  }

  return variants
}
