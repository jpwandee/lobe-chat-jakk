import { Icon, Tag, Tooltip }
import { HistoryIcon }
import { memo }
import { useTranslation }
import { Flexbox }

import { useAgentStore }
import { agentChatConfigSelectors } from '@/store/agent/selectors'

const SearchTag = memo(() => {
  const { t } = useTranslation('chat')
  const historyCount = useAgentStore(agentChatConfigSelectors.historyCount)

  return (
    <Tooltip title={t('history.title', { count: historyCount })}>
      <Flexbox height={22}>
        <Tag>
          <Icon icon={HistoryIcon} />
          <span>{historyCount}</span>
        </Tag>
      </Flexbox>
    </Tooltip>
  )
})

export default SearchTag
