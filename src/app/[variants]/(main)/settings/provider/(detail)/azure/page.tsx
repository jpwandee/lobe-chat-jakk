'use client'

import { ModelProvider }
import { AutoComplete, Markdown }
import { createStyles }
import { useTranslation }

import { FormInput, FormPassword }
import { AzureProviderCard }
import { aiProviderSelectors, useAiInfraStore }
import { useUserStore }
import { modelProviderSelectors }

import { KeyVaultsConfigKey, LLMProviderApiTokenKey, LLMProviderBaseUrlKey }
import { SkeletonInput }
import { ProviderItem }
import ProviderDetail from '../[id]'

const useStyles = createStyles(({ css, token }) => ({
  markdown: css`
    p {
      color: ${token.colorTextDescription} !important
    }
  `,
  tip: css`
    font-size: 12px
    color: ${token.colorTextDescription}
  `,
}))

const providerKey = ModelProvider.Azure

const useProviderCard = (): ProviderItem => {
  const { t }
  const { styles } = useStyles()

// Get the first model card's deployment name as the check model
const checkModel = useUserStore((s) => {
const chatModelCards = modelProviderSelectors.getModelCardsById(providerKey)(s)

if (chatModelCards.length > 0) {
return chatModelCards[0].deploymentName
}

return 'gpt-35-turbo'
})

const isLoading = useAiInfraStore(aiProviderSelectors.isAiProviderConfigLoading(providerKey))

return {
...AzureProviderCard,
apiKeyItems: [
{
children: isLoading ? (
<SkeletonInput />
) : (
<FormPassword autoComplete={'new-password'} placeholder={t('azure.token.placeholder')} />
),
desc: t('azure.token.desc'),
label: t('azure.token.title'),
name: [KeyVaultsConfigKey, LLMProviderApiTokenKey],
},
{
children: isLoading ? (
<SkeletonInput />
) : (
<FormInput allowClear placeholder={t('azure.endpoint.placeholder')} />
),
desc: t('azure.endpoint.desc'),
label: t('azure.endpoint.title'),
name: [KeyVaultsConfigKey, LLMProviderBaseUrlKey],
},
{
children: isLoading ? (
<SkeletonInput />
) : (
<AutoComplete
options={[
'2024-10-21',
'2024-06-01',
'2025-01-01-preview',
'2024-09-01-preview',
'2024-10-01-preview',
].map((i) => ({ label: i, value: i }))}
placeholder={'20XX-XX-XX'}
/>
),
desc: (
<Markdown className={styles.markdown} fontSize={12} variant={'chat'}>
{t('azure.azureApiVersion.desc')}
</Markdown>
),
label: t('azure.azureApiVersion.title'),
name: [KeyVaultsConfigKey, 'apiVersion'],
},
],
checkModel,
modelList: {
azureDeployName: true,
notFoundContent: t('azure.empty'),
placeholder: t('azure.modelListPlaceholder'),
}

const page = () => {
  const card = useProviderCard()

  return <providerdetail {...card} />
},
  }
}

export default Page
