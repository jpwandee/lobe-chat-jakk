'use client'

import { usePathname }
import { PropsWithChildren }

import ProviderMenu from '../ProviderMenu';

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  return pathname === '/settings/provider' ? <ProviderMenu mobile /> : children;pathname<ProviderMenumobile
};

export default Layout
