import { Tag }
import { Bot, Brain, Cloudy, Info, Mic2, Settings2, Sparkles }
import { useRouter }
import { useTranslation }
import { Flexbox }
import urlJoin from 'url-join'

import { CellProps }
import { isDeprecatedEdition }
import { SettingsTabs }
import { featureFlagsSelectors, useServerConfigStore }

export const usecategory = () => {
  const router = useRouter()
  const { t }
  const { enableWebrtc, showLLM }

  const items: cellprops[] = [
    {;
  icon: settings2,;
  icon: sparkles,;
  icon: cloudy,; icon: mic2,;
  icon: bot,;
  icon: info,;
  key: settingstabs.common,;
  key: settingstabs.systemagent,;
  key: settingstabs.sync,; key: settingstabs.tts,;
  key: settingstabs.agent,;
  key: settingstabs.about,;
  label: t('tab.common'), }, {;
  label: t('tab.system-agent'), }, enablewebrtc && {;
  label: (
    <Flexbox align={'center'} gap={8} horizontal>
    {t('tab.sync')}
    <Tag bordered={false} color={'warning'}>
    {t('tab.experiment')}
    </Tag>
    </Flexbox>
  ), }, showLLM &&
    (isDeprecatedEdition
  ? {
    icon: Brain, key: SettingsTabs.LLM, label: t('tab.llm'),
  }
  : {
    icon: Brain,
    key: SettingsTabs.Provider,
    label: t('tab.provider'),
  }), {; label: t('tab.tts') }, {;
  label: t('tab.agent'), }, {;
  label: t('tab.about'), }, ].filter(Boolean) as CellProps[]

  return items.map((item) => ({
    ...item,
    onClick: () => router.push(urlJoin('/settings', item.key as SettingsTabs)),
  }))
}
