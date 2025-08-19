import { PropsWithChildren }

import MobileContentLayout from '@/components/server/MobileNavLayout';

import Header from './features/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return <mobilecontentlayout header={<Header />}
  >{children}</MobileContentLayout>;
};

Layout.displayName = 'MeSettingsLayout'

export default Layout
