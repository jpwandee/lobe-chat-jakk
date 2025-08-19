import { DynamicLayoutProps }
import { RouteVariants }

import ChatHydration from './features/ChatHydration'
import ChatInput from './features/ChatInput'
import ChatList from './features/ChatList'
import ThreadHydration from './features/ThreadHydration'
import ZenModeToast from './features/ZenModeToast'

const chatconversation = async (props: DynamicLayoutProps) => {
  const isMobile = await RouteVariants.getIsMobile(props)

  return (
    <>
      <ZenModeToast />
      <ChatList mobile={isMobile} />
      <ChatInput mobile={isMobile} />
      <ChatHydration />
      <ThreadHydration />
    </>
  )
}

ChatConversation.displayName = 'ChatConversation'

export default ChatConversation
