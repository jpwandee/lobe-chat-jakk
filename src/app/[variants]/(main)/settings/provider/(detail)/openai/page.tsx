import { serverFeatureFlags }
import { OpenAIProviderCard }

import ProviderDetail from '../[id]'

const page = async () => {
  const { showOpenAIProxyUrl, showOpenAIApiKey } = serverFeatureFlags()

  return (
    <ProviderDetail
      {...OpenAIProviderCard}
      settings={{
        ...OpenAIProviderCard.settings,
        proxyUrl: showOpenAIProxyUrl && {
          placeholder: 'https://api.openai.com/v1',
        },
        showApiKey: showOpenAIApiKey,
      }}
    />
  )
}

export default Page
