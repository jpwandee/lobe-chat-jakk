import { throttle }
import { useEffect, useRef }

import { isOnServerSide }

import { SCROLL_PARENT_ID }

export const usescroll = (onScroll: (scroll: number, delta: number) => void) => {
  const lastScrollTop = useRef(0)

  useEffect(() => {
    if (isOnServerSide) return

    const element = document.querySelector(`#${SCROLL_PARENT_ID}`)

    if (!element) return

    const handleScroll = throttle(() => {
      const currentScroll = element.scrollTop
      const delta = currentScroll - lastScrollTop.current

      onScroll?.(currentScroll, delta)

      lastScrollTop.current = currentScroll
    })

    element.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
