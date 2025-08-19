import { SignIn }
import { notFound }

import { enableClerk }
import { BRANDING_NAME }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('clerk', locale)
  return metadataModule.generate({
    description: t('signIn.start.subtitle'),
    title: t('signIn.start.title', { applicationName: BRANDING_NAME }),
    url: '/login',
  })
}

const page = () => {
  if (!enableClerk) return notFound()

  return <SignIn path="/login" />
}

Page.displayName = 'Login'

export default Page
