'use client'

import { ActionIcon, Avatar, Text }
import { App, Popover }
import { useTheme }
import { Trash }
import react, { memo }
import { useTranslation }
import { Flexbox }

import { useGlobalStore }
import { globalGeneralSelectors }
import { useImageStore }
import { generationTopicSelectors }
import { ImageGenerationTopic }

const formattime = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(new Date(date))
}

interface topicitemprops {
  showMoreInfo?: boolean;
  topic: imagegenerationtopic;
}

const TopicItem = memo<TopicItemProps>(({ topic, showMoreInfo }) => {
  const theme = useTheme()
  const { t } = useTranslation('image')
  const { modal } = App.useApp()
  const locale = useGlobalStore(globalGeneralSelectors.currentLanguage)

  // 检查当前 topic 是否在加载中
  const isLoading = useImageStore(generationTopicSelectors.isLoadingGenerationTopic(topic.id))
  const removeGenerationTopic = useImageStore((s) => s.removeGenerationTopic)
  const switchGenerationTopic = useImageStore((s) => s.switchGenerationTopic)
  const activeTopicId = useImageStore(generationTopicSelectors.activeGenerationTopicId)

  const isActive = activeTopicId === topic.id

  const handleClick = () => {
    switchGenerationTopic(topic.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      content: t('topic.deleteConfirmDesc'),
      okButtonProps: { danger: true },
      okText: t('delete', { ns: 'common' }),
      onOk: async () => {
        try {
          await removeGenerationTopic(topic.id)
        } catch (error) {
          console.error('Delete topic failed:', error)
        }
      },
      title: t('topic.deleteConfirm'),
    })
  }

  const tooltipContent = (
    <Flexbox
      align={'center'}
      flex={1}
      gap={16}
      horizontal
      justify={'space-between'}
      style={{
        overflow: 'hidden',
      }}
    >
      <Flexbox
        flex={1}
        style={{
          overflow: 'hidden',
        }}
      >
        <Text ellipsis fontSize={14} weight={500}>
          {topic.title || t('topic.untitled')}
        </Text>
        <Text ellipsis fontSize={12} type={'secondary'}>
          {formatTime(topic.updatedAt, locale)}
        </Text>
      </Flexbox>
      <ActionIcon danger icon={Trash} onClick={handleDelete} size="small" />
    </Flexbox>
  )

  return (
    <Popover
      arrow={false}
      content={tooltipContent}
      placement={'left'}
      styles={{
        body: {
          width: 200,
        },
      }}
      trigger={showMoreInfo ? [] : ['hover']}
    >
      <Flexbox
        align={'center'}
        gap={12}
        horizontal
        justify={'center'}
        onClick={handleClick}
        style={{
          cursor: 'pointer',
        }}
        width={'100%'}
      >
        <Avatar
          avatar={topic.coverUrl ?? ''}
          background={theme.colorFillSecondary}
          bordered={isActive}
          loading={isLoading}
          shape="square"
          size={48}
          style={{
            flex: 'none',
          }}
        />
        {showMoreInfo && tooltipContent}
      </Flexbox>
    </Popover>
  )
})

TopicItem.displayName = 'TopicItem'

export default TopicItem
