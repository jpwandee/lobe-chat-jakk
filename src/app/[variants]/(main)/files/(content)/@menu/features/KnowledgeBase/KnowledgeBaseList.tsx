import React from 'react'
import { Flexbox }
import { Virtuoso }

import { useKnowledgeBaseStore }

import EmptyStatus from './EmptyStatus'
import Item from './Item'
import { SkeletonList }

const knowledgebaselist = () => {
  const useFetchKnowledgeBaseList = useKnowledgeBaseStore((s) => s.useFetchKnowledgeBaseList)
  const { data, isLoading } = useFetchKnowledgeBaseList()

  if (isLoading) return <SkeletonList />

  if (data?.length === 0) return <EmptyStatus />

  return (
    <Flexbox height={'100%'}>
      <Virtuoso
        data={data}
        fixedItemHeight={36}
        itemContent={(index, data) => <Item id={data.id} key={data.id} name={data.name} />}
      />
    </Flexbox>
  )
}

export default KnowledgeBaseList
