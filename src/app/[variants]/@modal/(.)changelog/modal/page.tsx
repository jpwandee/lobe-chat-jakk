import { notFound }
import { Suspense }

import { serverFeatureFlags }
import { ChangelogService }
import { DynamicLayoutProps }
import { RouteVariants }

import Post from './features/Post'
import UpdateChangelogStatus from './features/UpdateChangelogStatus'
import Loading from './loading'

const page = async (props: DynamicLayoutProps) => {
  const hideDocs = serverFeatureFlags().hideDocs
  if (hideDocs) return notFound()

  const { locale, isMobile } = await RouteVariants.getVariantsFromProps(props)

  const changelogService = new ChangelogService()
  const data = await changelogService.getChangelogIndex()

  if (!data) return notFound()

  return (
    <>
      {data?.map((item) => (
        <Suspense fallback={<Loading />} key={item.id}>
          <Post locale={locale as any} mobile={isMobile} {...item} />
        </Suspense>
      ))}
      <UpdateChangelogStatus currentId={data[0]?.id} />
    </>
  )
}

Page.displayName = 'ChangelogModal'

export default Page
