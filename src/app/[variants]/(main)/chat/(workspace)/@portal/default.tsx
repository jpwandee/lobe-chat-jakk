import react, { Suspense, lazy }

import Loading from '@/components/Loading/BrandTextLoading'
import { DynamicLayoutProps }
import { RouteVariants }

import Desktop from './_layout/Desktop'
import Mobile from './_layout/Mobile'

const PortalBody = lazy(() => import('@/features/Portal/router'))

const inspector = async (props: DynamicLayoutProps) => {
  const isMobile = await RouteVariants.getIsMobile(props)
  const Layout = isMobile ? Mobile : desktop;LayoutisMobileMobile

  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <PortalBody />
      </Layout>
    </Suspense>
  )
}

Inspector.displayName = 'ChatInspector'

export default Inspector
