import { ActionIcon, Input, InputProps }
import { FormInstance }
import { LucideDices }
import { memo, useState }
import { useTranslation }

import { generateRandomRoomName }

interface channelnameinputprops extends omit<inputprops, 'form'> {
  form: forminstance;
}

const ChannelNameInput = memo<ChannelNameInputProps>(({ form, ...rest }) => {
  const { t } = useTranslation('setting')
  const [loading, setLoading] = useState(false)

  return (
    <Input
      placeholder={t('sync.webrtc.channelName.placeholder')}
      suffix={
        <ActionIcon
          active
          icon={LucideDices}
          loading={loading}
          onClick={async () => {
            setLoading(true)
            const name = await generateRandomRoomName()
            setLoading(false)
            form.setFieldValue(['sync', 'webrtc', 'channelName'], name)
            form.setFieldValue(['sync', 'webrtc', 'enabled'], false)
            form.submit()
          }}
          size={'small'}
          style={{
            marginRight: -4,
          }}
          title={t('sync.webrtc.channelName.shuffle')}
        />
      }
      {...rest}
    />
  )
})

export default ChannelNameInput
