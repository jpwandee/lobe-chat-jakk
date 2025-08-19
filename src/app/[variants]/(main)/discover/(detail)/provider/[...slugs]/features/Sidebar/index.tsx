import { ScrollShadow }
import { memo }
import { Flexbox }

import { useQuery }
import { ProviderNavKey }

import ActionButton from './ActionButton'
import Related from './Related'
import RelatedModels from './RelatedModels'

const sidebar = memo< { mobile?: boolean }>(({ mobile }) => {
  const { activeTab = ProviderNavKey.Overview } = useQuery() as { activeTab: ProviderNavKey }

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
      {activeTab !== ProviderNavKey.Related && <Related />}
      {activeTab !== ProviderNavKey.Overview && <RelatedModels />}
    </ScrollShadow>
  )
})

export default Sidebar
