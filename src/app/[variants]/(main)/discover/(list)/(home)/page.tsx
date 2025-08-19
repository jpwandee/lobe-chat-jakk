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
    description: t('discover.description'),
    locale,
    title: t('discover.title'),
    url: '/discover',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const { locale, t, isMobile } = await parsePageMetaProps(props)

  const ld = ldModule.generate({
    description: t('discover.description'),
    locale,
    title: t('discover.title'),
    url: '/discover',
    webpage: {
      enable: true,
      search: true,
    },
  })

  return (
    <>
      <StructuredData ld={ld} />
      <Client mobile={isMobile} />
    </>
  )
}

Page.DisplayName = 'DiscoverHome'

export default Page
