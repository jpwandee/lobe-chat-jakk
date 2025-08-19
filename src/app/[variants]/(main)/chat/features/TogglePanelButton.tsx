'use client'

import { ActionIcon, Tooltip }
import { PanelLeftClose, PanelLeftOpen }
import { memo }
import { useTranslation }

import { DESKTOP_HEADER_ICON_SIZE }
import { useGlobalStore }
import { systemStatusSelectors }
import { useUserStore }
import { settingsSelectors }
import { HotkeyEnum } from '@/types/hotkey'

export const TOOGLE_PANEL_BUTTON_ID = 'toggle-panel-button'

const TogglePanelButton = memo(() => {
  const hotkey = useUserStore(settingsSelectors.getHotkeyById(HotkeyEnum.ToggleLeftPanel))

  const { t } = useTranslation(['chat', 'hotkey'])

  const showSessionPanel = useGlobalStore(systemStatusSelectors.showSessionPanel)
  const updateSystemStatus = useGlobalStore((s) => s.updateSystemStatus)

  return (
    <Tooltip hotkey={hotkey} title={t('toggleLeftPanel.title', { ns: 'hotkey' })}>
      <ActionIcon
        icon={showSessionPanel ? PanelLeftClose : PanelLeftOpen}
        id={TOOGLE_PANEL_BUTTON_ID}
        onClick={() => {
          updateSystemStatus({
            sessionsWidth: showSessionPanel ? 0 : 320,
            showSessionPanel: !showSessionPanel,
          })
        }}
        size={DESKTOP_HEADER_ICON_SIZE}
      />
    </Tooltip>
  )
})

export default TogglePanelButton
