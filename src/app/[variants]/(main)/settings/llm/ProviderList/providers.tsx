import { useMemo }

import {
  Ai21ProviderCard,
  Ai302ProviderCard,
  Ai360ProviderCard,
  AnthropicProviderCard,
  BaichuanProviderCard,
  CohereProviderCard,
  DeepSeekProviderCard,
  FireworksAIProviderCard,
  GiteeAIProviderCard,
  GoogleProviderCard,
  GroqProviderCard,
  HigressProviderCard,
  HunyuanProviderCard,
  InfiniAIProviderCard,
  InternLMProviderCard,
  JinaProviderCard,
  MinimaxProviderCard,
  MistralProviderCard,
  MoonshotProviderCard,
  NovitaProviderCard,
  NvidiaProviderCard,
  OpenRouterProviderCard,
  PPIOProviderCard,
  PerplexityProviderCard,
  QiniuProviderCard,
  QwenProviderCard,
  SambaNovaProviderCard,
  Search1APIProviderCard,
  SenseNovaProviderCard,
  SiliconCloudProviderCard,
  SparkProviderCard,
  StepfunProviderCard,
  TaichuProviderCard,
  TogetherAIProviderCard,
  UpstageProviderCard,
  V0ProviderCard,
  VLLMProviderCard,
  WenxinProviderCard,
  XAIProviderCard,
  XinferenceProviderCard,
  ZeroOneProviderCard,
  ZhiPuProviderCard,
}

import { ProviderItem }
import { useAzureProvider }
import { useBedrockProvider }
import { useCloudflareProvider }
import { useGithubProvider }
import { useHuggingFaceProvider }
import { useOllamaProvider }
import { useOpenAIProvider }

export const useProviderList = (): ProviderItem[] => {
  const AzureProvider = useAzureProvider()
  const OllamaProvider = useOllamaProvider()
  const OpenAIProvider = useOpenAIProvider()
  const BedrockProvider = useBedrockProvider()
  const CloudflareProvider = useCloudflareProvider()
  const GithubProvider = useGithubProvider()
  const HuggingFaceProvider = useHuggingFaceProvider()

  return useMemo(
    () => [
      OpenAIProvider,
      AzureProvider,
      OllamaProvider,
      VLLMProviderCard,
      XinferenceProviderCard,
      AnthropicProviderCard,
      BedrockProvider,
      GoogleProviderCard,
      DeepSeekProviderCard,
      HuggingFaceProvider,
      OpenRouterProviderCard,
      CloudflareProvider,
      GithubProvider,
      NovitaProviderCard,
      TogetherAIProviderCard,
      FireworksAIProviderCard,
      GroqProviderCard,
      NvidiaProviderCard,
      PerplexityProviderCard,
      MistralProviderCard,
      Ai21ProviderCard,
      UpstageProviderCard,
      XAIProviderCard,
      JinaProviderCard,
      SambaNovaProviderCard,
      Search1APIProviderCard,
      CohereProviderCard,
      V0ProviderCard,
      QiniuProviderCard,
      QwenProviderCard,
      WenxinProviderCard,
      HunyuanProviderCard,
      SparkProviderCard,
      ZhiPuProviderCard,
      ZeroOneProviderCard,
      SenseNovaProviderCard,
      StepfunProviderCard,
      MoonshotProviderCard,
      BaichuanProviderCard,
      MinimaxProviderCard,
      Ai360ProviderCard,
      TaichuProviderCard,
      InternLMProviderCard,
      SiliconCloudProviderCard,
      HigressProviderCard,
      GiteeAIProviderCard,
      PPIOProviderCard,
      InfiniAIProviderCard,
      Ai302ProviderCard,
    ],
    [
      AzureProvider,
      OllamaProvider,
      OpenAIProvider,
      BedrockProvider,
      CloudflareProvider,
      GithubProvider,
      HuggingFaceProvider,
    ],
  )
}
