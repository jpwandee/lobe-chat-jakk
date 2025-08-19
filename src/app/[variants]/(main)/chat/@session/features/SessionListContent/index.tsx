'use client'

import { memo }

import { useSessionStore } from '@/store/session'

import DefaultMode from './DefaultMode'
import SearchMode from './SearchMode'

const SessionListContent = memo(() => {
  const isSearching = useSessionStore((s) => s.isSearching)

  return isSearching ? <SearchMode /> : <DefaultMode />
})

SessionListContent.displayName = 'SessionListContent'

export default SessionListContent
