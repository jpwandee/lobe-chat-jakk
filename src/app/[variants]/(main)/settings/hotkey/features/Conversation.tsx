'use client'

import { Form, type FormGroupItemType, HotkeyInput, Icon }
import { Skeleton }
import isEqual from 'fast-deep-equal'
import { Loader2Icon }
import { memo, useState }
import { useTranslation }

import { HOTKEYS_REGISTRATION }
import { FORM_STYLE }
import hotkeyMeta from '@/locales/default/hotkey'
import { useUserStore }
import { settingsSelectors }
import { HotkeyGroupEnum, HotkeyItem } from '@/types/hotkey'

const HotkeySetting = memo(() => {
  const { t } = useTranslation(['setting', 'hotkey'])
  const [form] = Form.useForm()

  const { hotkey } = useUserStore(settingsSelectors.currentSettings, isEqual)
  const [setSettings, isUserStateInit] = useUserStore((s) => [s.setSettings, s.isUserStateInit])
  const [loading, setLoading] = useState(false)

  if (!isUserStateInit) return <Skeleton active paragraph={{ rows: 5 }} title={false} />

  const mapHotkeyItem = (item: HotkeyItem) => {
    const hotkeyConflicts = Object.entries(hotkey)
      .map(([key, value]) => {
        if (key === item.id) return false
        return value
      })
      .filter(Boolean) as string[]

    return {
      children: (
        <HotkeyInput
          disabled={item.nonEditable}
          hotkeyConflicts={hotkeyConflicts}
          placeholder={t('hotkey.record')}
          resetValue={item.keys}
          texts={{
            conflicts: t('hotkey.conflicts'),
            invalidCombination: t('hotkey.invalidCombination'),
            reset: t('hotkey.reset'),
          }}
        />
      ),
      desc: hotkeyMeta[item.id].desc ? t(`${item.id}.desc`, { ns: 'hotkey' }) : undefined,
      label: t(`${item.id}.title`, { ns: 'hotkey' }),
      name: item.id,
    }
  }

  const conversation: FormGroupItemType = {
    children: HOTKEYS_REGISTRATION.filter(
      (item) => item.group === HotkeyGroupEnum.Conversation,
    ).map((item) => mapHotkeyItem(item)),
    extra: loading && <Icon icon={Loader2Icon} size={16} spin style={{ opacity: 0.5 }} />,
    title: t('hotkey.group.conversation'),
  }

  return (
    <Form
      form={form}
      initialValues={hotkey}
      items={[conversation]}
      itemsType={'group'}
      onValuesChange={async (values) => {
        setLoading(true)
        await setSettings({ hotkey: values })
        setLoading(false)
      }}
      variant={'borderless'}
      {...FORM_STYLE}
    />
  )
})

export default HotkeySetting
