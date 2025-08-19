import { ScrollShadow }
import { memo }
import { Flexbox }

import { useQuery }
import { ModelNavKey }

import ActionButton from './ActionButton'
import Related from './Related'
import RelatedProviders from './RelatedProviders'

const sidebar = memo< { mobile?: boolean }>(({ mobile }) => {
  const { activeTab = ModelNavKey.Overview } = useQuery() as { activeTab: ModelNavKey }

  if (mobile) {
    return (
      <Flexbox gap={32}>
        <ActionButton />
      </Flexbox>
    )
  }

  return (
    <ScrollShadow
      flex={'none'}
      gap={32}
      hideScrollBar
      size={4}
      style={{
        maxHeight: 'calc(100vh - 76px)',
        paddingBottom: 24,
        position: 'sticky',
        top: 0,
      }}
      width={360}
    >
      <ActionButton />
      {activeTab !== ModelNavKey.Related && <Related />}
      {activeTab !== ModelNavKey.Overview && <RelatedProviders />}
    </ScrollShadow>
  )
})

export default Sidebar
