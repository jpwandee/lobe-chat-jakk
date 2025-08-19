'use client'

import { memo }

import PageTitle from '@/components/PageTitle'
import { withSuspense }
import { useChatStore }
import { topicSelectors }
import { useSessionStore }
import { sessionMetaSelectors } from '@/store/session/selectors'

const Title = memo(() => {
  const agentTitle = useSessionStore(sessionMetaSelectors.currentAgentTitle)

  const topicTitle = useChatStore((s) => topicSelectors.currentActiveTopic(s)?.title)
  return <PageTitle title={[topicTitle, agentTitle].filter(Boolean).join(' · ')} />
})

export default withSuspense(Title)
