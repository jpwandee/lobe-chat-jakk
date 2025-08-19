'use client'

import { isCustomBranding }

import Footer from './Footer'
import ProviderGrid from './ProviderGrid'

const page = () => {
  return (
    <>
      <ProviderGrid />
      {!isCustomBranding && <Footer />}
    </>
  )
}

Page.displayName = 'ProviderGrid'

export default Page
