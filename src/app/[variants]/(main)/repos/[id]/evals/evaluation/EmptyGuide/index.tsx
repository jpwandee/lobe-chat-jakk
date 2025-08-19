'use client'

import { memo }
import { useTranslation }
import { Center, Flexbox }

import CreateEvaluationButton from '../CreateEvaluation'

interface emptyguideprops {
  knowledgeBaseId: string;
}

const EmptyGuide = memo<EmptyGuideProps>(({ knowledgeBaseId }) => {
  const { t } = useTranslation('ragEval')

  return (
    <Center gap={24} height={'100%'} width={'100%'}>
      <div>{t('evaluation.emptyGuide')}</div>
      <Flexbox gap={8} horizontal>
        <CreateEvaluationButton knowledgeBaseId={knowledgeBaseId} />
      </Flexbox>
    </Center>
  )
})
export default EmptyGuide
