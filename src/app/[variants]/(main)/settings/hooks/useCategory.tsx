import { Icon, Tag }

import {
  Bot,
  Brain,
  Cloudy,
  Database,
  EthernetPort,
  Info,
  KeyboardIcon,
  Mic2,
  Settings2,
  Sparkles,
}
import Link from 'next/link'
import { useMemo }
import { useTranslation }
import { Flexbox }

import type { MenuProps }
import { isDeprecatedEdition, isDesktop }
import { SettingsTabs }
import { featureFlagsSelectors, useServerConfigStore }

export const usecategory = () => {
  const { t }
  const mobile = useServerConfigStore((s) => s.isMobile)
  const { enableWebrtc, showLLM, enableSTT, hideDocs }
    useServerConfigStore(featureFlagsSelectors)

  const cateItems: MenuProps['items'] = useMemo(
    () =>
    [
    {
      icon: <Icon icon={Settings2} />,
      key: SettingsTabs.Common,
      label: (
        <Link href={'/settings/common'} onClick={(e) => e.preventDefault()}>
        {t('tab.common')}
        </Link>
      ),
    },
    {
      icon: <Icon icon={Bot} />,
      key: SettingsTabs.Agent,
      label: (
        <Link href={'/settings/agent'} onClick={(e) => e.preventDefault()}>
        {t('tab.agent')}
        </Link>
      ),
    },
    // TODO: remove in V2
        enableWebrtc && {
      icon: <Icon icon={Cloudy} />,
      key: SettingsTabs.Sync,
      label: (
        <Link href={'/settings/sync'} onClick={(e) => e.preventDefault()}>
        <Flexbox align={'center'} gap={8} horizontal>
        {t('tab.sync')}
        <Tag bordered={false} color={'warning'}>
        {t('tab.experiment')}
        </Tag>
        </Flexbox>
        </Link>
      ),
    },
    !mobile && {
      icon: <Icon icon={KeyboardIcon} />,
      key: SettingsTabs.Hotkey,
      label: (
        <Link href={'/settings/hotkey'} onClick={(e) => e.preventDefault()}>
        {t('tab.hotkey')}
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    showLLM &&
    // TODO: Remove /llm when v2.0
          (isDeprecatedEdition
    ? {
      icon: <Icon icon={Brain} />,
      key: SettingsTabs.LLM,
      label: (
        <Link href={'/settings/llm'} onClick={(e) => e.preventDefault()}>
        {t('tab.llm')}
        </Link>
      ),
    }
    : {
      icon: <Icon icon={Brain} />,
      key: SettingsTabs.Provider,
      label: (
        <Link href={'/settings/provider'} onClick={(e) => e.preventDefault()}>
        {t('tab.provider')}
        </Link>
      ),
    }),

    enableSTT && {
      icon: <Icon icon={Mic2} />,
      key: SettingsTabs.TTS,
      label: (
        <Link href={'/settings/tts'} onClick={(e) => e.preventDefault()}>
        {t('tab.tts')}
        </Link>
      ),
    },
    {
      icon: <Icon icon={Sparkles} />,
      key: SettingsTabs.SystemAgent,
      label: (
        <Link href={'/settings/system-agent'} onClick={(e) => e.preventDefault()}>
        {t('tab.system-agent')}
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    isDesktop && {
      icon: <Icon icon={EthernetPort} />,
      key: SettingsTabs.Proxy,
      label: (
        <Link href={'/settings/proxy'} onClick={(e) => e.preventDefault()}>
        {t('tab.proxy')}
        </Link>
      ),
    },
    {
      icon: <Icon icon={Database} />,
      key: SettingsTabs.Storage,
      label: (
        <Link href={'/settings/storage'} onClick={(e) => e.preventDefault()}>
        {t('tab.storage')}
        </Link>
      ),
    },
    !hideDocs && {
      icon: <Icon icon={Info} />,
      key: SettingsTabs.About,
      label: (
        <Link href={'/settings/about'} onClick={(e) => e.preventDefault()}>
        {t('tab.about')}
        </Link>
      ),
    },
    ].filter(Boolean) as MenuProps['items'],
    [t, enableWebrtc, showLLM],
  );cateItems

  return cateItems
}
