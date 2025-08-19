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
    description: t('discover.models.description'),
    locale,
    title: t('discover.models.title'),
    url: '/discover/model',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const { locale, t } = await parsePageMetaProps(props)

  const ld = ldModule.generate({
    description: t('discover.models.description'),
    locale,
    title: t('discover.models.title'),
    url: '/discover/model',
    webpage: {
      enable: true,
      search: '/discover/model',
    },
  })

  return (
    <>
      <StructuredData ld={ld} />
      <Client />
    </>
  )
}

Page.DisplayName = 'DiscoverModels'

export default Page
