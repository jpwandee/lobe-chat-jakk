'use client'

import { Form, type FormGroupItemType, Icon, Select }
import { Skeleton, Switch }
import isEqual from 'fast-deep-equal'
import { Loader2Icon }
import { memo, useState }
import { useTranslation }

import { FORM_STYLE }
import { useUserStore }
import { settingsSelectors }

import { sttOptions } from './const'

const STT = memo(() => {
  const { t } = useTranslation('setting')
  const [form] = Form.useForm()
  const { tts } = useUserStore(settingsSelectors.currentSettings, isEqual)
  const [setSettings, isUserStateInit] = useUserStore((s) => [s.setSettings, s.isUserStateInit])
  const [loading, setLoading] = useState(false)

  if (!isUserStateInit) return <Skeleton active paragraph={{ rows: 5 }} title={false} />

  const stt: FormGroupItemType = {
    children: [
      {
        children: <Select options={sttOptions} />,
        desc: t('settingTTS.sttService.desc'),
        label: t('settingTTS.sttService.title'),
        name: 'sttServer',
      },
      {
        children: <Switch />,
        desc: t('settingTTS.sttAutoStop.desc'),
        label: t('settingTTS.sttAutoStop.title'),
        layout: 'horizontal',
        minWidth: undefined,
        name: 'sttAutoStop',
        valuePropName: 'checked',
      },
    ],
    extra: loading && <Icon icon={Loader2Icon} size={16} spin style={{ opacity: 0.5 }} />,
    title: t('settingTTS.stt'),
  }

  return (
    <Form
      form={form}
      initialValues={tts}
      items={[stt]}
      itemsType={'group'}
      onValuesChange={async (values) => {
        setLoading(true)
        await setSettings({
          tts: values,
        })
        setLoading(false)
      }}
      variant={'borderless'}
      {...FORM_STYLE}
    />
  )
})

export default STT
