import { redirect }

import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Category from './features/Category'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('common', locale)
  return metadataModule.generate({
    title: t('userPanel.data'),
    url: '/me/data',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const mobile = await RouteVariants.getIsMobile(props)

  if (!mobile) return redirect('/chat')

  return <Category />
}

Page.displayName = 'MeData'

export default Page
