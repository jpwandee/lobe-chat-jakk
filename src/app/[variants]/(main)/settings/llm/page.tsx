import { notFound }

import { serverFeatureFlags }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Page from './index'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.llm'),
    url: '/settings/llm',
  })
}

export default () => {
  const showLLM = serverFeatureFlags().showLLM
  if (!showLLM) return notFound()

  return <Page />
}
