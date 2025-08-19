'use client'

import { Button, Tooltip }
import isEqual from 'fast-deep-equal'
import { SettingsIcon }
import { memo, useState }
import { useTranslation }

import { aiProviderSelectors, useAiInfraStore } from '@/store/aiInfra'

import SettingModal from './SettingModal'

const UpdateProviderInfo = memo(() => {
  const { t } = useTranslation('modelProvider')

  const [open, setOpen] = useState(false)
  const providerConfig = useAiInfraStore(aiProviderSelectors.activeProviderConfig, isEqual)

  return (
    <>
      <Tooltip title={t('updateAiProvider.tooltip')}>
        <Button
          icon={SettingsIcon}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }}
          size={'small'}
          type={'text'}
        />
      </Tooltip>
      {open && providerConfig && (
        <SettingModal
          id={providerConfig.id}
          initialValues={providerConfig}
          onClose={() => {
            setOpen(false)
          }}
          open={open}
        />
      )}
    </>
  )
})

export default UpdateProviderInfo
