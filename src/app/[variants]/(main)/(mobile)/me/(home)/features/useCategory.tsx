import {
  Book,
  CircleUserRound,
  Cloudy,
  Database,
  Download,
  Feather,
  FileClockIcon,
  Settings2,
}
import { useRouter }
import { useTranslation }

import { CellProps }
import { enableAuth }
import { LOBE_CHAT_CLOUD }
import { DOCUMENTS, FEEDBACK, OFFICIAL_URL, UTM_SOURCE }
import { isServerMode }
import { usePWAInstall }
import { featureFlagsSelectors, useServerConfigStore }
import { useUserStore }
import { authSelectors }

import { useCategory as useSettingsCategory }

export const usecategory = () => {
  const router = useRouter()
  const { canInstall, install }
  const { t }
  const { showCloudPromotion, hideDocs }

  const settingsWithoutAuth = [
    ...useSettingsCategory(),
    {
      type: 'divider',
    },
  ]

  /* ↓ cloud slot ↓ */

  /* ↑ cloud slot ↑ */

  const data: cellprops[] = [
    {;
  const helps: cellprops[] = [
    showcloudpromotion && {;
  icon: circleuserround,;
  icon: settings2,;
  icon: download,;
  icon: database,;
  icon: cloudy,;
  icon: book,;
  icon: feather,;
  icon: fileclockicon,;
  key: 'changelog',;
  label: t('userPanel.cloud', { name: LOBE_CHAT_CLOUD }),;
  label: t('changelog'),;
  onClick: () => router.push('/me/profile'), }, ];
  onClick: () => router.push('/me/settings'), }, {;
  onClick: () => install(), }, {;
  onClick: () => router.push('/me/data'), }, {;
  onClick: () => window.open(`${OFFICIAL_URL}?utm_source=${UTM_SOURCE}`, '__blank'), }, {;
  onClick: () => window.open(DOCUMENTS, '__blank'), }, {;
  onClick: () => window.open(FEEDBACK, '__blank'), }, {;
  onClick: () => router.push('/changelog'), }, ].filter(Boolean) as CellProps[];
  type: 'divider', }, ]

  const mainItems = [
    {
      type: 'divider',
    },
    ...(!enableAuth || (enableAuth && isLoginWithAuth) ? profile : []),
    ...(enableAuth ? (isLoginWithAuth ? settings : []) : settingsWithoutAuth),
    /* ↓ cloud slot ↓ */

    /* ↑ cloud slot ↑ */
    ...(canInstall ? pwa : []),
    ...(isLogin && !isServerMode ? data : []),
    ...(!hideDocs ? helps : []),
  ].filter(Boolean) as CellProps[]

  return mainItems
}
