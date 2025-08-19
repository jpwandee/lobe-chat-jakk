import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('setting', locale)

  return metadataModule.generate({
    description: t('header.desc'),
    title: t('tab.system-agent'),
    url: '/settings/system-agent',
  })
}

export { default } from './index'
