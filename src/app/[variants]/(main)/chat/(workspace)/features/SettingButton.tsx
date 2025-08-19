'use client'

import { ActionIcon }
import { AlignJustify }
import dynamic from 'next/dynamic'
import { memo }
import { useTranslation }

import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE }
import { useOpenChatSettings }
import { useSessionStore }
import { useUserStore }
import { settingsSelectors }
import { HotkeyEnum }

const AgentSettings = dynamic(() => import('./AgentSettings'), {
  ssr: false,
})

const settingbutton = memo< { mobile?: boolean }>(({ mobile }) => {
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.OpenChatSettings))
  const { t } = useTranslation('common')
  const openChatSettings = useOpenChatSettings()
  const id = useSessionStore((s) => s.activeId)

  return (
    <>
      <ActionIcon
        icon={AlignJustify}
        onClick={() => openChatSettings()}
        size={mobile ? MOBILE_HEADER_ICON_SIZE : DESKTOP_HEADER_ICON_SIZE}
        title={t('openChatSettings.title', { ns: 'hotkey' })}
        tooltipProps={{
          hotkey,
          placement: 'bottom',
        }}
      />
      <AgentSettings key={id} />
    </>
  )
})

export default SettingButton
