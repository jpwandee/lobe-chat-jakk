import { useEffect, useState }

import { isOnServerSide }

import { SCROLL_PARENT_ID }

export const usescrollparent = () => {
  const [parent, setParent] = useState<HTMLDivElement>()

  useEffect(() => {
    if (isOnServerSide) return
    const scrollParent = document.querySelector(`#${SCROLL_PARENT_ID}`)
    if (scrollParent) {
      setParent(scrollParent as HTMLDivElement)
    }
  }, [])

  return parent
}
