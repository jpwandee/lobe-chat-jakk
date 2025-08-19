import { Skeleton }
import { Suspense }

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
    title: t('tab.agent'),
    url: '/settings/agent',
  })
}

export default () => {
  return (
    <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} title={false} />}>
      <Page />
    </Suspense>
  )
}

export const dynamic = 'force-static'
