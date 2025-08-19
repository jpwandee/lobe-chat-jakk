import { memo }

import InputArea from '@/features/ChatInput/Desktop/InputArea'
import { useSendMessage }
import { useChatStore }
import { chatSelectors }

const textarea = memo< { onSend?: () => void }>(({ onSend }) => {
  const [loading, value, updateInputMessage] = useChatStore((s) => [
    chatSelectors.isAIGenerating(s),
    s.inputMessage,
    s.updateInputMessage,
  ])
  const { send: sendMessage } = useSendMessage()

  return (
    <InputArea
      loading={loading}
      onChange={updateInputMessage}
      onSend={() => {
        sendMessage()
        onSend?.()
      }}
      value={value}
    />
  )
})

export default TextArea
