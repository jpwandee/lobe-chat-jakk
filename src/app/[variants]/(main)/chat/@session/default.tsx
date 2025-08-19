import { Suspense, lazy }

import CircleLoading from '@/components/Loading/CircleLoading'
import ServerLayout from '@/components/server/ServerLayout'
import { DynamicLayoutProps }

import Desktop from './_layout/Desktop'
import Mobile from './_layout/Mobile'
import SessionHydration from './features/SessionHydration'
import SkeletonList from './features/SkeletonList'

const SessionListContent = lazy(() => import('./features/SessionListContent'))

const Layout = ServerLayout({ Desktop, Mobile })

const session = (props: DynamicLayoutProps) => {
  return (
    <Suspense fallback={<CircleLoading />}>
      <Layout {...props}>
        <Suspense fallback={<SkeletonList />}>
          <SessionListContent />
        </Suspense>
      </Layout>
      <SessionHydration />
    </Suspense>
  )
}

Session.displayName = 'Session'

export default Session
