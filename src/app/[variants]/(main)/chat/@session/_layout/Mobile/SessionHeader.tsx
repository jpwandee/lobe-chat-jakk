'use client'

import { ActionIcon }
import { ChatHeader }
import { MessageSquarePlus }
import { useRouter }
import { memo }
import { Flexbox }

import { ProductLogo }
import { MOBILE_HEADER_ICON_SIZE }
import SyncStatusInspector from '@/features/SyncStatusInspector'
import UserAvatar from '@/features/User/UserAvatar'
import { featureFlagsSelectors, useServerConfigStore }
import { useSessionStore }
import { mobileHeaderSticky } from '@/styles/mobileHeader'

const Header = memo(() => {
  const [createSession] = useSessionStore((s) => [s.createSession])
  const router = useRouter()
  const { enableWebrtc, showCreateSession } = useServerConfigStore(featureFlagsSelectors)

  return (
    <ChatHeader
      left={
        <Flexbox align={'center'} gap={8} horizontal style={{ marginLeft: 8 }}>
          <UserAvatar onClick={() => router.push('/me')} size={32} />
          <ProductLogo type={'text'} />
          {enableWebrtc && <SyncStatusInspector placement={'bottom'} />}
        </Flexbox>
      }
      right={
        showCreateSession && (
          <ActionIcon
            icon={MessageSquarePlus}
            onClick={() => createSession()}
            size={MOBILE_HEADER_ICON_SIZE}
          />
        )
      }
      style={mobileHeaderSticky}
    />
  )
})

export default Header
