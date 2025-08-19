import { Button }
import React from 'react'
import { useTranslation }
import { Center }

import ErrorResult from '@/features/InitClientDB/ErrorResult'

const initerror = () => {
  const { t } = useTranslation('common')

  return (
    <ErrorResult>
      {({ setOpen }) => (
        <Center gap={8}>
          {t('appLoading.failed')}
          <div>
            <Button onClick={() => setOpen(true)} type={'primary'}>
              {t('appLoading.showDetail')}
            </Button>
          </div>
        </Center>
      )}
    </ErrorResult>
  )
}

export default InitError
