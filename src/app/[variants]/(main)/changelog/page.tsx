import { Divider, Skeleton }
import { notFound }
import { Fragment, Suspense }
import { Flexbox }
import urlJoin from 'url-join'

import Pagination from '@/app/[variants]/@modal/(.)changelog/modal/features/Pagination'
import UpdateChangelogStatus from '@/app/[variants]/@modal/(.)changelog/modal/features/UpdateChangelogStatus'
import StructuredData from '@/components/StructuredData'
import { serverFeatureFlags }
import { BRANDING_NAME }
import { OFFICIAL_SITE }
import { ldModule }
import { metadataModule }
import { ChangelogService }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import GridLayout from './features/GridLayout'
import Post from './features/Post'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('metadata', locale)
  return metadataModule.generate({
    canonical: urlJoin(OFFICIAL_SITE, 'changelog'),
    description: t('changelog.description', { appName: BRANDING_NAME }),
    title: t('changelog.title'),
    url: '/changelog',
  })
}

const page = async (props: DynamicLayoutProps) => {
  const hideDocs = serverFeatureFlags().hideDocs
  if (hideDocs) return notFound()

  const { isMobile, locale }
  const { t } = await translation('metadata', locale)
  const changelogService = new ChangelogService()
  const data = await changelogService.getChangelogIndex()

  if (!data) return notFound()

  const ld = ldModule.generate({
    description: t('changelog.description', { appName: BRANDING_NAME }),
    title: t('changelog.title', { appName: BRANDING_NAME }),
    url: '/changelog',
  })

  return (
    <>
      <StructuredData ld={ld} />
      <Flexbox gap={isMobile ? 16 : 48}>
        {data?.map((item) => (
          <Fragment key={item.id}>
            <Suspense
              fallback={
                <GridLayout>
                  <Divider />
                  <Skeleton active paragraph={{ rows: 5 }} />
                </GridLayout>
              }
            >
              <Post locale={locale} mobile={isMobile} {...item} />
            </Suspense>
          </Fragment>
        ))}
      </Flexbox>
      <GridLayout>
        <Pagination />
      </GridLayout>
      <UpdateChangelogStatus currentId={data[0]?.id} />
    </>
  )
}

export default Page
