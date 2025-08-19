'use client'

import { Icon }
import { App, Dropdown }
import { createStyles }
import { ChevronDownIcon }
import { useRouter }
import { memo, useState }
import { useTranslation }

import { SESSION_CHAT_URL }
import { useSessionStore }

import { useDetailContext }

const useStyles = createStyles(({ css }) => ({
  button: css`
    button {
      width: 100%
    }
  `,
}))

const addagent = memo< { mobile?: boolean }>(({ mobile }) => {
  const { avatar, description, tags, title, config, backgroundColor } = useDetailContext()
  const { styles } = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const createSession = useSessionStore((s) => s.createSession)
  const { message } = App.useApp()
  const router = useRouter()
  const { t } = useTranslation('discover')

  const meta = {
    avatar,
    backgroundColor,
    description,
    tags,
    title,
  }

  const handleAddAgentAndConverse = async () => {
    if (!config) return

    setIsLoading(true)
    const session = await createSession({
      config,
      meta,
    })
    setIsLoading(false)
    message.success(t('assistants.addAgentSuccess'))
    router.push(SESSION_CHAT_URL(session, mobile))
  }

  const handleAddAgent = async () => {
    if (!config) return
    setIsLoading(true)
    createSession({ config, meta }, false)
    message.success(t('assistants.addAgentSuccess'))
    setIsLoading(false)
  }

  return (
    <Dropdown.Button
      className={styles.button}
      icon={<Icon icon={ChevronDownIcon} />}
      loading={isLoading}
      menu={{
        items: [
          {
            key: 'addAgent',
            label: t('assistants.addAgent'),
            onClick: handleAddAgent,
          },
        ],
      }}
      onClick={handleAddAgentAndConverse}
      overlayStyle={{ minWidth: 267 }}
      size={'large'}
      style={{ flex: 1, width: 'unset' }}
      type={'primary'}
    >
      {t('assistants.addAgentAndConverse')}
    </Dropdown.Button>
  )
})

export default AddAgent
