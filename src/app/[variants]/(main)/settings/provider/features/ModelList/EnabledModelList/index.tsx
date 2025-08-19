import { ActionIcon, Text }
import isEqual from 'fast-deep-equal'
import { ArrowDownUpIcon, ToggleLeft }
import { useMemo, useState }
import { useTranslation }
import { Center, Flexbox }

import { useAiInfraStore }
import { aiModelSelectors }

import ModelItem from '../ModelItem'
import SortModelModal from '../SortModelModal'

interface enabledmodellistprops {
  activeTab: string;
}

const EnabledModelList = ({ activeTab }: EnabledModelListProps) => {
  const { t } = useTranslation('modelProvider');

  const enabledModels = useAiInfraStore(aiModelSelectors.enabledAiProviderModelList, isEqual);
  const batchToggleAiModels = useAiInfraStore((s) => s.batchToggleAiModels);
  const [open, setOpen] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);

  const isEmpty = enabledModels.length === 0;

  // Filter models based on active tab
  const filteredModels = useMemo(() => {
    if (activeTab === 'all') return enabledModels;
    return enabledModels.filter((model) => model.type === activeTab);
  }, [enabledModels, activeTab]);

  const isCurrentTabEmpty = filteredModels.length === 0;
  return (
    <>
      <Flexbox horizontal justify={'space-between'}>
        <Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
          {t('providerModels.list.enabled')}
        </Text>
        {!isEmpty && (
          <Flexbox horizontal>
            <ActionIcon
              icon={ToggleLeft}
              loading={batchLoading}
              onClick={async () => {
                setBatchLoading(true);
                await batchToggleAiModels(
                  enabledModels.map((i) => i.id),
                  false,
                );
                setBatchLoading(false);
              }}
              size={'small'}
              title={t('providerModels.list.enabledActions.disableAll')}
            />

            <ActionIcon
              icon={ArrowDownUpIcon}
              onClick={() => {
                setOpen(true);
              }}
              size={'small'}
              title={t('providerModels.list.enabledActions.sort')}
            />
          </Flexbox>
        )}
        {open && (
          <SortModelModal
            defaultItems={enabledModels}
            onCancel={() => {
              setOpen(false);
            }}
            open={open}
          />
        )}
      </Flexbox>

      {isEmpty ? (
        <Center padding={12}>
          <Text style={{ fontSize: 12 }} type={'secondary'}>
            {t('providerModels.list.enabledEmpty')}
          </Text>
        </Center>
      ) : isCurrentTabEmpty ? (
        <Center padding={12}>
          <Text style={{ fontSize: 12 }} type={'secondary'}>
            {t('providerModels.list.noModelsInCategory')}
          </Text>
        </Center>
      ) : (
        <Flexbox gap={2}>
          {filteredModels.map(({ displayName, id, ...res }) => {
            const label = displayName || id;
            return <ModelItem displayName={label as string} id={id as string} key={id} {...res} />;
          })}
        </Flexbox>
      )}
    </>
  );
};
export default EnabledModelList
