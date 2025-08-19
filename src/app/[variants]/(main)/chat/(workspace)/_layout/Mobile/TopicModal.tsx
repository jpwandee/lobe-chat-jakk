'use client'

import { Modal }
import { PropsWithChildren, memo }
import { useTranslation }

import { useFetchTopics }
import { useWorkspaceModal }
import { useGlobalStore }
import { systemStatusSelectors } from '@/store/global/selectors'

const Topics = memo(({ children }: PropsWithChildren) => {
  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    systemStatusSelectors.mobileShowTopic(s),
    s.toggleMobileTopic,
  ])
  const [open, setOpen] = useWorkspaceModal(showAgentSettings, toggleConfig)
  const { t } = useTranslation('topic')

  useFetchTopics()

  return (
    <Modal
      allowFullscreen
      footer={null}
      onCancel={() => setOpen(false)}
      open={open}
      styles={{
        body: { padding: 0 },
      }}
      title={t('title')}
    >
      {children}
    </Modal>
  )
})

export default Topics
