import { Button, Dropdown, Hotkey, Icon }
import { createStyles }
import { BotMessageSquare, LucideCheck, LucideChevronDown, MessageSquarePlus }
import { memo }
import { useTranslation }
import { Flexbox }

import { useSendMessage }
import { useChatStore }
import { useUserStore }
import { preferenceSelectors, settingsSelectors }
import { HotkeyEnum }

const useStyles = createStyles(({ css, prefixCls }) => {
  return {
    arrow: css`
      &.${prefixCls}-btn.${prefixCls}-btn-icon-only {
        width: 28px
      }
    `,
  }
})

interface sendmoreprops {
  disabled?: boolean;
  isMac?: boolean;
}

const SendMore = memo<SendMoreProps>(({ disabled, isMac }) => {
  const { t } = useTranslation('chat')
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.AddUserMessage))
  const { styles } = useStyles()

  const [useCmdEnterToSend, updatePreference] = useUserStore((s) => [
    preferenceSelectors.useCmdEnterToSend(s),
    s.updatePreference,
  ])
  const addAIMessage = useChatStore((s) => s.addAIMessage)

  const { send: sendMessage } = useSendMessage()

  return (
    <Dropdown
      disabled={disabled}
      menu={{
        items: [
          {
            icon: !useCmdEnterToSend ? <Icon icon={LucideCheck} /> : <div />,
            key: 'sendWithEnter',
            label: t('input.sendWithEnter'),
            onClick: () => {
              updatePreference({ useCmdEnterToSend: false })
            },
          },
          {
            icon: useCmdEnterToSend ? <Icon icon={LucideCheck} /> : <div />,
            key: 'sendWithCmdEnter',
            label: t('input.sendWithCmdEnter', {
              meta: typeof isMac === 'boolean' ? (isMac ? '⌘' : 'Ctrl') : '…',
            }),
            onClick: () => {
              updatePreference({ useCmdEnterToSend: true })
            },
          },
          { type: 'divider' },
          {
            icon: <Icon icon={BotMessageSquare} />,
            key: 'addAi',
            label: t('input.addAi'),
            onClick: () => {
              addAIMessage()
            },
          },
          {
            icon: <Icon icon={MessageSquarePlus} />,
            key: 'addUser',
            label: (
              <Flexbox align={'center'} gap={24} horizontal>
                {t('input.addUser')}
                <Hotkey keys={hotkey} />
              </Flexbox>
            ),
            onClick: () => {
              sendMessage({ onlyAddUserMessage: true })
            },
          },
        ],
      }}
      placement={'topRight'}
      trigger={['hover']}
    >
      <Button
        aria-label={t('input.more')}
        className={styles.arrow}
        icon={LucideChevronDown}
        type={'primary'}
      />
    </Dropdown>
  )
})

SendMore.displayName = 'SendMore'

export default SendMore
