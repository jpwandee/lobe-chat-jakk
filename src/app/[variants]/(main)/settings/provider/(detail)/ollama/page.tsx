'use client'

import { useTranslation }

import { OllamaProviderCard }

import ProviderDetail from '../[id]'
import CheckError from './CheckError'

const page = () => {
  const { t } = useTranslation('modelProvider')

  return (
    <ProviderDetail
      {...OllamaProviderCard}
      checkErrorRender={CheckError}
      settings={{
        ...OllamaProviderCard.settings,
        proxyUrl: {
          desc: t('ollama.endpoint.desc'),
          placeholder: 'http://127.0.0.1:11434',
          title: t('ollama.endpoint.title'),
        },
      }}
    />
  )
}

export default Page
