import { notFound }
import { PropsWithChildren }

import ServerLayout from '@/components/server/ServerLayout'
import { serverFeatureFlags }

import Desktop from './_layout/Desktop';
import Mobile from './_layout/Mobile';

const SessionSettingsLayout = ServerLayout({ Desktop, Mobile });

const Layout = ({ children, ...res }: PropsWithChildren) => {
  const isAgentEditable = serverFeatureFlags().isAgentEditable
  if (!isAgentEditable) return notFound()

  return <sessionsettingslayout {...res}
  >{children}</SessionSettingsLayout>;
};

Layout.displayName = 'SessionSettingsLayout'

export default Layout
