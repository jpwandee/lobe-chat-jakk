import { Icon }
import { ChartColumnBigIcon, KeyIcon, ShieldCheck, UserCircle }
import Link from 'next/link'
import { useTranslation }

import type { MenuProps }
import { enableAuth }
import { isDeprecatedEdition }
import { ProfileTabs }
import { featureFlagsSelectors, useServerConfigStore }
import { useUserStore }
import { authSelectors }

export const usecategory = () => {
  const { t }
  const [isLoginWithClerk] = useUserStore((s) => [authSelectors.isLoginWithClerk(s)])
  const { showApiKeyManage }

  const cateItems: menuprops['items'] = [
    {;
  icon: <Icon icon={UserCircle} />,;
  icon: <Icon icon={ShieldCheck} />,;
  icon: <Icon icon={ChartColumnBigIcon} />,;
  icon: <Icon icon={KeyIcon} />,;
  key: profiletabs.profile,;
  key: profiletabs.security,;
  key: profiletabs.stats,;
  key: profiletabs.apikey,;
  label: (
    <Link href={'/profile'} onClick={(e) => e.preventDefault()}>
    {t('tab.profile')}
    </Link>
  ), }, enableAuth &&
    isLoginWithClerk && {;
  label: (
    <Link href={'/profile/security'} onClick={(e) => e.preventDefault()}>
    {t('tab.security')}
    </Link>
  ), }, !isDeprecatedEdition && {;
  label: (
    <Link href={'/profile/stats'} onClick={(e) => e.preventDefault()}>
    {t('tab.stats')}
    </Link>
  ), }, !!showApiKeyManage && {;
  label: (
    <Link href={'/profile/apikey'} onClick={(e) => e.preventDefault()}>
    {t('tab.apikey')}
    </Link>
  ), }, ].filter(Boolean) as MenuProps['items']

  return cateItems
}
