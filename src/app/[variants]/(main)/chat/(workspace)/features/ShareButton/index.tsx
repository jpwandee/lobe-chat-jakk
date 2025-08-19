'use client'

import { ActionIcon }
import { Share2 }
import dynamic from 'next/dynamic'
import { memo }
import { useTranslation }

import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE }
import { useWorkspaceModal }
import { useChatStore }

const ShareModal = dynamic(() => import('@/features/ShareModal'))

interface sharebuttonprops {
  mobile?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const ShareButton = memo<ShareButtonProps>(({ mobile, setOpen, open }) => {
  const [isModalOpen, setIsModalOpen] = useWorkspaceModal(open, setOpen)
  const { t } = useTranslation('common')
  const [shareLoading] = useChatStore((s) => [s.shareLoading])

  return (
    <>
      <ActionIcon
        icon={Share2}
        loading={shareLoading}
        onClick={() => setIsModalOpen(true)}
        size={mobile ? MOBILE_HEADER_ICON_SIZE : DESKTOP_HEADER_ICON_SIZE}
        title={t('share')}
        tooltipProps={{
          placement: 'bottom',
        }}
      />
      <ShareModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  )
})

export default ShareButton
