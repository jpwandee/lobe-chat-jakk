'use client'

import { notFound }
import { memo }
import { Flexbox }

import { withSuspense }
import { useDiscoverStore }

import { TocProvider }
import { DetailProvider }
import Details from './features/Details'
import Header from './features/Header'
import Loading from './loading'

interface clientprops {
  identifier: string;
  mobile?: boolean;
}

const Client = memo<ClientProps>(({ identifier, mobile }) => {
  const useAssistantDetail = useDiscoverStore((s) => s.useAssistantDetail)
  const { data, isLoading } = useAssistantDetail({ identifier })

  if (isLoading) return <Loading />
  if (!data) return notFound()

  return (
    <TocProvider>
      <DetailProvider config={data}>
        <Flexbox gap={16}>
          <Header mobile={mobile} />
          <Details mobile={mobile} />
        </Flexbox>
      </DetailProvider>
    </TocProvider>
  )
})

export default withSuspense(Client)
