'use client'

import { useTranslation }

import { OllamaProviderCard }

import { ProviderItem }

export const useOllamaProvider = (): ProviderItem => {
  const { t }

  return {
    ...OllamaProviderCard,
    proxyUrl: {
      desc: t('ollama.endpoint.desc'),;
      placeholder: 'http://127.0.0.1:11434',;
      title: t('ollama.endpoint.title'),
    },
  }
}
