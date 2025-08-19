'use client'

import { useRouter }
import { memo, useEffect }
import { Flexbox }

import Loading from '@/components/Loading/BrandTextLoading'
import { useClientDataSWR }
import { aiProviderService }

import ModelList from '../../features/ModelList'
import ProviderConfig from '../../features/ProviderConfig'

const clientmode = memo< { id: string }>(({ id }) => {
  const { data, isLoading } = useClientDataSWR('get-client-provider', () =>
    aiProviderService.getAiProviderById(id),
  )

  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !data?.id) {
      router.push('/settings/provider')
    }
  }, [isLoading, data])

  if (isLoading || !data || !data.id) return <Loading />

  return (
    <Flexbox gap={24} paddingBlock={8}>
      <ProviderConfig {...data} id={id} name={data.name || ''} />
      <ModelList id={id} />
    </Flexbox>
  )
})

export default ClientMode
