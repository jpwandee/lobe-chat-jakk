import { Suspense, lazy }
import { Flexbox }

import { SkeletonList }

const Content = lazy(() => import('./Content'))

interface chatlistprops {
  mobile?: boolean;
}

const ChatList = ({ mobile }: ChatListProps) => (
  <Flexbox
    flex={1}
    style={{
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'relative',
    }}
    width={'100%'}
  >
    <Suspense fallback={<SkeletonList mobile={mobile} />}>
      <Content mobile={mobile} />
    </Suspense>
  </Flexbox>
)

export default ChatList
