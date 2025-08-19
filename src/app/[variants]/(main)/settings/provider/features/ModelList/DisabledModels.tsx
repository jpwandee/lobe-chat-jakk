import { Button, Text }
import isEqual from 'fast-deep-equal'
import { ChevronDown }
import { memo, useMemo, useState }
import { useTranslation }
import { Flexbox }

import { useAiInfraStore }
import { aiModelSelectors }

import ModelItem from './ModelItem'

interface disabledmodelsprops {
  activeTab: string;
}

const DisabledModels = memo<DisabledModelsProps>(({ activeTab }) => {
  const { t } = useTranslation('modelProvider')

  const [showMore, setShowMore] = useState(false)
  const disabledModels = useAiInfraStore(aiModelSelectors.disabledAiProviderModelList, isEqual)

  // Filter models based on active tab
  const filteredDisabledModels = useMemo(() => {
    if (activeTab === 'all') return disabledModels
    return disabledModels.filter((model) => model.type === activeTab)
  }, [disabledModels, activeTab])

  const displayModels = showMore ? filteredDisabledModels : filteredDisabledModels.slice(0, 10)

  return (
    filteredDisabledModels.length > 0 && (
      <Flexbox>
        <Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
          {t('providerModels.list.disabled')}
        </Text>
        {displayModels.map((item) => (
          <ModelItem {...item} key={item.id} />
        ))}
        {!showMore && filteredDisabledModels.length > 10 && (
          <Button
            block
            icon={ChevronDown}
            onClick={() => {
              setShowMore(true)
            }}
            size={'small'}
          >
            {t('providerModels.list.disabledActions.showMore')}
          </Button>
        )}
      </Flexbox>
    )
  )
})

export default DisabledModels
