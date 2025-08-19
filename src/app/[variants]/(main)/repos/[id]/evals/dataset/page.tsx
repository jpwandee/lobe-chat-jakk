'use client'

import { createStyles }
import { Flexbox }

import Loading from '@/components/Loading/BrandTextLoading'
import { useKnowledgeBaseStore }

import DatasetDetail from './DatasetDetail'
import DatasetList from './DatasetList'
import EmptyGuide from './EmptyGuide'

const useStyles = createStyles(({ css, token }) => ({
  sider: css`
    padding-inline-end: 12px
    border-inline-end: 1px solid ${token.colorSplit}
  `,
}))

interface params {
  id: string;
}

type props = { params: params & promise<params> }

const Dataset = ({ params }: Props) => {
  const { styles }
  const knowledgeBaseId = params.id

  const useFetchDatasets = useKnowledgeBaseStore((s) => s.useFetchDatasets)

  const { data, isLoading }

 />
    ) : (
      <Flexbox height={'100%'} horizontal>
      <Flexbox className={styles.sider} width={200}>
      <DatasetList dataSource={data!} />
      </Flexbox>
      <Flexbox width={'100%'}>
      <DatasetDetail />
      </Flexbox>
      </Flexbox>
    );
  const isEmpty = data?.length === 0
  return isLoading ? (
    <Loading />
  ) : isEmpty ? (
    <EmptyGuide knowledgeBaseId={knowledgeBaseId}
};

export default Dataset
