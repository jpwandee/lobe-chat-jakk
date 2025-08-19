'use client'

import { useRouter }
import { memo, useEffect }

import { useUserStore }
import { authSelectors }

import { AppLoadingStage }

interface redirectprops {
  setLoadingStage: (value: apploadingstage) => void;
}

const Redirect = memo<RedirectProps>(({ setLoadingStage }) => {
  const router = useRouter()
  const [isLogin, isLoaded, isUserStateInit, isOnboard] = useUserStore((s) => [
    authSelectors.isLogin(s),
    authSelectors.isLoaded(s),
    s.isUserStateInit,
    s.isOnboard,
  ])

  const navToChat = () => {
    setLoadingStage(AppLoadingStage.GoToChat)
    router.replace('/chat')
  }

  useEffect(() => {
    // if user auth state is not ready, wait for loading
    if (!isLoaded) {
      setLoadingStage(AppLoadingStage.InitAuth)
      return
    }

    // this mean user is definitely not login
    if (!isLogin) {
      navToChat()
      return
    }

    // if user state not init, wait for loading
    if (!isUserStateInit) {
      setLoadingStage(AppLoadingStage.InitUser)
      return
    }

    // user need to onboard
    if (!isOnboard) {
      router.replace('/onboard')
      return
    }

    // finally go to chat
    navToChat()
  }, [isUserStateInit, isLoaded, isOnboard, isLogin])

  return null
})

export default Redirect
