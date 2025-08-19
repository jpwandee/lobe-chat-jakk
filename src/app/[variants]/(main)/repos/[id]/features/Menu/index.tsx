import { memo }
import { Flexbox }

import Head from './Head'
import Menu from './Menu'

const composemenu = memo< { id: string }>(({ id }) => {
  return (
    <Flexbox gap={16} height={'100%'} paddingInline={12} style={{ paddingTop: 12 }}>
      <Head id={id} />
      <Menu />
    </Flexbox>
  )
})

ComposeMenu.displayName = 'ComposeMenu'

export default ComposeMenu
