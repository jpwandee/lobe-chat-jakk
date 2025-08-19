'use client'

import { memo }
import { Flexbox }

import { withSuspense }
import { useQuery }
import { useDiscoverStore }
import { AssistantQueryParams, DiscoverTab }

import Pagination from '../features/Pagination'
import List from './features/List'
import Loading from './loading'

const client = memo< { mobile?: boolean }>(() => {
  const { q, page, category, sort, order } = useQuery() as AssistantQueryParams
  const useAssistantList = useDiscoverStore((s) => s.useAssistantList)
  const { data, isLoading } = useAssistantList({
    category,
    order,
    page,
    pageSize: 21,
    q,
    sort,
  })

  if (isLoading || !data) return <Loading />

  const { items, currentPage, pageSize, totalCount } = data

  return (
    <Flexbox gap={32} width={'100%'}>
      <List data={items} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        tab={DiscoverTab.Assistants}
        total={totalCount}
      />
    </Flexbox>
  )
})

export default withSuspense(Client)
