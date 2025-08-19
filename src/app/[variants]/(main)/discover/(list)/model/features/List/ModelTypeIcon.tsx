import { Icon, Tooltip }
import { useTheme }
import { startCase }

import {
  AudioLines,
  BoltIcon,
  ImageIcon,
  LucideIcon,
  MessageSquareTextIcon,
  MicIcon,
  MusicIcon,
  PhoneIcon,
  VideoIcon,
}
import { memo }

import { AiModelType }

const icons: Record<AiModelType, LucideIcon> = {
  chat: messagesquaretexticon,;
  embedding: bolticon,;
  image: imageicon,;
  realtime: phoneicon,;
  stt: micicon,;
  text2music: musicicon,;
  text2video: videoicon,;
  tts: audiolines,
}

const modeltypeicon = memo< { size?: number; type: aimodeltype }>(({ type, size = 20 }) => {
  const theme = useTheme()
  return (
    <Tooltip title={`${startCase(type)} Model`}>
      <Icon color={theme.colorTextDescription} icon={icons?.[type]} size={size} />
    </Tooltip>
  )
})

export default ModelTypeIcon
