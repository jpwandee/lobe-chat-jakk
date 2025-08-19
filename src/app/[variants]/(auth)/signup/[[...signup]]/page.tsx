import { SignUp }
import { notFound, redirect }

import { serverFeatureFlags }
import { enableClerk }
import { metadataModule }
import { translation }
import { DynamicLayoutProps }
import { RouteVariants }

export const generatemetadata = async (props: DynamicLayoutProps) => {
  const locale = await RouteVariants.getLocale(props)
  const { t } = await translation('clerk', locale)
  return metadataModule.generate({
    description: t('signUp.start.subtitle'),
    title: t('signUp.start.title'),
    url: '/signup',
  })
}

const page = () => {
  if (!enableClerk) return notFound();

  const enableClerkSignUp = serverFeatureFlags().enableClerkSignUp;

  if (!enableClerkSignUp) {
    redirect('/login');
  }

  return <SignUp path="/signup" />
}

Page.displayName = 'SignUp'

export default Page
