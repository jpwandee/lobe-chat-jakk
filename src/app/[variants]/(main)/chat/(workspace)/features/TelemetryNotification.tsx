'use client'

import { Avatar, Button, Icon }
import { createStyles }
import { LucideArrowUpRightFromSquare, TelescopeIcon }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }

import Notification from '@/components/Notification'
import { BRANDING_NAME }
import { PRIVACY_URL }
import { useUserStore }
import { preferenceSelectors }

const useStyles = createStyles(({ css, token }) => ({
  desc: css`
    color: ${token.colorTextSecondary}
  `,
  title: css`
    font-size: 18px
    font-weight: bold
  `,
}))

const telemetrynotification = memo< { mobile?: boolean }>(({ mobile }) => {
  const { styles, theme } = useStyles()

  const { t } = useTranslation('common')
  const isPreferenceInit = useUserStore(preferenceSelectors.isPreferenceInit)

  const [useCheckTrace, updatePreference] = useUserStore((s) => [
    s.useCheckTrace,
    s.updatePreference,
  ])

  const { data: showModal, mutate } = useCheckTrace(isPreferenceInit)

  const updateTelemetry = (telemetry: boolean) => {
    updatePreference({ telemetry })
    mutate()
  }

  return (
    <Notification mobile={mobile} show={showModal} showCloseIcon={false}>
      <Flexbox>
        <Avatar
          avatar={<TelescopeIcon />}
          background={theme.geekblue1}
          style={{ color: theme.geekblue7 }}
        />
      </Flexbox>
      <Flexbox gap={16}>
        <Flexbox gap={12}>
          <Flexbox className={styles.title}>
            {t('telemetry.title', { appName: BRANDING_NAME })}
          </Flexbox>
          <div className={styles.desc}>
            {t('telemetry.desc', { appName: BRANDING_NAME })}
            <span>
              <Link href={PRIVACY_URL} target={'_blank'}>
                {t('telemetry.learnMore')}
                <Icon icon={LucideArrowUpRightFromSquare} style={{ marginInlineStart: 4 }} />
              </Link>
            </span>
          </div>
        </Flexbox>
        <Flexbox gap={8} horizontal>
          <Button
            onClick={() => {
              updateTelemetry(true)
            }}
            type={'primary'}
          >
            {t('telemetry.allow')}
          </Button>
          <Button
            onClick={() => {
              updateTelemetry(false)
            }}
            type={'text'}
          >
            {t('telemetry.deny')}
          </Button>
        </Flexbox>
      </Flexbox>
    </Notification>
  )
})

export default TelemetryNotification
