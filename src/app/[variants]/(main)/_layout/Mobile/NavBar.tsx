'use client'

import { Icon }
import { TabBar, type TabBarProps }
import { createStyles }
import { Compass, MessageSquare, User }
import { useRouter }
import { rgba }
import { memo, useMemo }
import { useTranslation }

import { MOBILE_TABBAR_HEIGHT }
import { useActiveTabKey }
import { SidebarTabKey }
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig'

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    svg {
      fill: ${rgba(token.colorPrimary, 0.33)}
    }
  `,
  container: css`
    position: fixed
    z-index: 100
    inset-block-end: 0
    inset-inline: 0
  `,
}))

const NavBar = memo(() => {
  const { t } = useTranslation('common')
  const { styles } = useStyles()
  const activeKey = useActiveTabKey()
  const router = useRouter()

  const { showMarket } = useServerConfigStore(featureFlagsSelectors)

  const items: TabBarProps['items'] = useMemo(
    () =>
      [
        {
          icon: (active: boolean) => (
            <Icon className={active ? styles.active : undefined} icon={MessageSquare} />
          ),
          key: SidebarTabKey.Chat,
          onClick: () => {
            router.push('/chat')
          },
          title: t('tab.chat'),
        },
        showMarket && {
          icon: (active: boolean) => (
            <Icon className={active ? styles.active : undefined} icon={Compass} />
          ),
          key: SidebarTabKey.Discover,
          onClick: () => {
            router.push('/discover')
          },
          title: t('tab.discover'),
        },
        {
          icon: (active: boolean) => (
            <Icon className={active ? styles.active : undefined} icon={User} />
          ),
          key: SidebarTabKey.Me,
          onClick: () => {
            router.push('/me')
          },
          title: t('tab.me'),
        },
      ].filter(Boolean) as TabBarProps['items'],
    [t],
  )

  return (
    <TabBar
      activeKey={activeKey}
      className={styles.container}
      height={MOBILE_TABBAR_HEIGHT}
      items={items}
    />
  )
})

NavBar.displayName = 'NavBar'

export default NavBar
