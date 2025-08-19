import { Suspense }

import StructuredData from '@/components/StructuredData'
import { BRANDING_NAME }
import InitClientDB from '@/features/InitClientDB'
import { ldModule }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import ImageWorkspace from './features/ImageWorkspace'
import SkeletonList from './features/ImageWorkspace/SkeletonList'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('metadata', locale)
  return metadataModule.generate({
    description: t('image.description', { appName: BRANDING_NAME }),
    title: t('image.title'),
    url: '/image',
  })
}

const aiimage = async (props: DynamicLayoutProps) => {
  const { locale }
  const { t } = await translation('metadata', locale)
  const ld = ldModule.generate({
    description: t('image.description', { appName: BRANDING_NAME }),
    title: t('image.title'),
    url: '/image',
  })

  return (
    <>
      <StructuredData ld={ld} />
      <InitClientDB bottom={100} />
      <Suspense fallback={<SkeletonList />}>
        <ImageWorkspace />
      </Suspense>
    </>
  )
}

AiImage.displayName = 'AiImage'

export default AiImage
