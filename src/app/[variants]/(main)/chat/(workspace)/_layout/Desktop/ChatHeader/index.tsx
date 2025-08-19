'use client'

import { ChatHeader }

import { useGlobalStore }
import { systemStatusSelectors }

import HeaderAction from './HeaderAction'
import Main from './Main'

const header = () => {
  const showHeader = useGlobalStore(systemStatusSelectors.showChatHeader)

  return (
    showHeader && (
      <ChatHeader
        left={<Main />}
        right={<HeaderAction />}
        style={{ paddingInline: 8, position: 'initial', zIndex: 11 }}
      />
    )
  )
}

export default Header
