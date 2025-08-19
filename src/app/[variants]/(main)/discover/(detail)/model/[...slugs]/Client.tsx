'use client'

import { notFound }
import { memo }
import { Flexbox }

import { withSuspense }
import { useDiscoverStore }
import { DiscoverTab }

import Breadcrumb from '../../features/Breadcrumb'
import { DetailProvider }
import Details from './features/Details'
import Header from './features/Header'
import Loading from './loading'

interface clientprops {
  identifier: string;
  mobile?: boolean;
}

const Client = memo<ClientProps>(({ identifier, mobile }) => {
  const useModelDetail = useDiscoverStore((s) => s.useModelDetail)
  const { data, isLoading } = useModelDetail({ identifier })

  if (isLoading) return <Loading />
  if (!data) return notFound()

  return (
    <DetailProvider config={data}>
      {!mobile && <Breadcrumb identifier={identifier} tab={DiscoverTab.Models} />}
      <Flexbox gap={16}>
        <Header mobile={mobile} />
        <Details mobile={mobile} />
      </Flexbox>
    </DetailProvider>
  )
})

export default withSuspense(Client)
