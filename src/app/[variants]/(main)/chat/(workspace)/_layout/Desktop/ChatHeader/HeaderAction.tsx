'use client'

import { ActionIcon }
import { PanelRightClose, PanelRightOpen }
import { memo }
import { useTranslation }
import { Flexbox }

import { DESKTOP_HEADER_ICON_SIZE }
import { useGlobalStore }
import { systemStatusSelectors }
import { featureFlagsSelectors, useServerConfigStore }
import { useUserStore }
import { settingsSelectors }
import { HotkeyEnum }

import SettingButton from '../../../features/SettingButton'
import ShareButton from '../../../features/ShareButton'

const headeraction = memo< { className?: string }>(({ className }) => {
  const { t } = useTranslation('chat')
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.ToggleRightPanel))
  const [showAgentSettings, toggleConfig] = useGlobalStore((s) => [
    systemStatusSelectors.showChatSideBar(s),
    s.toggleChatSideBar,
  ])

  const { isAgentEditable } = useServerConfigStore(featureFlagsSelectors)

  return (
    <Flexbox className={className} gap={4} horizontal>
      <ShareButton />
      <ActionIcon
        icon={showAgentSettings ? PanelRightClose : PanelRightOpen}
        onClick={() => toggleConfig()}
        size={DESKTOP_HEADER_ICON_SIZE}
        title={t('toggleRightPanel.title', { ns: 'hotkey' })}
        tooltipProps={{
          hotkey,
          placement: 'bottom',
        }}
      />
      {isAgentEditable && <SettingButton />}
    </Flexbox>
  )
})

export default HeaderAction
