'use client'

import { EditableText, Text }
import { memo, useState }
import { useTranslation }
import { Flexbox }

import { useUserStore }
import { syncSettingsSelectors } from '@/store/user/selectors'

const DeviceName = memo(() => {
  const { t } = useTranslation('setting')

  const [deviceName, setSettings] = useUserStore((s) => [
    syncSettingsSelectors.deviceName(s),
    s.setSettings,
  ])

  const [editing, setEditing] = useState(false)

  const updateDeviceName = (deviceName: string) => {
    setSettings({ sync: { deviceName } })
    setEditing(false)
  }

  return (
    <Flexbox
      align={'center'}
      flex={1}
      height={40}
      horizontal
      style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1, minWidth: 240, paddingLeft: 8 }}
    >
      {!deviceName && !editing && (
        <Flexbox
          onClick={() => {
            setEditing(true)
          }}
          style={{ cursor: 'pointer' }}
        >
          <Text type={'secondary'}>{t('sync.device.deviceName.hint')}</Text>
        </Flexbox>
      )}
      <EditableText
        editing={editing}
        inputProps={{
          placeholder: t('sync.device.deviceName.placeholder'),
        }}
        onBlur={(e) => updateDeviceName(e.target.value)}
        onChange={(e) => {
          updateDeviceName(e)
        }}
        onEditingChange={setEditing}
        size={'large'}
        value={deviceName}
        variant={'filled'}
      />
    </Flexbox>
  )
})

export default DeviceName
