import { notFound }

import { enableClerk }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import ClerkProfile from '../features/ClerkProfile'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('auth', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.security'),
    url: '/profile/security',
  })
}

const page = async (props: DynamicLayoutProps) => {
  if (!enableClerk) return notFound()
  const mobile = await RouteVariants.getIsMobile(props)

  return <clerkprofile mobile={mobile} />
}

export default Page
