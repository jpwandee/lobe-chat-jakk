import { notFound }

import { serverFeatureFlags }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { gerServerDeviceInfo }
import { RouteVariants }

import Page from './index'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.sync'),
    url: '/settings/sync',
  })
}

export default async (props: DynamicLayoutProps) => {
  const enableWebrtc = serverFeatureFlags().enableWebrtc
  if (!enableWebrtc) return notFound()

  const isMobile = await RouteVariants.getIsMobile(props)
  const { os, browser }

  return <page browser={browser}
  mobile={isMobile}
  os={os} />
}
