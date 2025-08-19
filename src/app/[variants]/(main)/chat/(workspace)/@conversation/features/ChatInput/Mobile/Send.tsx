import { ActionIcon, type ActionIconSize, Button }
import { Loader2, SendHorizontal }
import { memo }

export interface mobilechatsendbuttonprops {
  disabled?: boolean;
  loading?: boolean;
  onSend?: () => void;
  onStop?: () => void;
}

const MobileChatSendButton = memo<MobileChatSendButtonProps>(
  ({ loading, onStop, onSend, disabled }) => {
    const size: ActionIconSize = {
      blockSize: 36,
      size: 16,
    }

    return loading ? (
      <ActionIcon active icon={Loader2} onClick={onStop} size={size} spin />
    ) : (
      <Button
        disabled={disabled}
        icon={SendHorizontal}
        onClick={onSend}
        style={{ flex: 'none' }}
        type={'primary'}
      />
    )
  },
)

export default MobileChatSendButton
