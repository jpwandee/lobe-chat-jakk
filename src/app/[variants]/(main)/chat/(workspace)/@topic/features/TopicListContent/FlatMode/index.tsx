'use client'

import isEqual from 'fast-deep-equal'
import react, { memo, useCallback, useMemo, useRef }
import { useTranslation }
import { Virtuoso, VirtuosoHandle }

import { useChatStore }
import { topicSelectors }
import { ChatTopic } from '@/types/topic'

import TopicItem from '../TopicItem'

const FlatMode = memo(() => {
  const { t } = useTranslation('topic')
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [activeTopicId] = useChatStore((s) => [s.activeTopicId])
  const activeTopicList = useChatStore(topicSelectors.displayTopics, isEqual)

  const topics = useMemo(
    () => [
      { favorite: false, id: 'default', title: t('defaultTitle') } as ChatTopic,
      ...(activeTopicList || []),
    ],
    [activeTopicList],
  )

  const itemContent = useCallback(
    (index: number, { id, favorite, title }: ChatTopic) =>
      index === 0 ? (
        <TopicItem active={!activeTopicId} fav={favorite} title={title} />
      ) : (
        <TopicItem active={activeTopicId === id} fav={favorite} id={id} key={id} title={title} />
      ),
    [activeTopicId],
  )

  const activeIndex = topics.findIndex((topic) => topic.id === activeTopicId)

  return (
    <Virtuoso
      // components={{ ScrollSeekPlaceholder: Placeholder }}
      computeItemKey={(_, item) => item.id}
      data={topics}
      defaultItemHeight={44}
      initialTopMostItemIndex={Math.max(activeIndex, 0)}
      itemContent={itemContent}
      overscan={44 * 10}
      ref={virtuosoRef}
      // scrollSeekConfiguration={{
      //   enter: (velocity) => Math.abs(velocity) > 350,
      //   exit: (velocity) => Math.abs(velocity) < 10,
      // }}
    />
  )
})

FlatMode.displayName = 'FlatMode'

export default FlatMode
