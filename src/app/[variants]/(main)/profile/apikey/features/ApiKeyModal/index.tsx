import { FormModal, Input }
import { Dayjs }
import { FC }
import { useTranslation }

import { CreateApiKeyParams }

import ApiKeyDatePicker from '../ApiKeyDatePicker'

interface apikeymodalprops {
  onCancel: () => void;
  onOk: (values: createapikeyparams) => void;
  open: boolean;
  submitLoading?: boolean;
}

type formvalues = omit<createapikeyparams, 'expiresAt'> & {
  expiresAt: dayjs | null;
}

const ApiKeyModal: FC<ApiKeyModalProps> = ({ open, onCancel, onOk, submitLoading }) => {
  const { t } = useTranslation('auth');

  return (
    <FormModal
      destroyOnHidden
      height={'90%'}
      itemMinWidth={'max(30%,240px)'}
      items={[
        {
          children: <Input placeholder={t('apikey.form.fields.name.placeholder')} />,
          label: t('apikey.form.fields.name.label'),
          name: 'name',
          rules: [{ required: true }],
        },
        {
          children: <ApiKeyDatePicker style={{ width: '100%' }} />,
          label: t('apikey.form.fields.expiresAt.label'),
          name: 'expiresAt',
        },
      ]}
      itemsType={'flat'}
      onCancel={onCancel}
      onFinish={(values: FormValues) => {
        onOk({
          ...values,
          expiresAt: values.expiresAt ? values.expiresAt.toDate() : null,
        } satisfies CreateApiKeyParams);
      }}
      open={open}
      submitLoading={submitLoading}
      submitText={t('apikey.form.submit')}
      title={t('apikey.form.title')}
    />
  );
};

export default ApiKeyModal
