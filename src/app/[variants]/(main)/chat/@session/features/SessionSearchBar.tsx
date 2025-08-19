'use client'

import { SearchBar }
import { type ChangeEvent, memo, useCallback }
import { useTranslation }

import { useSessionStore }
import { useUserStore }
import { settingsSelectors }
import { HotkeyEnum }

const sessionsearchbar = memo< { mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('chat')
  const isLoaded = useUserStore((s) => s.isLoaded)
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.Search))

  const [keywords, useSearchSessions, updateSearchKeywords] = useSessionStore((s) => [
    s.sessionSearchKeywords,
    s.useSearchSessions,
    s.updateSearchKeywords,
  ])

  const { isValidating } = useSearchSessions(keywords)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateSearchKeywords(e.target.value)
    },
    [updateSearchKeywords],
  )

  return (
    <SearchBar
      allowClear
      enableShortKey={!mobile}
      loading={!isLoaded || isValidating}
      onChange={handleChange}
      placeholder={t('searchAgentPlaceholder')}
      shortKey={hotkey}
      spotlight={!mobile}
      value={keywords}
      variant={'filled'}
    />
  )
})

export default SessionSearchBar
