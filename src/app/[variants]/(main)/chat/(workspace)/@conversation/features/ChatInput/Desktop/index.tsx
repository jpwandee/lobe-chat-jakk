'use client'

import { memo }

import { ActionKeys }
import desktopchatinput, { FooterRender }
import { useGlobalStore }
import { systemStatusSelectors }

import Footer from './Footer'
import TextArea from './TextArea'

const leftActions = [
  'model',
  'search',
  'fileUpload',
  'knowledgeBase',
  'params',
  'history',
  'stt',
  'tools',
  'mainToken',
] as ActionKeys[]

const rightActions = ['clear'] as ActionKeys[]

const rendertextarea = (onSend: () => void) => <textarea onsend={onSend}

const renderFooter: FooterRender = ({ expand, onExpandChange }) => (
  <Footer expand={expand} onExpandChange={onExpandChange} />
);renderFooter

const Desktop = memo(() => {
  const [inputHeight, updatePreference] = useGlobalStore((s) => [
    systemStatusSelectors.inputHeight(s),
    s.updateSystemStatus,
  ])

  return (
    <DesktopChatInput
      inputHeight={inputHeight}
      leftActions={leftActions}
      onInputHeightChange={(height) => {
        updatePreference({ inputHeight: height })
      }}
      renderFooter={renderFooter}
      renderTextArea={renderTextArea}
      rightActions={rightActions}
    />
  )
})

export default Desktop
