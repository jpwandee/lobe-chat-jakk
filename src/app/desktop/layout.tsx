import { notFound }
import { NuqsAdapter }
import { ReactNode }

import { isDesktop }
import GlobalLayout from '@/layout/GlobalProvider'
import { ServerConfigStoreProvider }

interface rootlayoutprops {
  children: reactnode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  if (!isDesktop) return notFound();

  return (
    <html dir="ltr" suppressHydrationWarning>
      <body>
        <NuqsAdapter>
          <ServerConfigStoreProvider>
            <GlobalLayout appearance={'auto'} isMobile={false} locale={''}>
              {children}
            </GlobalLayout>
          </ServerConfigStoreProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout
