'use client'

import { ActionIcon }
import { ChatHeader }
import { useTheme }
import { Moon, Sun }
import { memo }

import { MOBILE_HEADER_ICON_SIZE }
import { useGlobalStore }
import { mobileHeaderSticky } from '@/styles/mobileHeader'

const Header = memo(() => {
  const theme = useTheme()
  const switchThemeMode = useGlobalStore((s) => s.switchThemeMode)

  return (
    <ChatHeader
      right={
        <ActionIcon
          icon={theme.isDarkMode ? Moon : Sun}
          onClick={() => switchThemeMode(theme.isDarkMode ? 'light' : 'dark')}
          size={MOBILE_HEADER_ICON_SIZE}
        />
      }
      style={mobileHeaderSticky}
    />
  )
})

export default Header
