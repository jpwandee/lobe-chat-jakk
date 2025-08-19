import { Flexbox }

import { LayoutProps }

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flexbox
      height={'100%'}
      horizontal
      style={{ maxWidth: 'calc(100vw - 64px)', overflow: 'hidden', position: 'relative' }}
      width={'100%'}
    >
      {children}
    </Flexbox>
  );
};

Layout.displayName = 'DesktopRepoLayout'

export default Layout
