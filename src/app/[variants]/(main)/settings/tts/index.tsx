import OpenAI from './features/OpenAI'
import STT from './features/STT'

const page = () => {
  return (
    <>
      <STT />
      <OpenAI />
    </>
  )
}

Page.displayName = 'TtsSetting'

export default Page
