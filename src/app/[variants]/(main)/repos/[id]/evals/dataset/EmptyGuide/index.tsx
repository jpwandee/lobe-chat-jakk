'use client'

import { Button }
import { memo }
import { useTranslation }
import { Center, Flexbox }

import { useCreateDatasetModal }

interface emptyguideprops {
  knowledgeBaseId: string;
}

const EmptyGuide = memo<EmptyGuideProps>(({ knowledgeBaseId }) => {
  const { t } = useTranslation('ragEval')
  const modal = useCreateDatasetModal()
  return (
    <Center gap={24} height={'100%'} width={'100%'}>
      <div>{t('dataset.emptyGuide')}</div>
      <Flexbox gap={8} horizontal>
        <Button
          onClick={() => {
            modal.open({ knowledgeBaseId })
          }}
          type={'primary'}
        >
          {t('dataset.addNewButton')}
        </Button>
      </Flexbox>
    </Center>
  )
})
export default EmptyGuide
