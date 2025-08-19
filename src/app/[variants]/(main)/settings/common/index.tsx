import Appearance from './features/Appearance'
import ChatAppearance from './features/ChatAppearance'
import Common from './features/Common'

const page = () => {
  return (
    <>
      <Common />
      <Appearance />
      <ChatAppearance />
    </>
  )
}

Page.displayName = 'CommonSetting'

export default Page
