import { Block, Collapse }
import { ChatList }
import { useTheme }
import { memo }
import { useTranslation }
import { Flexbox }

import { BRANDING_NAME }
import { DEFAULT_USER_AVATAR_URL }
import { useUserStore }
import { authSelectors, userProfileSelectors }

import Title from '../../../../../../features/Title'
import { useDetailContext } from '../../DetailProvider'

const Overview = memo(() => {
  const [userAvatar, username] = useUserStore((s) => [
    userProfileSelectors.userAvatar(s),
    userProfileSelectors.username(s),
  ])

  const isSignedIn = useUserStore(authSelectors.isLogin)
  const { t } = useTranslation('discover')
  const theme = useTheme()
  const {
    examples = [],
    description,
    summary,
    avatar,
    title,
    backgroundColor,
    config,
  } = useDetailContext()

  const data: any = [
    {
      content: config?.openingMessage,
      role: 'assistant',
    },
    ...examples,
  ].map((item, index) => {
    let meta = {
      avatar,
      backgroundColor: backgroundColor || 'transparent',
      title,
    }
    if (item.role === 'user') {
      meta = {
        avatar: isSignedIn && !!userAvatar ? userAvatar : DEFAULT_USER_AVATAR_URL,
        backgroundColor: 'transparent',
        title: isSignedIn && !!username ? username : BRANDING_NAME,
      }
    }

    return {
      extra: {},
      id: index,
      ...item,
      meta,
    }
  })

  return (
    <Flexbox gap={16}>
      <Collapse
        defaultActiveKey={['summary']}
        expandIconPosition={'end'}
        items={[
          {
            children: summary || description,
            key: 'summary',
            label: t('assistants.details.summary.title'),
          },
        ]}
        variant={'outlined'}
      />
      <Title>{t('assistants.details.overview.example')}</Title>
      <Block
        style={{
          background: theme.colorBgContainerSecondary,
        }}
        variant={'outlined'}
      >
        <ChatList
          data={data}
          renderMessages={{
            default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
          }}
          style={{ width: '100%' }}
        />
      </Block>
    </Flexbox>
  )
})

export default Overview
