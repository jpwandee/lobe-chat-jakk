import ServerLayout from '@/components/server/ServerLayout'
import { isServerMode }

import NotSupportClient from './NotSupportClient'
import Desktop from './_layout/Desktop'
import Mobile from './_layout/Mobile'
import { LayoutProps }

const AiImageLayout = ServerLayout({ Desktop, Mobile })

AiImageLayout.displayName = 'AiImageLayout'

const layout = (props: LayoutProps) => {
  if (!isServerMode) return <NotSupportClient />

  return <aiimagelayout {...props} />
}

export default Layout
