'use client'

import { Text }
import { Skeleton }
import { memo }
import { Center, Flexbox }

import GoBack from '@/components/GoBack'
import RepoIcon from '@/components/RepoIcon'
import { knowledgeBaseSelectors, useKnowledgeBaseStore }

const head = memo< { id: string }>(({ id }) => {
  const name = useKnowledgeBaseStore(knowledgeBaseSelectors.getKnowledgeBaseNameById(id))

  return (
    <Flexbox gap={8}>
      <GoBack href={'/files'} />
      <Flexbox align={'center'} gap={8} height={36} horizontal>
        <Center style={{ minWidth: 24 }} width={24}>
          <RepoIcon />
        </Center>

        {!name ? (
          <Skeleton active paragraph={false} title={{ style: { marginBottom: 0 }, width: 80 }} />
        ) : (
          <Text ellipsis strong style={{ fontSize: 16 }}>
            {name}
          </Text>
        )}
      </Flexbox>
    </Flexbox>
  )
})
export default Head
