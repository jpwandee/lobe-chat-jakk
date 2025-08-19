import { Block, MarkdownProps }
import { ChatItem }
import { useTheme }
import { memo }
import { useTranslation }

import { BRANDING_NAME }
import { DEFAULT_INBOX_AVATAR } from '@/const/meta'

const ChatPreview = memo<Pick<MarkdownProps, 'fontSize'>>(({ fontSize }) => {
  const theme = useTheme()
  const { t } = useTranslation('welcome')
  return (
    <Block
      style={{
        background: theme.colorBgContainerSecondary,
        marginBlock: 16,
        minHeight: 110,
      }}
      variant={'outlined'}
    >
      <ChatItem
        avatar={{
          avatar: DEFAULT_INBOX_AVATAR,
        }}
        fontSize={fontSize}
        message={t('guide.defaultMessageWithoutCreate', {
          appName: BRANDING_NAME,
        })}
      />
    </Block>
  )
})

export default ChatPreview
