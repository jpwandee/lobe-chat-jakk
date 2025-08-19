import { Button }
import { Plus }
import { memo }
import { useTranslation }
import { Flexbox }

import { useActionSWR }
import { useServerConfigStore }
import { useSessionStore }

const addbutton = memo< { groupId?: string }>(({ groupId }) => {
  const { t } = useTranslation('chat')
  const createSession = useSessionStore((s) => s.createSession)
  const mobile = useServerConfigStore((s) => s.isMobile)
  const { mutate, isValidating } = useActionSWR(['session.createSession', groupId], () => {
    return createSession({ group: groupId })
  })

  return (
    <Flexbox flex={1} padding={mobile ? 16 : 0}>
      <Button
        block
        icon={Plus}
        loading={isValidating}
        onClick={() => mutate()}
        style={{
          marginTop: 8,
        }}
        variant={'filled'}
      >
        {t('newAgent')}
      </Button>
    </Flexbox>
  )
})

export default AddButton
