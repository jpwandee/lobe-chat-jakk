import { notFound }
import { PropsWithChildren }

import ServerLayout from '@/components/server/ServerLayout'
import { serverFeatureFlags }

import Desktop from './_layout/Desktop';
import Mobile from './_layout/Mobile';

const Layout = ServerLayout({ Desktop, Mobile });

const ProviderSettingsLayout = ({ children, ...res }: PropsWithChildren) => {
  const showLLM = serverFeatureFlags().showProvider
  if (!showLLM) return notFound()

  return <layout {...res}
  >{children}</Layout>;
};

ProviderSettingsLayout.displayName = 'ProviderSettingsLayout'

export default ProviderSettingsLayout

export const dynamic = 'auto'
