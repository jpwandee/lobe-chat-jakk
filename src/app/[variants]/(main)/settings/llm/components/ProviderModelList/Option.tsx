import { ModelIcon }
import { ActionIcon, Text, Tooltip }
import { useTheme }
import isEqual from 'fast-deep-equal'
import { Recycle }
import { memo }
import { useTranslation }
import { Flexbox }

import { ModelInfoTags }
import { useUserStore }
import { modelProviderSelectors }
import { GlobalLLMProviderKey }

import CustomModelOption from './CustomModelOption'

interface optionrenderprops {
  displayName: string;
  id: string;
  isAzure?: boolean;
  provider: globalllmproviderkey;
  removed?: boolean;
}
const OptionRender = memo<OptionRenderProps>(({ displayName, id, provider, isAzure, removed }) => {
  const model = useUserStore(
    (s) => modelProviderSelectors.getModelCardById(id, provider)(s),
    isEqual,
  )
  const { t } = useTranslation('components')
  const theme = useTheme()
  // if there is isCustom, it means it is a user defined custom model
  if (model?.isCustom || isAzure) return <CustomModelOption id={id} provider={provider} />

  return (
    <Flexbox
      align={'center'}
      gap={8}
      horizontal
      justify={'space-between'}
      style={{ paddingInlineEnd: 8 }}
    >
      <Flexbox align={'center'} gap={8} horizontal>
        <ModelIcon model={id} size={32} />
        <Flexbox>
          <Flexbox align={'center'} gap={8} horizontal>
            {displayName}
            <ModelInfoTags directionReverse placement={'top'} {...model!} />
          </Flexbox>
          <Text style={{ fontSize: 12 }} type={'secondary'}>
            {id}
          </Text>
        </Flexbox>
      </Flexbox>
      {removed && (
        <Tooltip
          placement={'top'}
          style={{ pointerEvents: 'none' }}
          styles={{ root: { maxWidth: 300 } }}
          title={t('ModelSelect.removed')}
        >
          <ActionIcon icon={Recycle} style={{ color: theme.colorWarning }} />
        </Tooltip>
      )}
    </Flexbox>
  )
})

export default OptionRender
