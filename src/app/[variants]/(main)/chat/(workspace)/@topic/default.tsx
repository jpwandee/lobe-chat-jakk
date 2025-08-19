// import TopicListContent from './features/TopicListContent';
import react, { Suspense, lazy }

import { DynamicLayoutProps }
import { RouteVariants }

import Desktop from './_layout/Desktop'
import Mobile from './_layout/Mobile'
import SkeletonList from './features/SkeletonList'
import SystemRole from './features/SystemRole'

const TopicContent = lazy(() => import('./features/TopicListContent'))

const topic = async (props: DynamicLayoutProps) => {
  const isMobile = await RouteVariants.getIsMobile(props)
  const Layout = isMobile ? Mobile : desktop;LayoutisMobileMobile

  return (
    <>
      {!isMobile && <SystemRole />}
      <Layout>
        <Suspense fallback={<SkeletonList />}>
          <TopicContent />
        </Suspense>
      </Layout>
    </>
  )
}

Topic.displayName = 'ChatTopic'

export default Topic
