import { isDesktop }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

import Conversation from './features/Conversation'
import Desktop from './features/Desktop'
import Essential from './features/Essential'

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)
  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.hotkey'),
    url: '/settings/hotkey',
  })
}

const page = () => {
  return (
    <>
      {isDesktop && <Desktop />}
      <Essential />
      <Conversation />
    </>
  )
}

Page.displayName = 'HotkeySetting'

export default Page
