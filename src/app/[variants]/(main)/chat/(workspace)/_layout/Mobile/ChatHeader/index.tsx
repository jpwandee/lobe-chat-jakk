'use client'

import { ChatHeader }
import { memo, useState }

import { INBOX_SESSION_ID }
import { useQueryRoute }
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig'

import SettingButton from '../../../features/SettingButton'
import ShareButton from '../../../features/ShareButton'
import ChatHeaderTitle from './ChatHeaderTitle'

const MobileHeader = memo(() => {
  const router = useQueryRoute()
  const [open, setOpen] = useState(false)

  const { isAgentEditable } = useServerConfigStore(featureFlagsSelectors)

  return (
    <ChatHeader
      center={<ChatHeaderTitle />}
      onBackClick={() =>
        router.push('/chat', { query: { session: INBOX_SESSION_ID }, replace: true })
      }
      right={
        <>
          <ShareButton mobile open={open} setOpen={setOpen} />
          {isAgentEditable && <SettingButton mobile />}
        </>
      }
      showBackButton
      style={{ width: '100%' }}
    />
  )
})

export default MobileHeader
