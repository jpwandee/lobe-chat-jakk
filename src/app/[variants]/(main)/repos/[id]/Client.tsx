'use client'

import { memo }
import { Flexbox }

import FileManager from '@/features/FileManager'
import FilePanel from '@/features/FileSidePanel'
import { knowledgeBaseSelectors, useKnowledgeBaseStore }

import Menu from './features/Menu'
import { useKnowledgeBaseItem }

const repoclientpage = memo< { id: string }>(({ id }) => {
  useKnowledgeBaseItem(id)
  const name = useKnowledgeBaseStore(knowledgeBaseSelectors.getKnowledgeBaseNameById(id))

  return (
    <>
      <FilePanel>
        <Menu id={id} />
      </FilePanel>
      <Flexbox flex={1} style={{ overflow: 'hidden', position: 'relative' }}>
        <FileManager knowledgeBaseId={id} title={name} />
      </Flexbox>
    </>
  )
})

export default RepoClientPage
