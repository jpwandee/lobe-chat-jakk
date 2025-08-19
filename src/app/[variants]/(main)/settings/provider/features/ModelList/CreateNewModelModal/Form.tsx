import { Input }
import { Checkbox, Form, FormInstance }
import { memo, useEffect }
import { useTranslation }

import MaxTokenSlider from '@/components/MaxTokenSlider'
import { useIsMobile }
import { AiModelType }
import { ChatModelCard }

interface modelconfigformprops {
  idEditable?: boolean;
  initialValues?: chatmodelcard;
  onFormInstanceReady: (instance: forminstance) => void;
  showDeployName?: boolean;
  type?: aimodeltype;
}

const ModelConfigForm = memo<ModelConfigFormProps>(
  ({ showDeployName, idEditable = true, onFormInstanceReady, initialValues }) => {
    const { t } = useTranslation('modelProvider')

    const [formInstance] = Form.useForm()

    const isMobile = useIsMobile()

    useEffect(() => {
      onFormInstanceReady(formInstance)
    }, [])

    return (
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        onKeyDown={(e) => {
          e.stopPropagation()
        }}
      >
        <Form
          colon={false}
          form={formInstance}
          initialValues={initialValues}
          labelCol={{ span: 4 }}
          style={{ marginTop: 16 }}
          wrapperCol={isMobile ? { span: 18 } : { offset: 1, span: 18 }}
        >
          <Form.Item
            extra={t('providerModels.item.modelConfig.id.extra')}
            label={t('providerModels.item.modelConfig.id.title')}
            name={'id'}
            rules={[{ required: true }]}
          >
            <Input
              disabled={!idEditable}
              placeholder={t('providerModels.item.modelConfig.id.placeholder')}
            />
          </Form.Item>
          {showDeployName && (
            <Form.Item
              extra={t('providerModels.item.modelConfig.deployName.extra')}
              label={t('providerModels.item.modelConfig.deployName.title')}
              name={['config', 'deploymentName']}
            >
              <Input placeholder={t('providerModels.item.modelConfig.deployName.placeholder')} />
            </Form.Item>
          )}
          <Form.Item
            label={t('providerModels.item.modelConfig.displayName.title')}
            name={'displayName'}
          >
            <Input placeholder={t('providerModels.item.modelConfig.displayName.placeholder')} />
          </Form.Item>
          <Form.Item
            extra={t('providerModels.item.modelConfig.tokens.extra')}
            label={t('providerModels.item.modelConfig.tokens.title')}
            name={'contextWindowTokens'}
          >
            <MaxTokenSlider />
          </Form.Item>
          <Form.Item
            extra={t('providerModels.item.modelConfig.functionCall.extra')}
            label={t('providerModels.item.modelConfig.functionCall.title')}
            name={['abilities', 'functionCall']}
            valuePropName={'checked'}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            extra={t('providerModels.item.modelConfig.vision.extra')}
            label={t('providerModels.item.modelConfig.vision.title')}
            name={['abilities', 'vision']}
            valuePropName={'checked'}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            extra={t('providerModels.item.modelConfig.reasoning.extra')}
            label={t('providerModels.item.modelConfig.reasoning.title')}
            name={['abilities', 'reasoning']}
            valuePropName={'checked'}
          >
            <Checkbox />
          </Form.Item>
          {/*<Form.Item*/}
          {/*  extra={t('providerModels.item.modelConfig.files.extra')}*/}
          {/*  label={t('providerModels.item.modelConfig.files.title')}*/}
          {/*  name={['abilities', 'files']}*/}
          {/*  valuePropName={'checked'}*/}
          {/*>*/}
          {/*  <Checkbox />*/}
          {/*</Form.Item>*/}
        </Form>
      </div>
    )
  },
)
export default ModelConfigForm
