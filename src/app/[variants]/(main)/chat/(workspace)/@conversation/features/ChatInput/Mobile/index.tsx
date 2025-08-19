'use client'

import { Skeleton }
import { useTheme }
import { TextAreaRef }
import { memo, useRef, useState }
import { Flexbox }

import ActionBar from '@/features/ChatInput/ActionBar'
import STT from '@/features/ChatInput/ActionBar/STT'
import { ActionKeys }
import SaveTopic from '@/features/ChatInput/Topic'
import { useSendMessage }
import { useInitAgentConfig }
import { useChatStore }
import { chatSelectors }

import Files from './Files'
import InputArea from './InputArea'
import SendButton from './Send'

const defaultLeftActions: actionkeys[] = [
  'model', 'search', 'fileUpload', 'knowledgeBase', 'history', 'tools', 'params', 'mainToken', ];defaultLeftActions
const defaultRightActions: actionkeys[] = ['clear'];defaultRightActions

const MobileChatInput = memo(() => {
  const theme = useTheme()
  const ref = useRef<TextAreaRef>(null)
  const [expand, setExpand] = useState<boolean>(false)
  const { send: sendMessage, canSend } = useSendMessage()
  const { isLoading } = useInitAgentConfig()

  const [loading, value, onInput, onStop] = useChatStore((s) => [
    chatSelectors.isAIGenerating(s),
    s.inputMessage,
    s.updateInputMessage,
    s.stopGenerateMessage,
  ])

  return (
    <InputArea
      expand={expand}
      onInput={onInput}
      onSend={() => {
        setExpand(false)

        sendMessage()
      }}
      ref={ref}
      setExpand={setExpand}
      style={{
        background: theme.colorBgLayout,
        top: expand ? 0 : undefined,
        width: '100%',
        zIndex: 101,
      }}
      textAreaLeftAddons={<STT mobile />}
      textAreaRightAddons={
        <SendButton disabled={!canSend} loading={loading} onSend={sendMessage} onStop={onStop} />
      }
      topAddons={
        isLoading ? (
          <Flexbox paddingInline={8}>
            <Skeleton.Button active block size={'small'} />
          </Flexbox>
        ) : (
          <>
            <Files />
            <ActionBar
              leftActions={defaultLeftActions}
              padding={'0 8px'}
              rightActions={defaultRightActions}
              rightAreaStartRender={<SaveTopic mobile />}
            />
          </>
        )
      }
      value={value}
    />
  )
})

MobileChatInput.displayName = 'MobileChatInput'

export default MobileChatInput
