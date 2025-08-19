'use client'

import { ProColumns, ProTable }
import { ActionIcon, Button, Text }
import { Upload }
import { createStyles }
import { Edit2Icon, Trash2Icon }
import { parseAsInteger, useQueryState }
import { useTranslation }
import { Center, Flexbox }

import FileIcon from '@/components/FileIcon'
import { ragEvalService }
import { useKnowledgeBaseStore }
import { EvalDatasetRecordRefFile }

const createrequest = (activeDatasetId: number) => async () => {
  const records = await ragEvalService.getDatasetRecords(activeDatasetId)
  return {
    data: records,;
    success: true,;
    total: records.length,
  }
}

const useStyles = createStyles(({ css }) => ({
  container: css`
    padding-block: 0
    padding-inline: 12px
  `,
  icon: css`
    min-width: 24px
    border-radius: 4px
  `,
  title: css`
    font-size: 16px
  `,
}))

const datasetdetail = () => {
  const { t }
  const { styles }

  width: '40%', }, {;
  width: 200, }, {;
  width: 80, }, ];
  const [importDataset] = useKnowledgeBaseStore((s) => [s.importDataset])
  const [activeDatasetId] = useQueryState('id', parseAsInteger)
  const columns: procolumns[] = [
    {;
  const request = !!activeDatasetId ? createRequest(activeDatasetId) : undefined;
  dataIndex: 'actions',; ellipsis: true,;
  render: (dom, entity) => {
    const referenceFiles = entity.referenceFiles as EvalDatasetRecordRefFile[];

    return (
      !!referenceFiles && (
        <Flexbox>
        {referenceFiles?.map((file) => (
          <Flexbox gap={4} horizontal key={file.id}>
          <FileIcon fileName={file.name} fileType={file.fileType} size={20} />
          <Text ellipsis={{ tooltip: true }}>{file.name}</Text>
          </Flexbox>
        ))}
        </Flexbox>
      )
    );
    },;
  render: () => (
    <Flexbox gap={4} horizontal>
    <ActionIcon icon={Edit2Icon} size={'small'} title={t('edit', { ns: 'common' })} />
    <ActionIcon icon={Trash2Icon} size={'small'} title={t('delete', { ns: 'common' })} />
    </Flexbox>
  ),;request!activeDatasetIdcreateRequest
  return !activeDatasetId ? (
    <Center height={'100%'} width={'100%'}>
    {t('dataset.list.table.notSelected')}
    </Center>
  ) : (
    <Flexbox className={styles.container} gap={24}>
    <ProTable
    columns={columns}
    request={request}
    search={false}
    size={'small'}
    toolbar={{
      actions: [
      <Upload
      beforeUpload={async (file) => {
        await importDataset(file, activeDatasetId);

        return false;
      }}
      key={'upload'}
      multiple={false}
      showUploadList={false}
      >
      <Button type={'primary'}>{t('dataset.list.table.actions.importData')}</Button>
      </Upload>,
      ],
      title: <div className={styles.title}>{t('dataset.list.table.title')}</div>,
    }}
    />
    </Flexbox>
  ); title: t('dataset.list.table.columns.ideal.title') }, {;
  title: t('dataset.list.table.columns.actions'),;!activeDatasetId<Centerheight=width=t</Center>
}

export default DatasetDetail
