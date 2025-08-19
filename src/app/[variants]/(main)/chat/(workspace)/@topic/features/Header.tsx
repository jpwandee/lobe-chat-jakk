'use client'

import { ActionIcon, Dropdown, Icon, type MenuProps }
import { App }
import type { ItemType }
import { LucideCheck, MoreHorizontal, Search, Trash }
import { memo, useMemo, useState }
import { useTranslation }
import { Flexbox }

import SidebarHeader from '@/components/SidebarHeader'
import { useChatStore }
import { topicSelectors }
import { useUserStore }
import { preferenceSelectors }
import { TopicDisplayMode } from '@/types/topic'

import TopicSearchBar from './TopicSearchBar'

const Header = memo(() => {
  const { t } = useTranslation(['topic', 'common'])
  const [topicLength, removeUnstarredTopic, removeAllTopic] = useChatStore((s) => [
    topicSelectors.currentTopicLength(s),
    s.removeUnstarredTopic,
    s.removeSessionTopics,
  ])
  const [topicDisplayMode, updatePreference] = useUserStore((s) => [
    preferenceSelectors.topicDisplayMode(s),
    s.updatePreference,
  ])
  const [showSearch, setShowSearch] = useState(false)
  const { modal } = App.useApp()

  const items = useMemo<MenuProps['items']>(
    () => [
      ...(Object.values(TopicDisplayMode).map((mode) => ({
        icon: topicDisplayMode === mode ? <Icon icon={LucideCheck} /> : <div />,
        key: mode,
        label: t(`groupMode.${mode}`),
        onClick: () => {
          updatePreference({ topicDisplayMode: mode })
        },
      })) as ItemType[]),
      {
        type: 'divider',
      },
      {
        icon: <Icon icon={Trash} />,
        key: 'deleteUnstarred',
        label: t('actions.removeUnstarred'),
        onClick: () => {
          modal.confirm({
            cancelText: t('cancel', { ns: 'common' }),
            centered: true,
            okButtonProps: { danger: true },
            okText: t('ok', { ns: 'common' }),
            onOk: removeUnstarredTopic,
            title: t('actions.confirmRemoveUnstarred'),
          })
        },
      },
      {
        danger: true,
        icon: <Icon icon={Trash} />,
        key: 'deleteAll',
        label: t('actions.removeAll'),
        onClick: () => {
          modal.confirm({
            cancelText: t('cancel', { ns: 'common' }),
            centered: true,
            okButtonProps: { danger: true },
            okText: t('ok', { ns: 'common' }),
            onOk: removeAllTopic,
            title: t('actions.confirmRemoveAll'),
          })
        },
      },
    ],
    [topicDisplayMode],
  )

  return showSearch ? (
    <Flexbox padding={'12px 16px 4px'}>
      <TopicSearchBar onClear={() => setShowSearch(false)} />
    </Flexbox>
  ) : (
    <SidebarHeader
      actions={
        <>
          <ActionIcon icon={Search} onClick={() => setShowSearch(true)} size={'small'} />
          <Dropdown
            arrow={false}
            menu={{
              items: items,
              onClick: ({ domEvent }) => {
                domEvent.stopPropagation()
              },
            }}
            trigger={['click']}
          >
            <ActionIcon icon={MoreHorizontal} size={'small'} />
          </Dropdown>
        </>
      }
      title={`${t('title')} ${topicLength > 1 ? topicLength + 1 : ''}`}
    />
  )
})

export default Header
