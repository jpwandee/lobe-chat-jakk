'use client'

import { memo }
import { Flexbox }

import { withSuspense }
import { useQuery }
import { useDiscoverStore }
import { DiscoverTab, ProviderQueryParams }

import Pagination from '../features/Pagination'
import List from './features/List'
import Loading from './loading'

const client = memo< { mobile?: boolean }>(() => {
  const { q, page, sort, order } = useQuery() as ProviderQueryParams
  const useProviderList = useDiscoverStore((s) => s.useProviderList)
  const { data, isLoading } = useProviderList({
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
        tab={DiscoverTab.Providers}
        total={totalCount}
      />
    </Flexbox>
  )
})

export default withSuspense(Client)
