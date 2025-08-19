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
    canonical: 'https://lobehub.com/agent',
    description: t('discover.assistants.description'),
    locale,
    title: t('discover.assistants.title'),
    url: '/discover/assistant',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const { locale, t, isMobile } = await parsePageMetaProps(props)

  const ld = ldModule.generate({
    description: t('discover.assistants.description'),
    locale,
    title: t('discover.assistants.title'),
    url: '/discover/assistant',
    webpage: {
      enable: true,
      search: '/discover/assistant',
    },
  })

  return (
    <>
      <StructuredData ld={ld} />
      <Client mobile={isMobile} />
    </>
  )
}

Page.DisplayName = 'DiscoverAssistants'

export default Page
