'use client'

import { Alert, Button, Input, Modal, type ModalProps }
import { Divider }
import { useTheme }
import isEqual from 'fast-deep-equal'
import { kebabCase }
import qs from 'query-string'
import { memo, useState }
import { useTranslation }
import { Flexbox }

import { AGENTS_INDEX_GITHUB_ISSUE }
import AgentInfo from '@/features/AgentInfo'
import { useAgentStore }
import { agentSelectors }
import { useGlobalStore }
import { globalGeneralSelectors }
import { useSessionStore }
import { sessionMetaSelectors } from '@/store/session/selectors'

const SubmitAgentModal = memo<ModalProps>(({ open, onCancel }) => {
  const { t } = useTranslation('setting')
  const [identifier, setIdentifier] = useState('')
  const systemRole = useAgentStore(agentSelectors.currentAgentSystemRole)
  const theme = useTheme()
  const meta = useSessionStore(sessionMetaSelectors.currentAgentMeta, isEqual)
  const language = useGlobalStore(globalGeneralSelectors.currentLanguage)

  const isMetaPass = Boolean(
    meta && meta.title && meta.description && (meta.tags as string[])?.length > 0 && meta.avatar,
  )

  const handleSubmit = () => {
    const body = [
      '### systemRole',
      systemRole,
      '### identifier',
      kebabCase(identifier),
      '### avatar',
      meta.avatar,
      '### title',
      meta.title,
      '### description',
      meta.description,
      '### tags',
      (meta.tags as string[]).join(', '),
      '### locale',
      language,
    ].join('\n\n')

    const url = qs.stringifyUrl({
      query: { body, labels: '🤖 Agent PR', title: `[Agent] ${meta.title}` },
      url: AGENTS_INDEX_GITHUB_ISSUE,
    })

    window.open(url, '_blank')
  }

  return (
    <Modal
      allowFullscreen
      footer={
        <Button
          block
          disabled={!isMetaPass || !identifier}
          onClick={handleSubmit}
          size={'large'}
          type={'primary'}
        >
          {t('submitAgentModal.button')}
        </Button>
      }
      onCancel={onCancel}
      open={open}
      title={t('submitAgentModal.tooltips')}
    >
      <Flexbox gap={16}>
        {!isMetaPass && (
          <Alert message={t('submitAgentModal.metaMiss')} showIcon type={'warning'} />
        )}
        <AgentInfo meta={meta} systemRole={systemRole} />
        <Divider style={{ margin: '8px 0' }} />
        <strong>
          <span style={{ color: theme.colorError, marginRight: 4 }}>*</span>
          {t('submitAgentModal.identifier')}
        </strong>
        <Input
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={t('submitAgentModal.placeholder')}
          value={identifier}
        />
      </Flexbox>
    </Modal>
  )
})

export default SubmitAgentModal
