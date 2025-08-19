'use client'

import { memo, useEffect }

import { useGlobalStore }

const updatechangelogstatus = memo< { currentId?: string }>(({ currentId }) => {
  const [latestChangelogId, updateSystemStatus] = useGlobalStore((s) => [
    s.status.latestChangelogId,
    s.updateSystemStatus,
  ])

  useEffect(() => {
    if (!currentId || currentId === latestChangelogId) return
    updateSystemStatus({ latestChangelogId: currentId })
  }, [latestChangelogId, currentId])

  return null
})

export default UpdateChangelogStatus
