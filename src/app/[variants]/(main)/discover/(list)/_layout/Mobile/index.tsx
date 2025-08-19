import { PropsWithChildren }

import MobileContentLayout from '@/components/server/MobileNavLayout'
import Footer from '@/features/Setting/Footer'

import { SCROLL_PARENT_ID }
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <MobileContentLayout
      gap={16}
      header={<Header />}
      id={SCROLL_PARENT_ID}
      style={{ paddingInline: 16, paddingTop: 8 }}
      withNav
    >
      {children}
      <div />
      <Footer />
    </MobileContentLayout>
  );
};

Layout.displayName = 'MobileDiscoverLayout'

export default Layout
