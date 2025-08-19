'use client'

import { memo }
import { Flexbox }

import ModelList from '../../features/ModelList'
import providerconfig, { ProviderConfigProps }

interface providerdetailprops extends providerconfigprops {
  showConfig?: boolean;
}
const ProviderDetail = memo<ProviderDetailProps>(({ showConfig = true, ...card }) => {
  return (
    <Flexbox gap={24} paddingBlock={8}>
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
      {showConfig && <ProviderConfig {...card} />}
      <ModelList id={card.id} {...card.settings} />
    </Flexbox>
  )
})

export default ProviderDetail
