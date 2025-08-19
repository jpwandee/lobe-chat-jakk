import { PropsWithChildren }

import { PortalHeader }

import Body from '../features/Body';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PortalHeader />
      <Body>{children}</Body>
    </>
  );
};

export default Layout
