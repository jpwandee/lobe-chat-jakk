'use client'

import { useTheme }
import dynamic from 'next/dynamic'
import { usePathname }
import { PropsWithChildren, Suspense, memo }
import { HotkeysProvider }
import { Flexbox }

import { isDesktop }
import { BANNER_HEIGHT }
import titlebar, { TITLE_BAR_HEIGHT }
import HotkeyHelperPanel from '@/features/HotkeyHelperPanel'
import { usePlatform }
import { featureFlagsSelectors, useServerConfigStore }
import { HotkeyScopeEnum } from '@/types/hotkey'

import RegisterHotkeys from './RegisterHotkeys'
import SideBar from './SideBar'

const CloudBanner = dynamic(() => import('@/features/AlertBanner/CloudBanner'))

const Layout = memo<PropsWithChildren>(({ children }) => {
  const { isPWA } = usePlatform()
  const theme = useTheme()

  const pathname = usePathname()
  const { showCloudPromotion } = useServerConfigStore(featureFlagsSelectors)

  // setting page not show sidebar
  const hideSideBar = isDesktop && pathname.startsWith('/settings')
  return (
    <HotkeysProvider initiallyActiveScopes={[HotkeyScopeEnum.Global]}>
      {isDesktop && <TitleBar />}
      {showCloudPromotion && <CloudBanner />}
      <Flexbox
        height={
          isDesktop
            ? `calc(100% - ${TITLE_BAR_HEIGHT}px)`
            : showCloudPromotion
              ? `calc(100% - ${BANNER_HEIGHT}px)`
              : '100%'
        }
        horizontal
        style={{
          borderTop: isPWA ? `1px solid ${theme.colorBorder}` : undefined,
          position: 'relative',
        }}
        width={'100%'}
      >
        {!hideSideBar && <SideBar />}
        {isDesktop ? (
          <Flexbox
            style={{
              background: theme.colorBgLayout,
              borderInlineStart: `1px solid ${theme.colorBorderSecondary}`,
              borderStartStartRadius: !hideSideBar ? 12 : undefined,
              borderTop: `1px solid ${theme.colorBorderSecondary}`,
              overflow: 'hidden',
            }}
            width={'100%'}
          >
            {children}
          </Flexbox>
        ) : (
          children
        )}
      </Flexbox>
      <HotkeyHelperPanel />
      <Suspense>
        <RegisterHotkeys />
      </Suspense>
    </HotkeysProvider>
  )
})

Layout.displayName = 'DesktopMainLayout'

export default Layout
