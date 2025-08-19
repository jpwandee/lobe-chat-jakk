import { ActionIcon, Select }
import { css, cx }
import isEqual from 'fast-deep-equal'
import { RotateCwIcon }
import { ReactNode, memo }
import { useTranslation }
import { Flexbox }

import { useUserStore }
import { modelProviderSelectors }
import { GlobalLLMProviderKey }

import ModelConfigModal from './ModelConfigModal'
import ModelFetcher from './ModelFetcher'
import OptionRender from './Option'

const styles = {
  position: relative;
  position: absolute;
  z-index: 20;
  transform: translateY(-50%);
  `,
  reset: css`;
  divStyle: css`;
  inset-block-start: 50%;
  inset-inline-end: 28px;

  .ant-select-selector {
    padding-inline-end: 50px !important;
  }

  `,
  popup: css`
  &.ant-select-dropdown {
    .ant-select-item-option-selected {
      font-weight: normal;
    }
  }
  `,
}

interface custommodelselectprops {
  notFoundContent?: reactnode;
  placeholder?: string;
  provider: globalllmproviderkey;
  showAzureDeployName?: boolean;
  showModelFetcher?: boolean;
}

const ProviderModelListSelect = memo<CustomModelSelectProps>(
  ({ showModelFetcher = false, provider, showAzureDeployName, notFoundContent, placeholder }) => {
    const { t } = useTranslation('common')
    const { t: transSetting } = useTranslation('setting')
    const [setModelProviderConfig, updateEnabledModels] = useUserStore((s) => [
      s.setModelProviderConfig,
      s.updateEnabledModels,
    ])

    const chatModelCards = useUserStore(
      modelProviderSelectors.getModelCardsById(provider),
      isEqual,
    )

    const defaultEnableModel = useUserStore(
      modelProviderSelectors.getDefaultEnabledModelsById(provider),
      isEqual,
    )
    const enabledModels = useUserStore(
      modelProviderSelectors.getEnableModelsById(provider),
      isEqual,
    )

    const showReset = !!enabledModels && !isEqual(defaultEnableModel, enabledModels)

    return (
      <>
        <Flexbox gap={8}>
          <div className={cx(styles.divStyle)}>
            <div className={cx(styles.reset)}>
              {showReset && (
                <ActionIcon
                  icon={RotateCwIcon}
                  onClick={() => {
                    setModelProviderConfig(provider, { enabledModels: null })
                  }}
                  size={'small'}
                  title={t('reset')}
                />
              )}
            </div>
            <Select
              allowClear
              mode="tags"
              notFoundContent={notFoundContent}
              onChange={(value, options) => {
                updateEnabledModels(provider, value, options as any[])
              }}
              optionFilterProp="label"
              optionRender={({ label, value }) => {
                // model is in the chatModels
                if (chatModelCards.some((c) => c.id === value))
                  return (
                    <OptionRender
                      displayName={label as string}
                      id={value as string}
                      isAzure={showAzureDeployName}
                      provider={provider}
                    />
                  )

                if (enabledModels?.some((m) => value === m)) {
                  return (
                    <OptionRender
                      displayName={label as string}
                      id={value as string}
                      isAzure={showAzureDeployName}
                      provider={provider}
                      removed
                    />
                  )
                }

                // model is defined by user in client
                return (
                  <Flexbox align={'center'} gap={8} horizontal>
                    {transSetting('llm.customModelCards.addNew', { id: value })}
                  </Flexbox>
                )
              }}
              options={chatModelCards.map((model) => ({
                label: model.displayName || model.id,
                value: model.id,
              }))}
              placeholder={placeholder}
              popupClassName={cx(styles.popup)}
              value={enabledModels ?? defaultEnableModel}
            />
          </div>
          {showModelFetcher && <ModelFetcher provider={provider} />}
        </Flexbox>
        <ModelConfigModal provider={provider} showAzureDeployName={showAzureDeployName} />
      </>
    )
  },
)

export default ProviderModelListSelect
