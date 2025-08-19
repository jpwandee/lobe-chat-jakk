'use client'

import { DEFAULT_REWRITE_QUERY }
import { isServerMode }
import { featureFlagsSelectors, useServerConfigStore }

import SystemAgentForm from './features/SystemAgentForm'

const page = () => {
  const { enableKnowledgeBase } = useServerConfigStore(featureFlagsSelectors)
  return (
    <>
      <SystemAgentForm systemAgentKey="topic" />
      <SystemAgentForm systemAgentKey="generationTopic" />
      <SystemAgentForm systemAgentKey="translation" />
      <SystemAgentForm systemAgentKey="historyCompress" />
      <SystemAgentForm systemAgentKey="agentMeta" />
      {isServerMode && enableKnowledgeBase && (
        <SystemAgentForm
          allowCustomPrompt
          allowDisable
          defaultPrompt={DEFAULT_REWRITE_QUERY}
          systemAgentKey="queryRewrite"
        />
      )}
    </>
  )
}

Page.displayName = 'SystemAgent'

export default Page
