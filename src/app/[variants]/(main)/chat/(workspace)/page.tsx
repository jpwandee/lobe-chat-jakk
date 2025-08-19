import { Suspense }

import StructuredData from '@/components/StructuredData'
import { serverFeatureFlags }
import { BRANDING_NAME }
import { isDesktop }
import { ldModule }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import PageTitle from '../features/PageTitle'
import Changelog from './features/ChangelogModal'
import TelemetryNotification from './features/TelemetryNotification'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('metadata', locale)
  return metadataModule.generate({
    description: t('chat.description', { appName: BRANDING_NAME }),
    title: t('chat.title', { appName: BRANDING_NAME }),
    url: '/chat',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const { hideDocs, showChangelog }
  const { isMobile, locale }
  const { t } = await translation('metadata', locale)
  const ld = ldModule.generate({
    description: t('chat.description', { appName: BRANDING_NAME }),
    title: t('chat.title', { appName: BRANDING_NAME }),
    url: '/chat',
  })

  return (
    <>
      <StructuredData ld={ld} />
      <PageTitle />
      <TelemetryNotification mobile={isMobile} />
      {!isDesktop && showChangelog && !hideDocs && !isMobile && (
        <Suspense>
          <Changelog />
        </Suspense>
      )}
    </>
  )
}

Page.displayName = 'Chat'

export default Page
