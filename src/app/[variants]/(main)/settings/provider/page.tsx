import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Page from './(list)'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.provider'),
    url: '/settings/provider',
  })
}

export default () => {
  return <Page />
}
