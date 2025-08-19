'use client'

import { ActionIcon }
import { PlusIcon }
import { useState }
import { useTranslation }

import CreateNewProvider from '../features/CreateNewProvider'

const addnewprovider = () => {
  const { t } = useTranslation('modelProvider')
  const [open, setOpen] = useState(false)

  return (
    <>
      <ActionIcon
        icon={PlusIcon}
        onClick={() => setOpen(true)}
        size={{
          blockSize: 34,
          size: 18,
        }}
        title={t('menu.addCustomProvider')}
        variant={'filled'}
      />
      <CreateNewProvider onClose={() => setOpen(false)} open={open} />
    </>
  )
}

export default AddNewProvider
