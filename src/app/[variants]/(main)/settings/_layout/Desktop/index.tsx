'use client'

import { Tag }
import { useResponsive, useTheme }
import { usePathname }
import { memo, useRef }
import { useTranslation }
import { Flexbox }

import InitClientDB from '@/features/InitClientDB'
import Footer from '@/features/Setting/Footer'
import SettingContainer from '@/features/Setting/SettingContainer'
import { useActiveSettingsKey }
import { useProviderName }
import { SettingsTabs }

import { LayoutProps } from '../type'
import Header from './Header'
import SideBar from './SideBar'

const SKIP_PATHS = ['/settings/provider', '/settings/agent']

const Layout = memo<LayoutProps>(({ children, category }) => {
  const ref = useRef<any>(null)
  const { md = true } = useResponsive()
  const { t } = useTranslation('setting')
  const activeKey = useActiveSettingsKey()
  const theme = useTheme()
  const pathname = usePathname()

  const isSkip = SKIP_PATHS.some((path) => pathname.includes(path))
  const isProvider = pathname.includes('/settings/provider/')
  const providerName = useProviderName(activeKey)

  return (
    <Flexbox
      height={'100%'}
      horizontal={md}
      ref={ref}
      style={{ background: theme.colorBgContainer, flex: '1', position: 'relative' }}
    >
      {md ? (
        <SideBar>{category}</SideBar>
      ) : (
        <Header
          getContainer={() => ref.current}
          title={
            <>
              {isProvider ? providerName : t(`tab.${activeKey}`)}
              {activeKey === SettingsTabs.Sync && <Tag color={'gold'}>{t('tab.experiment')}</Tag>}
            </>
          }
        >
          {category}
        </Header>
      )}
      {isSkip ? children : <SettingContainer addonAfter={<Footer />}>{children}</SettingContainer>}
      <InitClientDB />
    </Flexbox>
  )
})

Layout.displayName = 'DesktopSettingsLayout'

export default Layout
