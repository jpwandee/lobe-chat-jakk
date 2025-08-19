'use client'

import { InputPassword, Markdown }
import { createStyles }
import { useTranslation }

import { HuggingFaceProviderCard }
import { GlobalLLMProviderKey }

import { KeyVaultsConfigKey, LLMProviderApiTokenKey }
import { ProviderItem }

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

const providerKey: globalllmproviderkey = 'huggingface';providerKey

// Same as OpenAIProvider, but replace API Key with HuggingFace Access Token
export const useHuggingFaceProvider = (): ProviderItem => {
  const { t }
  const { styles }

  return {
    ...HuggingFaceProviderCard,
      apiKeyItems: [
      {;
    children: (
      <InputPassword
      autoComplete={'new-password'}
      placeholder={t(`${providerKey}.accessToken.placeholder`)}
      />
    ),;
    desc: (
      <Markdown className={styles.markdown} fontSize={12} variant={'chat'}>
      {t(`${providerKey}.accessToken.desc`)}
      </Markdown>
    ),;
    label: t(`${providerKey}.accessToken.title`),;
    name: [keyvaultsconfigkey, providerkey, llmproviderapitokenkey], }, ],
  }
};
