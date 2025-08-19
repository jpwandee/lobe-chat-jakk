import { ProviderIcon }
import { Avatar, SortableList }
import { memo }
import { Flexbox }

import { AiProviderListItem } from '@/types/aiProvider'

const GroupItem = memo<AiProviderListItem>(({ id, name, source, logo }) => {
  return (
    <>
      <Flexbox gap={8} horizontal>
        {source === 'custom' && logo ? (
          <Avatar
            alt={name || id}
            avatar={logo}
            shape={'square'}
            size={24}
            style={{ borderRadius: 6 }}
          />
        ) : (
          <ProviderIcon provider={id} size={24} style={{ borderRadius: 6 }} type={'avatar'} />
        )}
        {name}
      </Flexbox>
      <SortableList.DragHandle />
    </>
  )
})

export default GroupItem
