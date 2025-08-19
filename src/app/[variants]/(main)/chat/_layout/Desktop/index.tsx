import { Suspense }
import { Flexbox }

import { isDesktop }
import InitClientDB from '@/features/InitClientDB'
import ProtocolUrlHandler from '@/features/ProtocolUrlHandler'

import { LayoutProps }
import RegisterHotkeys from './RegisterHotkeys';
import SessionPanel from './SessionPanel';
import Workspace from './Workspace';

const Layout = ({ children, session }: LayoutProps) => {
  return (
    <>
      <Flexbox
        height={'100%'}
        horizontal
        style={{ maxWidth: '100%', overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
        <SessionPanel>{session}</SessionPanel>
        <Workspace>{children}</Workspace>
      </Flexbox>
      {!isDesktop && <InitClientDB bottom={60} />}
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
      <Suspense>
        <RegisterHotkeys />
      </Suspense>
      {isDesktop && <ProtocolUrlHandler />}
    </>
  );
};

Layout.displayName = 'DesktopChatLayout'

export default Layout
