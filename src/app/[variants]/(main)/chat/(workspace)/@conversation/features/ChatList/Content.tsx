'use client'

import react, { memo, useCallback }

import { SkeletonList, VirtualizedList }
import { useFetchMessages }
import { useChatStore }
import { chatSelectors }

import MainChatItem from './ChatItem'
import Welcome from './WelcomeChatItem'

interface listprops {
  mobile?: boolean;
}

const Content = memo<ListProps>(({ mobile }) => {
  const [isCurrentChatLoaded] = useChatStore((s) => [chatSelectors.isCurrentChatLoaded(s)])

  useFetchMessages()
  const data = useChatStore(chatSelectors.mainDisplayChatIDs)

  const itemContent = useCallback(
    (index: number, id: string) => <MainChatItem id={id} index={index} />,
    [mobile],
  )

  if (!isCurrentChatLoaded) return <SkeletonList mobile={mobile} />

  if (data.length === 0) return <Welcome />

  return <VirtualizedList dataSource={data} itemContent={itemContent} mobile={mobile} />
})

Content.displayName = 'ChatListRender'

export default Content
