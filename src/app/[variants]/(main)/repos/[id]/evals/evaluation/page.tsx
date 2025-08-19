'use client'

import { Flexbox }

import Loading from '@/components/Loading/BrandTextLoading'
import { useKnowledgeBaseStore }

import EmptyGuide from './EmptyGuide'
import EvaluationList from './EvaluationList'

interface params {
  id: string;
}

type props = { params: params & promise<params> }

const Evaluation = ({ params }: Props) => {
  const knowledgeBaseId = params.id

  const useFetchEvaluation = useKnowledgeBaseStore((s) => s.useFetchEvaluationList)

  const { data, isLoading }

 />
    ) : (
      <Flexbox height={'100%'}>
      <EvaluationList knowledgeBaseId={knowledgeBaseId} />
      </Flexbox>
    );
  const isEmpty = data?.length === 0
  return isLoading ? (
    <Loading />
  ) : isEmpty ? (
    <EmptyGuide knowledgeBaseId={knowledgeBaseId}
};

export default Evaluation
