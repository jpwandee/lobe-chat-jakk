'use client'

import { Form, type FormGroupItemType, Icon }
import { Select }
import { Skeleton }
import isEqual from 'fast-deep-equal'
import { Loader2Icon }
import { memo, useState }
import { useTranslation }

import { FORM_STYLE }
import { useUserStore }
import { settingsSelectors }

import { opeanaiSTTOptions, opeanaiTTSOptions } from './const'

const OpenAI = memo(() => {
  const { t } = useTranslation('setting')
  const [form] = Form.useForm()
  const { tts } = useUserStore(settingsSelectors.currentSettings, isEqual)
  const [setSettings, isUserStateInit] = useUserStore((s) => [s.setSettings, s.isUserStateInit])
  const [loading, setLoading] = useState(false)

  if (!isUserStateInit) return <Skeleton active paragraph={{ rows: 5 }} title={false} />

  const openai: FormGroupItemType = {
    children: [
      {
        children: <Select options={opeanaiTTSOptions} />,
        label: t('settingTTS.openai.ttsModel'),
        name: ['openAI', 'ttsModel'],
      },
      {
        children: <Select options={opeanaiSTTOptions} />,
        label: t('settingTTS.openai.sttModel'),
        name: ['openAI', 'sttModel'],
      },
    ],
    extra: loading && <Icon icon={Loader2Icon} size={16} spin style={{ opacity: 0.5 }} />,
    title: t('settingTTS.openai.title'),
  }

  return (
    <Form
      form={form}
      initialValues={tts}
      items={[openai]}
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

export default OpenAI
