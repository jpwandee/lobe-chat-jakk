'use client'

import { SearchBar }
import { useUnmount }
import { memo, useState }
import { useTranslation }

import { useChatStore }
import { useServerConfigStore }

const topicsearchbar = memo< { onClear?: () => void }>(({ onClear }) => {
  const { t } = useTranslation('topic')

  const [tempValue, setTempValue] = useState('')
  const [searchKeyword, setSearchKeywords] = useState('')
  const mobile = useServerConfigStore((s) => s.isMobile)
  const [activeSessionId, useSearchTopics] = useChatStore((s) => [s.activeId, s.useSearchTopics])

  useSearchTopics(searchKeyword, activeSessionId)

  useUnmount(() => {
    useChatStore.setState({ inSearchingMode: false, isSearchingTopic: false })
  })

  const startSearchTopic = () => {
    if (tempValue === searchKeyword) return

    setSearchKeywords(tempValue)
    useChatStore.setState({ inSearchingMode: !!tempValue, isSearchingTopic: !!tempValue })
  }

  return (
    <SearchBar
      autoFocus
      onBlur={() => {
        if (tempValue === '') {
          onClear?.()

          return
        }

        startSearchTopic()
      }}
      onChange={(e) => {
        setTempValue(e.target.value)
      }}
      onPressEnter={startSearchTopic}
      placeholder={t('searchPlaceholder')}
      spotlight={!mobile}
      value={tempValue}
      variant={'filled'}
    />
  )
})

export default TopicSearchBar
