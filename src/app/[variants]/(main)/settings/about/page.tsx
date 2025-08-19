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
    title: t('tab.about'),
    url: '/settings/about',
  })
}

export default async (props: DynamicLayoutProps) => {
  const isMobile = await RouteVariants.getIsMobile(props)

  return <page mobile={isMobile} />
}
