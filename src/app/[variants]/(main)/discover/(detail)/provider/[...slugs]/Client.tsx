'use client'

import { notFound }
import { memo }
import { Flexbox }

import Breadcrumb from '@/app/[variants]/(main)/discover/(detail)/features/Breadcrumb'
import { withSuspense }
import { useDiscoverStore }
import { DiscoverTab }

import { DetailProvider }
import Details from './features/Details'
import Header from './features/Header'
import Loading from './loading'

interface clientprops {
  identifier: string;
  mobile?: boolean;
}

const Client = memo<ClientProps>(({ identifier, mobile }) => {
  const useProviderDetail = useDiscoverStore((s) => s.useProviderDetail)
  const { data, isLoading } = useProviderDetail({ identifier, withReadme: true })

  if (isLoading) return <Loading />
  if (!data) return notFound()

  return (
    <DetailProvider config={data}>
      {!mobile && <Breadcrumb identifier={identifier} tab={DiscoverTab.Providers} />}
      <Flexbox gap={16}>
        <Header mobile={mobile} />
        <Details mobile={mobile} />
      </Flexbox>
    </DetailProvider>
  )
})

export default withSuspense(Client)
