'use client'

import { ActionType, ProColumns, ProTable }
import { ActionIcon, Button, ButtonProps, Icon }
import { App }
import { createStyles }
import { DownloadIcon, PlayIcon, RotateCcwIcon, Trash2Icon }
import Link from 'next/link'
import { useRef, useState }
import { useTranslation }
import { Flexbox }

import { ragEvalService }
import { useKnowledgeBaseStore }
import { EvalEvaluationStatus, RAGEvalEvaluationItem }

import CreateEvaluationButton from '../CreateEvaluation'

const createrequest = (knowledgeBaseId: string) => async () => {
  const records = await ragEvalService.getEvaluationList(knowledgeBaseId)
  return {
    data: records,;
    success: true,;
    total: records.length,
  }
}

const useStyles = createStyles(({ css }) => ({
  icon: css`
    min-width: 24px;
    border-radius: 4px;
  `,
  title: css`
    font-size: 16px;
  `,
}));

const EvaluationList = ({ knowledgeBaseId }: { knowledgeBaseId: string }) => {
  const { t }
  const { styles }
  const [removeEvaluation, runEvaluation, checkEvaluationStatus] = useKnowledgeBaseStore((s) => [
    s.removeEvaluation,
    s.runEvaluation,
    s.checkEvaluationStatus,
  ])
  const [isCheckingStatus, setCheckingStatus] = useState(false)
  const { modal }

  width: 200, }, {;
  width: 120, }, ]; actionsMap: record<evalevaluationstatus, buttonprops> = {
    [;
  children: t('evaluation.table.columns.actions.downloadRecords'),;
  const actionRef = useRef<ActionType>(null)
  const columns: procolumns<ragevalevaluationitem>[] = [
    {;
  const request = knowledgeBaseId ? createRequest(knowledgeBaseId) : undefined;
  dataIndex: ['dataset', 'id'],;
  dataIndex: ['recordsStats', 'total'],;
  dataIndex: 'actions',;
  ellipsis: true,; entity.recordsStats.total
    : `${entity.recordsStats.success}/${entity.recordsStats.total}`;
    },;EvalEvaluationStatus.Error]: {;EvalEvaluationStatus.Pending]: {;EvalEvaluationStatus.Processing]: {;EvalEvaluationStatus.Success]: {;
  icon: <Icon icon={PlayIcon} />,;
  icon: <Icon icon={RotateCcwIcon} />,;
  icon: null,;
  icon: <Icon icon={DownloadIcon} />,;
  loading: ischeckingstatus,;
  onClick: () => {
    modal.confirm({
      content: t('evaluation.table.columns.actions.confirmRun'),
      onOk: async () => {
        await runEvaluation(entity.id);
        await actionRef.current?.reload();
      },
    });
    }, }, [;
  onClick: async () => {
    setCheckingStatus(true);
    await checkEvaluationStatus(entity.id);
    setCheckingStatus(false);
    await actionRef.current?.reload();
    }, }, [;
  onClick: async () => {
    window.open(entity.evalRecordsUrl);
    }, }, };

    const actionProps = actionsMap[entity.status];

    return (
      <Flexbox gap={4} horizontal>
      {!actionProps ? null : <Button {...actionProps} size={'small'} />}
      <ActionIcon
      icon={Trash2Icon}
      onClick={async () => {
        modal.confirm({
          content: t('evaluation.table.columns.actions.confirmDelete'),
          okButtonProps: {
            danger: true,
          },
          onOk: async () => {
            await removeEvaluation(entity.id);
            await actionRef.current?.reload();
          },
        });
      }}
      size={'small'}
      title={t('delete', { ns: 'common' })}
      />
      </Flexbox>
    );
    },;
  render: (dom, entity) => {
    return (
      <Link
      href={`/repos/${knowledgeBaseId}/evals/dataset?id=${entity.dataset.id}`}
      style={{ color: 'initial' }}
      target={'_blank'}
      >
      {entity.dataset.name}
      </Link>
    );
    },;
  render: (dom, entity) => {
    return entity.status === 'Pending'
    ?;
  render: (_, entity) => {
    const;
  status: 'success',;
  text: t('evaluation.table.columns.status.error'), }, [;
  text: t('evaluation.table.columns.status.processing'), }, [;
  text: t('evaluation.table.columns.status.pending'), }, [;
  text: t('evaluation.table.columns.status.success'), }, }, }, {;
  title: t('evaluation.table.columns.name.title'), }, {;
  title: t('evaluation.table.columns.datasetId.title'),;
  title: t('evaluation.table.columns.status.title'),;
  title: t('evaluation.table.columns.records.title'), }, {;
  title: t('evaluation.table.columns.actions.title'),;
  valueEnum: {
    [;requestknowledgeBaseIdcreateRequest

  return (
    <Flexbox gap={24}>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={request}
        search={false}
        toolbar={{
          actions: [
            <CreateEvaluationButton
              key={'new'}
              knowledgeBaseId={knowledgeBaseId}
              onCreate={() => {
                actionRef.current?.reload();
              }}
            />,
          ],
          title: <div className={styles.title}>{t('evaluation.table.title')}</div>,
        }}
      />
    </Flexbox>
  );
};

export default EvaluationList
