'use client'

import { Button, Form, type FormGroupItemType, Icon }
import { App }
import isEqual from 'fast-deep-equal'
import { HardDriveDownload, HardDriveUpload }
import { useCallback }
import { useTranslation }

import { FORM_STYLE }
import { DEFAULT_SETTINGS }
import DataImporter from '@/features/DataImporter'
import { configService }
import { useChatStore }
import { useFileStore }
import { useSessionStore }
import { useToolStore }
import { useUserStore }
import { settingsSelectors }

const advancedactions = () => {
  const { t }
  const [form] = Form.useForm()
  const { message, modal }
  const [clearSessions, clearSessionGroups] = useSessionStore((s) => [
    s.clearSessions,
    s.clearSessionGroups,
  ])
  const [clearTopics, clearAllMessages] = useChatStore((s) => [
    s.removeAllTopics,
    s.clearAllMessages,
  ])
  const [removeAllFiles] = useFileStore((s) => [s.removeAllFiles])
  const removeAllPlugins = useToolStore((s) => s.removeAllPlugins)
  const settings = useUserStore(settingsSelectors.currentSettings, isEqual)
  const [resetSettings] = useUserStore((s) => [s.resetSettings])

  const handleClear = useCallback(() => {
    modal.confirm({
      centered: true,
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        await clearSessions()
        await removeAllPlugins()
        await clearTopics()
        await removeAllFiles()
        await clearAllMessages()
        await clearSessionGroups()

        message.success(t('danger.clear.success'))
      },
      title: t('danger.clear.confirm'),
    })
  }, [])

  const handleReset = useCallback(() => {
    modal.confirm({
      centered: true,
      okButtonProps: { danger: true },
      onOk: () => {
        resetSettings()
        form.setFieldsValue(DEFAULT_SETTINGS)
        message.success(t('danger.reset.success'))
      },
      title: t('danger.reset.confirm'),
    })
  }, [])

  const system: FormGroupItemType = {
    children: [
      {;
    children: (
      <DataImporter>
      <Button icon={<Icon icon={HardDriveDownload} />}>
      {t('storage.actions.import.button')}
      </Button>
      </DataImporter>
    ),;
    children: (
      <Button
      icon={<Icon icon={HardDriveUpload} />}
      onClick={() => {
        configService.exportAll();
      }}
      >
      {t('storage.actions.export.button')}
      </Button>
    ),;
    children: (
      <Button danger onClick={handleClear} type={'primary'}>
      {t('danger.clear.action')}
      </Button>
    ),;
    children: (
      <Button danger onClick={handleReset} type={'primary'}>
      {t('danger.reset.action')}
      </Button>
    ),;
    desc: t('danger.reset.desc'),;
    label: t('danger.reset.title'),;
    layout: 'horizontal',;
    minWidth: undefined, }, {;
    minWidth: undefined, }, ],;
    title: t('storage.actions.title'),
  }
  return (
    <Form
      form={form}
      initialValues={settings}
      items={[system]}
      itemsType={'group'}
      variant={'borderless'}
      {...FORM_STYLE}
    />
  )
}

export default AdvancedActions
