'use client'

import { useTheme }
import { PropsWithChildren, memo }
import { Flexbox } from 'react-layout-kit'

const Workspace = memo<PropsWithChildren>(({ children }) => {
  const theme = useTheme()
  return (
    <Flexbox
      flex={1}
      style={{
        background: theme.colorBgContainerSecondary,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </Flexbox>
  )
})

export default Workspace
