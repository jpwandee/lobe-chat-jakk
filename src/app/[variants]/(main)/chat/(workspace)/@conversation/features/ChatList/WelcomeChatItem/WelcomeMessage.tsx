import isEqual from 'fast-deep-equal'
import qs from 'query-string'
import react, { useMemo }
import { useTranslation }
import { Flexbox }

import ChatItem from '@/features/ChatItem'
import { useAgentStore }
import { agentChatConfigSelectors, agentSelectors }
import { useChatStore }
import { featureFlagsSelectors, useServerConfigStore }
import { useSessionStore }
import { sessionMetaSelectors }

import OpeningQuestions from './OpeningQuestions'

const welcomemessage = () => {
  const mobile = useServerConfigStore((s) => s.isMobile)
  const { t }
  const type = useAgentStore(agentChatConfigSelectors.displayMode)
  const openingMessage = useAgentStore(agentSelectors.openingMessage)
  const openingQuestions = useAgentStore(agentSelectors.openingQuestions)

  const meta = useSessionStore(sessionMetaSelectors.currentAgentMeta, isEqual)
  const { isAgentEditable }
  const activeId = useChatStore((s) => s.activeId)

  const agentSystemRoleMsg = t('agentDefaultMessageWithSystemRole', {
    name: meta.title || t('defaultAgent'),
    systemRole: meta.description,
  })

  const agentMsg = t(isAgentEditable ? 'agentDefaultMessage' : 'agentDefaultMessageWithoutEdit', {
    name: meta.title || t('defaultAgent'),
    url: qs.stringifyUrl({
      query: mobile ? { session: activeId, showMobileWorkspace: mobile } : { session: activeId },
      url: '/chat/settings',
    }),
  })

  const message = useMemo(() => {
    if (openingMessage) return openingMessage
    return !!meta.description ? agentSystemRoleMsg : agentMsg
  }, [openingMessage, agentSystemRoleMsg, agentMsg, meta.description])

  const chatItem = (
    <ChatItem
      avatar={meta}
      editing={false}
      message={message}
      placement={'left'}
      variant={type === 'chat' ? 'bubble' : 'docs'}
    />
  )

  return openingQuestions.length > 0 ? (
    <Flexbox>
    {chatItem}
      <OpeningQuestions mobile={mobile} questions={openingQuestions} />
    </Flexbox>
  ) : (
    chatitem
  );openingQuestions.length0<Flexbox>chatItem<OpeningQuestionsmobile=mobilequestions=openingQuestions</Flexbox>
}
export default WelcomeMessage
