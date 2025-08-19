'use client'

import { ModelProvider }
import { useTranslation }

import { FormInput, FormPassword }
import { AzureAIProviderCard }
import { aiProviderSelectors, useAiInfraStore }

import { KeyVaultsConfigKey, LLMProviderApiTokenKey, LLMProviderBaseUrlKey }
import { SkeletonInput }
import { ProviderItem }
import ProviderDetail from '../[id]'

const providerKey = ModelProvider.AzureAI

const useProviderCard = (): ProviderItem => {
  const { t }

  const isLoading = useAiInfraStore(aiProviderSelectors.isAiProviderConfigLoading(providerKey))

  return {
    ...AzureAIProviderCard,
      apiKeyItems: [
      {; />
      ) : (
        <FormPassword
        autoComplete={'new-password'}
        placeholder={t('azureai.token.placeholder')}
        />
      ),; />
      ) : (
        <FormInput allowClear placeholder={t('azureai.endpoint.placeholder')} />
      ),;
    children: isloading ? (
      <skeletoninput;
    desc: t('azureai.endpoint.desc'),;
    label: t('azureai.endpoint.title'),;
    name: [keyvaultsconfigkey, llmproviderapitokenkey], }, {;
    name: [keyvaultsconfigkey, llmproviderbaseurlkey], }, ],
  }
}

const page = () => {
  const card = useProviderCard()

  return <providerdetail {...card} />
}

export default Page
