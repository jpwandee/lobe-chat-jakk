'use client'

import { memo }

import FileViewer from '@/features/FileViewer'
import { fileManagerSelectors, useFileStore }

const filepreview = memo< { id: string }>(({ id }) => {
  const file = useFileStore(fileManagerSelectors.getFileById(id))

  if (!file) return

  return <FileViewer {...file} />
})
export default FilePreview
