import { Skeleton }
import dynamic from 'next/dynamic'

import { enableClerk }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Client from '../Client'

// 为了兼容 ClerkProfile， 需要使用 [[...slug]]

const ClerkProfile = dynamic(() => import('../../features/ClerkProfile'), {
  loading: () => (
    <div style={{ flex: 1 }}>
      <Skeleton paragraph={{ rows: 8 }} title={false} />
    </div>
  ),
})

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('auth', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.profile'),
    url: '/profile',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const mobile = await RouteVariants.getIsMobile(props)

  if (enableClerk) return <clerkprofile mobile={mobile}

  return <client mobile={mobile} />
}

export default Page
