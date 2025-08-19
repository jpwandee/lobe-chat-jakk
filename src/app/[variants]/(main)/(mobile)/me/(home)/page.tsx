import { redirect }
import { Center }

import BrandWatermark from '@/components/BrandWatermark'
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Category from './features/Category'
import UserBanner from './features/UserBanner'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('common', locale)
  return metadataModule.generate({
    title: t('tab.me'),
    url: '/me',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const isMobile = await RouteVariants.getIsMobile(props)

  if (!isMobile) return redirect('/chat')

  return (
    <>
      <UserBanner />
      <Category />
      <Center padding={16}>
        <BrandWatermark />
      </Center>
    </>
  )
}

Page.displayName = 'Me'

export default Page
