'use client'

import { OpenAIProviderCard }
import { featureFlagsSelectors, useServerConfigStore }

import { ProviderItem }

export const useOpenAIProvider = (): ProviderItem => {
  const { showOpenAIProxyUrl, showOpenAIApiKey }

  return {
    ...OpenAIProviderCard,
    proxyUrl: showOpenAIProxyUrl && {
      placeholder: 'https://api.openai.com/v1',
    }

    ,
    showApiKey: showopenaiapikey,showApiKey
  }
}
