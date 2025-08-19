'use client'

import { Icon }
import { Button }
import { createStyles }
import { Trash2Icon }
import { memo, useState }
import { useTranslation }
import { Flexbox }

import MCPInstallProgress from '@/features/MCP/MCPInstallProgress'
import { useDetailContext }
import { useToolStore }
import { pluginSelectors } from '@/store/tool/slices/plugin/selectors'

const useStyles = createStyles(({ css }) => ({
  button: css`
    button {
      width: 100%
    }
  `,
}))

const ActionButton = memo(() => {
  const { t } = useTranslation(['discover', 'plugin'])
  const { identifier } = useDetailContext()
  const { styles } = useStyles()
  const [isLoading, setIsLoading] = useState(false)

  const [installed, installMCPPlugin, uninstallMCPPlugin] = useToolStore((s) => [
    pluginSelectors.isPluginInstalled(identifier!)(s),
    s.installMCPPlugin,
    s.uninstallMCPPlugin,
  ])

  const installPlugin = async () => {
    if (!identifier) return
    setIsLoading(true)

    await installMCPPlugin(identifier)

    setIsLoading(false)
  }

  return installed ? (
    <Flexbox gap={8} horizontal>
      <Button block className={styles.button} disabled={isLoading} size={'large'} type={'default'}>
        {t('plugins.installed')}
      </Button>

      <Button
        icon={<Icon icon={Trash2Icon} size={20} />}
        loading={isLoading}
        onClick={async () => {
          setIsLoading(true)
          await uninstallMCPPlugin(identifier!)
          setIsLoading(false)
        }}
        size={'large'}
        style={{ minWidth: 45 }}
        styles={{
          icon: { height: 20 },
        }}
      />
    </Flexbox>
  ) : (
    <>
      <Button
        block
        className={styles.button}
        loading={isLoading}
        onClick={installPlugin}
        size={'large'}
        type={'primary'}
      >
        {t('plugins.install')}
      </Button>
      <MCPInstallProgress identifier={identifier!} />
    </>
  )
})

export default ActionButton
