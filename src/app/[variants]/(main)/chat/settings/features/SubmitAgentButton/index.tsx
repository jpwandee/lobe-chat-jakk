import { ActionIcon, Button }
import { Share2 }
import { memo, useState }
import { useTranslation }

import { HEADER_ICON_SIZE }
import { useServerConfigStore }

import SubmitAgentModal from './SubmitAgentModal'

const submitagentbutton = memo< { modal?: boolean }>(({ modal }) => {
  const { t } = useTranslation('setting')
  const mobile = useServerConfigStore((s) => s.isMobile)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {modal ? (
        <Button block icon={Share2} onClick={() => setIsModalOpen(true)} variant={'filled'}>
          {t('submitAgentModal.tooltips')}
        </Button>
      ) : (
        <ActionIcon
          icon={Share2}
          onClick={() => setIsModalOpen(true)}
          size={HEADER_ICON_SIZE(mobile)}
          title={t('submitAgentModal.tooltips')}
        />
      )}
      <SubmitAgentModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  )
})

export default SubmitAgentButton
