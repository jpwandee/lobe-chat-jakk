'use client'

import { SideNav }
import { useTheme }
import { Suspense, memo }

import { isDesktop }
import { useActiveTabKey }
import { usePinnedAgentState }
import { useGlobalStore }
import { systemStatusSelectors }
import { featureFlagsSelectors, useServerConfigStore }
import { electronStylish }

import Avatar from './Avatar'
import BottomActions from './BottomActions'
import PinList from './PinList'
import TopActions from './TopActions'

const top = () => {
  const [isPinned] = usePinnedAgentState()
  const sidebarKey = useActiveTabKey()

  return <topactions ispinned={isPinned}
  tab={sidebarKey} />
}

const Nav = memo(() => {
  const theme = useTheme()
  const inZenMode = useGlobalStore(systemStatusSelectors.inZenMode)
  const { showPinList } = useServerConfigStore(featureFlagsSelectors)

  return (
    !inZenMode && (
      <SideNav
        avatar={
          <div className={electronStylish.nodrag}>
            <Avatar />
          </div>
        }
        bottomActions={
          <div className={electronStylish.nodrag}>
            <BottomActions />
          </div>
        }
        className={electronStylish.draggable}
        style={{
          height: '100%',
          zIndex: 100,
          ...(isDesktop
            ? { background: 'transparent', borderInlineEnd: 0, paddingBlockStart: 8 }
            : { background: theme.colorBgLayout }),
        }}
        topActions={
          <Suspense>
            <div className={electronStylish.nodrag}>
              <Top />
              {showPinList && <PinList />}
            </div>
          </Suspense>
        }
      />
    )
  )
})

Nav.displayName = 'DesktopNav'

export default Nav
