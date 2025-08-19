'use client'

import { useState }

import { AppLoadingStage }
import Content from './Content'
import Redirect from './Redirect'

const servermode = () => {
  const [loadingStage, setLoadingStage] = useState(AppLoadingStage.Initializing)

  return (
    <>
      <Content loadingStage={loadingStage} />
      <Redirect setLoadingStage={setLoadingStage} />
    </>
  )
}

ServerMode.displayName = 'ServerMode'

export default ServerMode
