import { notFound }

import { isDesktop }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Client from './index'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)

  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.proxy'),
    url: '/settings/proxy',
  })
}

const page = () => {
  if (!isDesktop) return notFound()

  return <Client />
}

export default Page
