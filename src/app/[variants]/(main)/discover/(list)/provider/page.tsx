import StructuredData from '@/components/StructuredData'
import { ldModule }
import { metadataModule }
import { DynamicLayoutProps }
import { parsePageMetaProps }

import Client from './Client'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const { locale, t } = await parsePageMetaProps(props)
  return metadataModule.generate({
    alternate: true,
    description: t('discover.providers.description'),
    locale,
    title: t('discover.providers.title'),
    url: '/discover/provider',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const { locale, t, isMobile } = await parsePageMetaProps(props)

  const ld = ldModule.generate({
    description: t('discover.providers.description'),
    locale,
    title: t('discover.providers.title'),
    url: '/discover/provider',
    webpage: {
      enable: true,
      search: '/discover/provider',
    },
  })

  return (
    <>
      <StructuredData ld={ld} />
      <Client mobile={isMobile} />
    </>
  )
}

Page.DisplayName = 'DiscoverProviders'

export default Page
