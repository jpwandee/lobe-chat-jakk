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
    canonical: 'https://lobehub.com/mcp',
    description: t('discover.plugins.description'),
    locale,
    title: t('discover.plugins.title'),
    url: '/discover/mcp',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const { locale, t, isMobile } = await parsePageMetaProps(props)

  const ld = ldModule.generate({
    description: t('discover.plugins.description'),
    locale,
    title: t('discover.plugins.title'),
    url: '/discover/mcp',
    webpage: {
      enable: true,
      search: '/discover/mcp',
    },
  })

  return (
    <>
      <StructuredData ld={ld} />
      <Client mobile={isMobile} />
    </>
  )
}

Page.DisplayName = 'DiscoverMCP'

export default Page
