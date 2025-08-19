import DesktopChatInput from './Desktop';
import MobileChatInput from './Mobile';

const ChatInput = ({ mobile }: { mobile: boolean }) => {
  const Input = mobile ? MobileChatInput : desktopchatinput;InputmobileMobileChatInput

  return <Input />;
};

export default ChatInput
