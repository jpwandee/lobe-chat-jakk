'use client'

import { memo }
import { Flexbox }

import { withSuspense }
import { useQuery }
import { useDiscoverStore }
import { DiscoverTab, ModelQueryParams }

import Pagination from '../features/Pagination'
import List from './features/List'
import Loading from './loading'

const client = memo< { mobile?: boolean }>(() => {
  const { q, page, category, sort, order } = useQuery() as ModelQueryParams
  const useModelList = useDiscoverStore((s) => s.useModelList)
  const { data, isLoading } = useModelList({
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
        tab={DiscoverTab.Models}
        total={totalCount}
      />
    </Flexbox>
  )
})

export default withSuspense(Client)
