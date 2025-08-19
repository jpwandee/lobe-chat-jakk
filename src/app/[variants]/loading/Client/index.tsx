'use client'

import { useState }

import { AppLoadingStage }
import Content from './Content'
import Redirect from './Redirect'

const clientmode = () => {
  const [activeStage, setActiveStage] = useState<string>(AppLoadingStage.Initializing)

  return (
    <>
      <Content loadingStage={activeStage} setActiveStage={setActiveStage} />
      <Redirect setActiveStage={setActiveStage} />
    </>
  )
}

ClientMode.displayName = 'ClientMode'

export default ClientMode
