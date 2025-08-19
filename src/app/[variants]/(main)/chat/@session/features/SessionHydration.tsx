'use client'

import { useQueryState }
import { parseAsString }
import { memo, useEffect }
import { createStoreUpdater }

import { useAgentStore }
import { useChatStore }
import { useSessionStore } from '@/store/session'

// sync outside state to useSessionStore
const SessionHydration = memo(() => {
  const useStoreUpdater = createStoreUpdater(useSessionStore)
  const useAgentStoreUpdater = createStoreUpdater(useAgentStore)
  const useChatStoreUpdater = createStoreUpdater(useChatStore)
  const [switchTopic] = useChatStore((s) => [s.switchTopic])

  // two-way bindings the url and session store
  const [session, setSession] = useQueryState(
    'session',
    parseAsString.withDefault('inbox').withOptions({ history: 'replace', throttleMs: 50 }),
  )
  useStoreUpdater('activeId', session)
  useAgentStoreUpdater('activeId', session)
  useChatStoreUpdater('activeId', session)

  useEffect(() => {
    const unsubscribe = useSessionStore.subscribe(
      (s) => s.activeId,
      (state) => {
        switchTopic()
        setSession(state)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return null
})

export default SessionHydration
