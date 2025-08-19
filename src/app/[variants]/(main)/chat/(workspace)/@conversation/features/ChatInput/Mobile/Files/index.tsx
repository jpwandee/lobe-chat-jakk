import { PreviewGroup }
import isEqual from 'fast-deep-equal'
import { memo }
import { Flexbox }

import { filesSelectors, useFileStore } from '@/store/file'

import FileItem from './FileItem'

const Files = memo(() => {
  const list = useFileStore(filesSelectors.chatUploadFileList, isEqual)

  if (!list || list?.length === 0) return null

  return (
    <Flexbox paddingBlock={4} style={{ position: 'relative' }}>
      <Flexbox
        gap={4}
        horizontal
        padding={'4px 8px 8px'}
        style={{ overflow: 'scroll', width: '100%' }}
      >
        <PreviewGroup>
          {list.map((i) => (
            <FileItem {...i} key={i.id} loading={i.status === 'pending'} />
          ))}
        </PreviewGroup>
      </Flexbox>
    </Flexbox>
  )
})

export default Files
