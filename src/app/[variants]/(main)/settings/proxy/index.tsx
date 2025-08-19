'use client'

import { useTranslation }

import PageTitle from '@/components/PageTitle'

import ProxyForm from './features/ProxyForm'

const proxysettings = () => {
  const { t } = useTranslation('setting')

  return (
    <div>
      <PageTitle title={t('tab.proxy')} />
      <ProxyForm />
    </div>
  )
}

ProxySettings.displayName = 'ProxySettings'

export default ProxySettings
