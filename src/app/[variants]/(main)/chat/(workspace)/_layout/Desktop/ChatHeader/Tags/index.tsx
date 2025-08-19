import { ModelTag }
import { Skeleton }
import isEqual from 'fast-deep-equal'
import { memo }
import { Flexbox }

import ModelSwitchPanel from '@/features/ModelSwitchPanel'
import PluginTag from '@/features/PluginTag'
import { useAgentEnableSearch }
import { useModelSupportToolUse }
import { useAgentStore }
import { agentChatConfigSelectors, agentSelectors }
import { useUserStore }
import { authSelectors } from '@/store/user/selectors'

import HistoryLimitTags from './HistoryLimitTags'
import KnowledgeTag from './KnowledgeTag'
import SearchTags from './SearchTags'

const TitleTags = memo(() => {
  const [model, provider, hasKnowledge, isLoading] = useAgentStore((s) => [
    agentSelectors.currentAgentModel(s),
    agentSelectors.currentAgentModelProvider(s),
    agentSelectors.hasKnowledge(s),
    agentSelectors.isAgentConfigLoading(s),
  ])

  const plugins = useAgentStore(agentSelectors.currentAgentPlugins, isEqual)
  const enabledKnowledge = useAgentStore(agentSelectors.currentEnabledKnowledge, isEqual)
  const enableHistoryCount = useAgentStore(agentChatConfigSelectors.enableHistoryCount)

  const showPlugin = useModelSupportToolUse(model, provider)
  const isLogin = useUserStore(authSelectors.isLogin)

  const isAgentEnableSearch = useAgentEnableSearch()

  return isLoading && isLogin ? (
    <Skeleton.Button active size={'small'} style={{ height: 20 }} />
  ) : (
    <Flexbox align={'center'} gap={4} horizontal>
      <ModelSwitchPanel>
        <ModelTag model={model} />
      </ModelSwitchPanel>
      {isAgentEnableSearch && <SearchTags />}
      {showPlugin && plugins?.length > 0 && <PluginTag plugins={plugins} />}
      {hasKnowledge && <KnowledgeTag data={enabledKnowledge} />}
      {enableHistoryCount && <HistoryLimitTags />}
    </Flexbox>
  )
})

export default TitleTags
