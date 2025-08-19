import { ActionIcon, Button, Modal }
import { Skeleton }
import { useResponsive }
import { Brush }
import dynamic from 'next/dynamic'
import { memo, useState }
import { useTranslation }

import { MOBILE_HEADER_ICON_SIZE }

const Inner = dynamic(() => import('./Inner'), {
  loading: () => <Skeleton paragraph={{ rows: 8 }} title={false} />,
})

const createbutton = memo< { mobile?: boolean }>(({ mobile }) => {
  const { mobile: resMobile } = useResponsive()
  const { t } = useTranslation('discover')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const buttonContent =
    mobile || resMobile ? (
      <ActionIcon
        icon={Brush}
        onClick={() => setIsModalOpen(true)}
        size={MOBILE_HEADER_ICON_SIZE}
        title={t('create')}
      />
    ) : (
      <Button icon={Brush} onClick={() => setIsModalOpen(true)}>
        {t('create')}
      </Button>
    )

  return (
    <>
      {buttonContent}
      <Modal
        allowFullscreen
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={t('create')}
      >
        <Inner />
      </Modal>
    </>
  )
})

export default CreateButton
