'use client'

import { ActionIcon }
import { PlusIcon }
import { memo }
import { useTranslation }
import { Flexbox }
import { Virtuoso }

import { RAGEvalDataSetItem }

import Item from './Item'

interface datasetlistprops {
  dataSource: ragevaldatasetitem[];
}

const DatasetList = memo<DatasetListProps>(({ dataSource }) => {
  const { t } = useTranslation('ragEval')

  return (
    <Flexbox gap={24} height={'100%'}>
      <Flexbox align={'center'} horizontal justify={'space-between'}>
        <span>{t('dataset.list.title')}</span>
        <ActionIcon icon={PlusIcon} size={'small'} />
      </Flexbox>
      <Virtuoso data={dataSource} itemContent={(index, data) => <Item {...data} key={data.id} />} />
    </Flexbox>
  )
})

export default DatasetList
