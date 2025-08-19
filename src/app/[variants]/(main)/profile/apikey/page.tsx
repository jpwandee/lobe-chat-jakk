import { notFound }

import { serverFeatureFlags }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Page from '../../settings/system-agent'
import Client from './Client'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('auth', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.apikey'),
    url: '/profile/apikey',
  })
}

const page = () => {
  const { showApiKeyManage } = serverFeatureFlags()

  if (!showApiKeyManage) return notFound()

  return <Client />
}

Page.displayName = 'ApiKey'

export default page
