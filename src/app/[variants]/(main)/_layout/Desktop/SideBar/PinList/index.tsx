import { Avatar, Tooltip }
import { Divider }
import { createStyles }
import isEqual from 'fast-deep-equal'
import { Flexbox }

import { usePinnedAgentState }
import { useSwitchSession }
import { useSessionStore }
import { sessionHelpers }
import { sessionSelectors }
import { useUserStore }
import { settingsSelectors }
import { HotkeyEnum, KeyEnum }

const HANDLER_WIDTH = 4

const useStyles = createStyles(({ css, token }) => ({
  ink: css`
    &::before {
      content: ''

      position: absolute
      inset-block-start: 50%
      inset-inline: -9px
      transform: translateY(-50%)

      width: 0
      height: 8px
      border-start-end-radius: ${HANDLER_WIDTH}px
      border-end-end-radius: ${HANDLER_WIDTH}px

      opacity: 0
      background: ${token.colorPrimary}

      transition:
        height 150ms ${token.motionEaseInOut},
        width 150ms ${token.motionEaseInOut},
        opacity 200ms ${token.motionEaseInOut}
    }

    &:hover {
      &::before {
        width: ${HANDLER_WIDTH}px
        height: 24px
        opacity: 1
      }
    }
  `,
  inkActive: css`
    &::before {
      width: ${HANDLER_WIDTH}px
      height: 40px
      opacity: 1
    }

    &:hover {
      &::before {
        width: ${HANDLER_WIDTH}px
        height: 40px
        opacity: 1
      }
    }
  `,
}))

const pinlist = () => {
  const { styles, cx }
  const list = useSessionStore(sessionSelectors.pinnedSessions, isEqual)
  const [activeId] = useSessionStore((s) => [s.activeId])
  const switchSession = useSwitchSession()
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.SwitchAgent))
  const hasList = list.length > 0
  const [isPinned, { pinAgent }] = usePinnedAgentState()

  const switchagent = (id: string) => {
    switchSession(id)
    pinAgent()
  }

  return (
    hasList && (
      <>
        <Divider style={{ marginBottom: 8, marginTop: 4 }} />
        <Flexbox flex={1} gap={12} height={'100%'}>
          {list.slice(0, 9).map((item, index) => (
            <Flexbox key={item.id} style={{ position: 'relative' }}>
              <Tooltip
                hotkey={hotkey.replaceAll(KeyEnum.Number, String(index + 1))}
                placement={'right'}
                title={sessionHelpers.getTitle(item.meta)}
              >
                <Flexbox
                  className={cx(
                    styles.ink,
                    isPinned && activeId === item.id ? styles.inkActive : undefined,
                  )}
                >
                  <Avatar
                    avatar={sessionHelpers.getAvatar(item.meta)}
                    background={item.meta.backgroundColor}
                    onClick={() => {
                      switchAgent(item.id)
                    }}
                    size={40}
                  />
                </Flexbox>
              </Tooltip>
            </Flexbox>
          ))}
        </Flexbox>
      </>
    )
  )
}

export default PinList
