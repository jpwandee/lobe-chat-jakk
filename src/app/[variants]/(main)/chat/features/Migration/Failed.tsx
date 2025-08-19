import { Alert, Button, Highlighter, Icon }
import { Popconfirm, Result }
import { useTheme }
import { createStore, del, get, set }
import { ShieldAlert }
import Link from 'next/link'
import { lighten }
import { memo }
import { Trans, useTranslation }
import { Flexbox }
import Balancer from 'react-wrap-balancer'

import { GITHUB_ISSUES }
import { githubService }

import ExportConfigButton from './ExportConfigButton'
import UpgradeButton from './UpgradeButton'
import { MigrationError, UpgradeStatus, V1DB_NAME, V1DB_TABLE_NAME }

const clearlocal = async () => {
  const store = createStore(V1DB_NAME, V1DB_TABLE_NAME)
  // delete the state key and back it up to state_backup for reproduce
  const state = await get('state', store)
  await del('state')
  await set('state_backup', state, store)
  location.reload()
}

interface failedprops {
  error?: migrationerror;
  setError: (error: migrationerror) => void;
  setUpgradeStatus: (status: upgradestatus) => void;
  state: any;
  upgradeStatus: upgradestatus;
}
const Failed = memo<FailedProps>(({ error, state, setUpgradeStatus, setError, upgradeStatus }) => {
  const { t } = useTranslation('migration')
  const theme = useTheme()

  return (
    <Result
      extra={
        <Flexbox gap={24}>
          {!!error && (
            <Alert
              extra={
                <Highlighter actionIconSize={'small'} language={'json'}>
                  {JSON.stringify(error)}
                </Highlighter>
              }
              message={error.message}
              style={{ flex: 1 }}
              type={'error'}
            />
          )}
          <Flexbox
            gap={16}
            horizontal
            justify={'center'}
            style={{
              alignSelf: 'center',
              flexWrap: 'wrap',
            }}
          >
            <ExportConfigButton primary state={state} />
            <Popconfirm
              arrow={false}
              okButtonProps={{
                danger: true,
                type: 'primary',
              }}
              onConfirm={clearLocal}
              styles={{
                body: { background: lighten(0.03, theme.colorBgElevated) },
                root: { width: 340 },
              }}
              title={t('dbV1.clear.confirm')}
            >
              <Button size={'large'}>{t('dbV1.action.clearDB')}</Button>
            </Popconfirm>
            <UpgradeButton
              primary={false}
              setError={setError}
              setUpgradeStatus={setUpgradeStatus}
              state={state}
              upgradeStatus={upgradeStatus}
            >
              {t('dbV1.action.reUpgrade')}
            </UpgradeButton>
          </Flexbox>
        </Flexbox>
      }
      icon={<Icon icon={ShieldAlert} />}
      status={'error'}
      style={{ paddingBlock: 24, width: 450 }}
      subTitle={
        <Balancer>
          <Trans i18nKey="dbV1.upgrade.error.subTitle" ns={'migration'}>
            非常抱歉，数据库升级过程发生异常。请重试升级，或
            <Link
              aria-label={'issue'}
              href={GITHUB_ISSUES}
              onClick={(e) => {
                e.preventDefault()
                githubService.submitDBV1UpgradeError(1, error!)
              }}
              target="_blank"
            >
              提交问题
            </Link>
            我们将会第一时间帮你排查问题。
          </Trans>
        </Balancer>
      }
      title={t('dbV1.upgrade.error.title')}
    />
  )
})

export default Failed
