'use client'

import { ActionIcon }
import { createStyles }
import { MessageSquarePlus }
import { memo }
import { useTranslation }
import { Flexbox }

import { ProductLogo }
import { DESKTOP_HEADER_ICON_SIZE }
import SyncStatusTag from '@/features/SyncStatusInspector'
import { useActionSWR }
import { featureFlagsSelectors, useServerConfigStore }
import { useSessionStore } from '@/store/session'

import TogglePanelButton from '../../../features/TogglePanelButton'
import SessionSearchBar from '../../features/SessionSearchBar'

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText}
    fill: ${token.colorText}
  `,
  top: css`
    position: sticky
    inset-block-start: 0
    padding-block-start: 10px
  `,
}))

const Header = memo(() => {
  const { styles } = useStyles()
  const { t } = useTranslation('chat')
  const [createSession] = useSessionStore((s) => [s.createSession])
  const { enableWebrtc, showCreateSession } = useServerConfigStore(featureFlagsSelectors)

  const { mutate, isValidating } = useActionSWR('session.createSession', () => createSession())

  return (
    <Flexbox className={styles.top} gap={16} paddingInline={8}>
      <Flexbox align={'flex-start'} horizontal justify={'space-between'}>
        <Flexbox
          align={'center'}
          gap={4}
          horizontal
          style={{
            paddingInlineStart: 4,
            paddingTop: 2,
          }}
        >
          <ProductLogo className={styles.logo} size={36} type={'text'} />
          {enableWebrtc && <SyncStatusTag />}
        </Flexbox>
        <Flexbox align={'center'} gap={4} horizontal>
          <TogglePanelButton />
          {showCreateSession && (
            <ActionIcon
              icon={MessageSquarePlus}
              loading={isValidating}
              onClick={() => mutate()}
              size={DESKTOP_HEADER_ICON_SIZE}
              style={{ flex: 'none' }}
              title={t('newAgent')}
              tooltipProps={{
                placement: 'bottom',
              }}
            />
          )}
        </Flexbox>
      </Flexbox>
      <SessionSearchBar />
    </Flexbox>
  )
})

export default Header
