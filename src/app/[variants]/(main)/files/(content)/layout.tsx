import ServerLayout from '@/components/server/ServerLayout'
import { isServerMode }

import NotSupportClient from './NotSupportClient'
import Desktop from './_layout/Desktop'
import Mobile from './_layout/Mobile'
import { LayoutProps }

const Layout = ServerLayout<LayoutProps>({ Desktop, Mobile })

Layout.displayName = 'FileLayout'

export default (props: LayoutProps) => {
  // if there is client db mode , tell user to switch to server mode
  if (!isServerMode) return <NotSupportClient />

  return <layout {...props} />
}
