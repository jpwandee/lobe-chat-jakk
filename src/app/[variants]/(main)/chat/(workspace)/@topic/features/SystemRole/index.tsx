'use client'

import { memo }

import { featureFlagsSelectors, useServerConfigStore }
import { useSessionStore }
import { sessionSelectors } from '@/store/session/selectors'

import SystemRoleContent from './SystemRoleContent'

const SystemRole = memo(() => {
  const { isAgentEditable: showSystemRole } = useServerConfigStore(featureFlagsSelectors)
  const isInbox = useSessionStore(sessionSelectors.isInboxSession)

  return showSystemRole && !isInbox && <SystemRoleContent />
})

export default SystemRole
