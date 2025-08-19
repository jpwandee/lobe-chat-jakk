'use client'

import { useTheme }
import { PropsWithChildren, memo }
import { Flexbox } from 'react-layout-kit'

const Container = memo<PropsWithChildren>(({ children }) => {
  const theme = useTheme()

  return (
    <Flexbox
      height={'100%'}
      style={{
        background: theme.colorBgContainerSecondary,
        overflow: 'hidden',
        position: 'relative',
      }}
      width={'100%'}
    >
      {children}
    </Flexbox>
  )
})

export default Container
