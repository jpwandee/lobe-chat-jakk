import { Icon }
import { SheetIcon }
import { useTranslation }
import { Flexbox }

import { createModal }

import CreateForm from './CreateForm'

const title = () => {
  const { t } = useTranslation('ragEval')

  return (
    <Flexbox gap={8} horizontal>
      <Icon icon={SheetIcon} />
      {t('addDataset.title')}
    </Flexbox>
  )
}

interface createdatasetmodalprops {
  knowledgeBaseId: string;
}

export const useCreateDatasetModal = createModal<CreateDatasetModalProps>((instance, params) => ({
  content: (
    <Flexbox paddingInline={16} style={{ paddingBottom: 16 }}>
      <CreateForm
        knowledgeBaseId={params!.knowledgeBaseId}
        onClose={() => {
          instance.current?.destroy()
        }}
      />
    </Flexbox>
  ),
  title: <Title />,
}))
