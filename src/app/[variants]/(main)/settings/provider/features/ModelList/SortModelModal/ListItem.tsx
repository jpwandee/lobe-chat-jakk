import { ModelIcon }
import { SortableList }
import { memo }
import { Flexbox }

import { AiProviderModelListItem } from '@/types/aiModel'

const ListItem = memo<AiProviderModelListItem>(({ id, displayName }) => {
  return (
    <>
      <Flexbox gap={8} horizontal>
        <ModelIcon model={id} size={24} type={'avatar'} />
        {displayName || id}
      </Flexbox>
      <SortableList.DragHandle />
    </>
  )
})

export default ListItem
