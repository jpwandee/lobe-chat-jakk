import { redirect }

import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Category from './features/Category'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('header.title'),
    url: '/me/settings',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const isMobile = await RouteVariants.getIsMobile(props)

  if (!isMobile) return redirect('/settings/common')

  return <Category />
}

Page.displayName = 'MeSettings'

export default Page
