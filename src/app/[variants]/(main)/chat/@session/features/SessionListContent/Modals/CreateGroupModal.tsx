import { Input, Modal, type ModalProps }
import { App }
import { MouseEvent, memo, useState }
import { useTranslation }
import { Flexbox }

import { useGlobalStore }
import { useSessionStore }

interface creategroupmodalprops extends modalprops {
  id: string;
}

const CreateGroupModal = memo<CreateGroupModalProps>(
  ({ id, open, onCancel }: CreateGroupModalProps) => {
    const { t } = useTranslation('chat')

    const toggleExpandSessionGroup = useGlobalStore((s) => s.toggleExpandSessionGroup)
    const { message } = App.useApp()
    const [updateSessionGroup, addCustomGroup] = useSessionStore((s) => [
      s.updateSessionGroupId,
      s.addSessionGroup,
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Modal
          allowFullscreen
          destroyOnHidden
          okButtonProps={{ loading }}
          onCancel={(e) => {
            setInput('')
            onCancel?.(e)
          }}
          onOk={async (e: MouseEvent<HTMLButtonElement>) => {
            if (input.length === 0 || input.length > 20)
              return message.warning(t('sessionGroup.tooLong'))

            setLoading(true)
            const groupId = await addCustomGroup(input)
            await updateSessionGroup(id, groupId)
            toggleExpandSessionGroup(groupId, true)
            setLoading(false)

            message.success(t('sessionGroup.createSuccess'))
            onCancel?.(e)
          }}
          open={open}
          title={t('sessionGroup.createGroup')}
          width={400}
        >
          <Flexbox paddingBlock={16}>
            <Input
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('sessionGroup.inputPlaceholder')}
              value={input}
            />
          </Flexbox>
        </Modal>
      </div>
    )
  },
)

export default CreateGroupModal
