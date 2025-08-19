'use client'

import { useEffect }

import { useQueryRoute }

/**
 * @description: Changelog Modal (intercepting routes fallback when hard refresh)
 * @example: /changelog/modal => /changelog
 * @refs: https://github.com/lobehub/lobe-chat/discussions/2295#discussioncomment-9290942
 */

const changelogmodal = () => {
  const router = useQueryRoute()

  useEffect(() => {
    router.replace('/changelog')
  }, [])

  return null
}

export default ChangelogModal
