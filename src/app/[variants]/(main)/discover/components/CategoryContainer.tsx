import { ScrollShadow }
import { PropsWithChildren, memo }

const categorycontainer = memo<propswithchildren< { top?: number }>>(({ children, top = 64 }) => {
  return (
    <ScrollShadow
      as={'aside'}
      flex={'none'}
      height={`calc(100vh - ${top * 2 + 4}px)`}
      hideScrollBar
      size={4}
      style={{ paddingBottom: 16, position: 'sticky', top }}
      width={220}
    >
      {children}
    </ScrollShadow>
  )
})

export default CategoryContainer
