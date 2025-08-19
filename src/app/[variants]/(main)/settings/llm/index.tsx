'use client'

import { Flexbox }

import { isCustomBranding }

import { useProviderList }
import ProviderConfig from './components/ProviderConfig'
import Footer from './features/Footer'

const page = () => {
  const list = useProviderList()

  return (
    <Flexbox gap={24} width={'100%'}>
      {list.map(({ id, ...res }) => (
        <ProviderConfig id={id as any} key={id} {...res} />
      ))}
      {!isCustomBranding && <Footer />}
    </Flexbox>
  )
}

Page.displayName = 'LlmSetting'

export default Page
