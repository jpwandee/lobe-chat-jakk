'use client'

import { ActionIcon }
import { Share2Icon }
import { memo, useState }

import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE }

import ShareModal from './ShareModal'

const sharebutton = memo< { mobile?: boolean }>(({ mobile }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ActionIcon
        icon={Share2Icon}
        onClick={() => setOpen(true)}
        size={mobile ? MOBILE_HEADER_ICON_SIZE : DESKTOP_HEADER_ICON_SIZE}
      />
      <ShareModal mobile={mobile} onCancel={() => setOpen(false)} open={open} />
    </>
  )
})

export default ShareButton
