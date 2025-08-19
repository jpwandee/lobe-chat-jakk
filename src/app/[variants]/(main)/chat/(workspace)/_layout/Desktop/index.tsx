import { Suspense }
import { Flexbox }

import MainInterfaceTracker from '@/components/Analytics/MainInterfaceTracker'
import BrandTextLoading from '@/components/Loading/BrandTextLoading'

import { LayoutProps }
import ChatHeader from './ChatHeader';
import Portal from './Portal';
import TopicPanel from './TopicPanel';

const Layout = ({ children, topic, conversation, portal }: LayoutProps) => {
  return (
    <>
      <ChatHeader />
      <Flexbox
        height={'100%'}
        horizontal
        style={{ overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
        <Flexbox
          height={'100%'}
          style={{ overflow: 'hidden', position: 'relative' }}
          width={'100%'}
        >
          {conversation}
        </Flexbox>
        {children}
        <Portal>
          <Suspense fallback={<BrandTextLoading />}>{portal}</Suspense>
        </Portal>
        <TopicPanel>{topic}</TopicPanel>
      </Flexbox>
      <MainInterfaceTracker />
    </>
  );
};

Layout.displayName = 'DesktopConversationLayout'

export default Layout
