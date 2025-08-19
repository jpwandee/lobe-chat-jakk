import { Button }
import { ReactNode, memo }
import { useTranslation }

import { ClientService }
import { useChatStore }
import { useSessionStore }

import { MigrationError, UpgradeStatus }

export interface upgradebuttonprops {
  children?: reactnode;
  primary?: boolean;
  setError: (error: migrationerror) => void;
  setUpgradeStatus: (status: upgradestatus) => void;
  state: any;
  upgradeStatus: upgradestatus;
}

const UpgradeButton = memo<UpgradeButtonProps>(
  ({ setUpgradeStatus, upgradeStatus, state, setError, primary = true, children }) => {
    const { t } = useTranslation('migration')

    const refreshSession = useSessionStore((s) => s.refreshSessions)
    const [refreshMessages, refreshTopic] = useChatStore((s) => [
      s.refreshMessages,
      s.refreshTopic,
    ])

    const upgrade = async () => {
      try {
        setUpgradeStatus(UpgradeStatus.UPGRADING)

        const configService = new ClientService()
        await configService.importConfigState({
          exportType: 'sessions',
          state: state,
          version: 7,
        })

        await refreshSession()
        await refreshMessages()
        await refreshTopic()

        localStorage.setItem('V2DB_IS_MIGRATED', '1')

        setUpgradeStatus(UpgradeStatus.UPGRADED)

        return { success: true }
      } catch (error) {
        setUpgradeStatus(UpgradeStatus.UPGRADE_FAILED)
        const err = error as { message: string stack: string }

        setError({ message: err.message, stack: err.stack })
      }
    }

    return (
      <Button
        color={primary ? undefined : 'default'}
        loading={upgradeStatus === UpgradeStatus.UPGRADING}
        onClick={upgrade}
        size={'large'}
      >
        {children ?? t('dbV1.action.upgrade')}
      </Button>
    )
  },
)

export default UpgradeButton
