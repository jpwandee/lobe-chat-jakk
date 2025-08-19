'use client'

import { memo }

import { fileManagerSelectors, useFileStore }

import Detail from '../../../features/FileDetail'

const filedetail = memo< { id: string }>(({ id }) => {
  const file = useFileStore(fileManagerSelectors.getFileById(id))

  if (!file) return

  return <Detail {...file} />
})
export default FileDetail
