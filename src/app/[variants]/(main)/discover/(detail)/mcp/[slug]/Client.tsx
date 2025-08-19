'use client'

import { notFound }
import { memo }
import { Flexbox }

import { withSuspense }
import { DetailProvider }
import Header from '@/features/MCPPluginDetail/Header'
import { useFetchInstalledPlugins }
import { useQuery }
import { useDiscoverStore }
import { DiscoverTab }

import Breadcrumb from '../../features/Breadcrumb'
import { TocProvider }
import Details from './features/Details'
import Loading from './loading'

const client = memo< { identifier: string; mobile?: boolean }>(({ identifier, mobile }) => {
  const { version } = useQuery() as { version?: string }
  const useMcpDetail = useDiscoverStore((s) => s.useFetchMcpDetail)
  const { data, isLoading } = useMcpDetail({ identifier, version })

  useFetchInstalledPlugins()

  if (isLoading) return <Loading />
  if (!data) return notFound()

  return (
    <TocProvider>
      <DetailProvider config={data}>
        {!mobile && <Breadcrumb identifier={identifier} tab={DiscoverTab.Mcp} />}
        <Flexbox gap={16}>
          <Header mobile={mobile} />
          <Details mobile={mobile} />
        </Flexbox>
      </DetailProvider>
    </TocProvider>
  )
})

export default withSuspense(Client)
