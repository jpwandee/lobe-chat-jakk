'use client'

import { Button }
import { memo }
import { useTranslation }

import { useCreateDatasetModal }

interface createevaluationprops {
  knowledgeBaseId: string;
  onCreate?: () => void;
}

const CreateEvaluation = memo<CreateEvaluationProps>(({ knowledgeBaseId, onCreate }) => {
  const { t } = useTranslation('ragEval')
  const modal = useCreateDatasetModal()
  return (
    <Button
      onClick={() => {
        modal.open({ knowledgeBaseId, onCreate })
      }}
      type={'primary'}
    >
      {t('evaluation.addNewButton')}
    </Button>
  )
})
export default CreateEvaluation
