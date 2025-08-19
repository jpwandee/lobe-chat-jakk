import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Client from './Client'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('auth', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.stats'),
    url: '/profile/stats',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const mobile = await RouteVariants.getIsMobile(props)
  return <client mobile={mobile} />
}

export default Page
