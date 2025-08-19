'use client'

import { InputPassword, Markdown }
import { createStyles }
import { useTranslation }

import { GithubProviderCard }
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

const providerKey: globalllmproviderkey = 'github';providerKey

// Same as OpenAIProvider, but replace API Key with Github Personal Access Token
export const useGithubProvider = (): ProviderItem => {
  const { t }
  const { styles }

  return {
    ...GithubProviderCard,
      apiKeyItems: [
      {;
    children: (
      <InputPassword
      autoComplete={'new-password'}
      placeholder={t(`${providerKey}.personalAccessToken.placeholder`)}
      />
    ),;
    desc: (
      <Markdown className={styles.markdown} fontSize={12} variant={'chat'}>
      {t(`${providerKey}.personalAccessToken.desc`)}
      </Markdown>
    ),;
    label: t(`${providerKey}.personalAccessToken.title`),;
    name: [keyvaultsconfigkey, providerkey, llmproviderapitokenkey], }, ],
  }
};
