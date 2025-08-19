'use client'

import { useRouter }
import { memo, useEffect }

import { useGlobalStore }
import { systemStatusSelectors }
import { useUserStore }

import { AppLoadingStage }

interface redirectprops {
  setActiveStage: (value: apploadingstage) => void;
}

const Redirect = memo<RedirectProps>(({ setActiveStage }) => {
  const router = useRouter()
  const isUserStateInit = useUserStore((s) => s.isUserStateInit)

  const isPgliteNotEnabled = useGlobalStore(systemStatusSelectors.isPgliteNotEnabled)

  const navToChat = () => {
    setActiveStage(AppLoadingStage.GoToChat)
    router.replace('/chat')
  }

  useEffect(() => {
    // if pglite is not enabled, redirect to chat
    if (isPgliteNotEnabled) {
      navToChat()
      return
    }

    // if user state not init, wait for loading
    if (!isUserStateInit) {
      setActiveStage(AppLoadingStage.InitUser)
      return
    }

    // finally check the conversation status
    navToChat()
  }, [isUserStateInit, isPgliteNotEnabled])

  return null
})

export default Redirect
