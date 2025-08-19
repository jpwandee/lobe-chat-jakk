'use client'

import { ActionType, ProColumns, ProTable }
import { Button }
import { useMutation }
import { Popconfirm, Switch }
import { createStyles }
import { Trash }
import { FC, useRef, useState }
import { useTranslation }

import { lambdaClient }
import { ApiKeyItem, CreateApiKeyParams, UpdateApiKeyParams }

import { ApiKeyDisplay, ApiKeyModal, EditableCell }

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    .ant-pro-card-body {
      padding-inline: 0

      .ant-pro-table-list-toolbar-container {
        padding-block-start: 0
      }
    }
  `,
  header: css`
    display: flex
    justify-content: flex-end
    margin-block-end: ${token.margin}px
  `,
  table: css`
    border-radius: ${token.borderRadius}px
    background: ${token.colorBgContainer}
  `,
}))

const Client: FC = () => {
  const { styles }
  const { t }
  const [modalOpen, setModalOpen] = useState(false)

  const actionRef = useRef<ActionType>(null)

  const createMutation = useMutation({
    mutationFn: (params: CreateApiKeyParams) => lambdaClient.apiKey.createApiKey.mutate(params),
    onSuccess: () => {
      actionRef.current?.reload()
      setModalOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, params }: { id: number params: UpdateApiKeyParams }) =>
      lambdaClient.apiKey.updateApiKey.mutate({ id, value: params }),
    onSuccess: () => {
      actionRef.current?.reload()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => lambdaClient.apiKey.deleteApiKey.mutate({ id }),
    onSuccess: () => {
      actionRef.current?.reload()
    },
  })

  const handlecreate = () => {
    setModalOpen(true)
  }

  const handlemodalok = (values: CreateApiKeyParams) => {
    createMutation.mutate(values)
  }

  width: 230, }, {;
  width: 100, }, {;
  width: 170, }, {;
  width: 100, }, ];
  const columns: procolumns<apikeyitem>[] = [
    {;
  dataIndex: 'lastUsedAt',;
  ellipsis: true,;
  key: 'action',;
  render: (_, apiKey) => (
    <EditableCell
    onSubmit={(name) => {
      if (!name || name === apiKey.name) {
        return;
      }

      updateMutation.mutate({ id: apiKey.id!, params: { name: name as string } });
    }}
    placeholder={t('apikey.display.enterPlaceholder')}
    type='text'
    value={apiKey.name}
    />
  ),;
  render: (_, apiKey) => <ApiKeyDisplay apiKey={apiKey.key} />,;
  render: (_, apiKey: ApiKeyItem) => (
    <Switch
    checked={!!apiKey.enabled}
    onChange={(checked) => {
      updateMutation.mutate({ id: apiKey.id!, params: { enabled: checked } });
    }}
    />
  ),;
  render: (_, apiKey) => (
    <EditableCell
    onSubmit={(expiresAt) => {
      if (expiresAt === apiKey.expiresAt) {
        return;
      }

      updateMutation.mutate({
        id: apiKey.id!,
        params: { expiresAt: expiresAt ? new Date(expiresAt as string) : null },
      });
    }}
    placeholder={t('apikey.display.neverExpires')}
    type='date'
    value={apiKey.expiresAt?.toLocaleString() || t('apikey.display.neverExpires')}
    />
  ),;
  render: (_: any, apiKey: ApiKeyItem) => (
    <Popconfirm
    cancelText={t('apikey.list.actions.deleteConfirm.actions.cancel')}
    description={t('apikey.list.actions.deleteConfirm.content')}
    okText={t('apikey.list.actions.deleteConfirm.actions.ok')}
    onConfirm={() => deleteMutation.mutate(apiKey.id!)}
    title={t('apikey.list.actions.deleteConfirm.title')}
    >
    <Button
    icon={Trash}
    size='small'
    style={{ verticalAlign: 'middle' }}
    title={t('apikey.list.actions.delete')}
    type='text'
    />
    </Popconfirm>
  ),;
  renderText: (_, apikey: apikeyitem) =>
    apikey.lastusedat?.tolocalestring() || t('apikey.display.neverUsed'),;
  title: t('apikey.list.columns.name'), }, {;
  title: t('apikey.list.columns.key'),;
  title: t('apikey.list.columns.status'),;
  title: t('apikey.list.columns.expiresAt'),;
  title: t('apikey.list.columns.lastUsedAt'), }, {;
  title: t('apikey.list.columns.actions'),

  return (
    <div className={styles.container}>
      <ProTable
        actionRef={actionRef}
        className={styles.table}
        columns={columns}
        headerTitle={t('apikey.list.title')}
        options={false}
        pagination={false}
        request={async () => {
          const apiKeys = await lambdaClient.apiKey.getApiKeys.query()

          return {
            data: apiKeys,
            success: true,
          }
        }}
        rowKey="id"
        search={false}
        toolbar={{
          actions: [
            <Button key="create" onClick={handleCreate} type="primary">
              {t('apikey.list.actions.create')}
            </Button>,
          ],
        }}
      />
      <ApiKeyModal
        onCancel={() => setModalOpen(false)}
        onOk={handleModalOk}
        open={modalOpen}
        submitLoading={createMutation.isPending}
      />
    </div>
  )
}

export default Client
