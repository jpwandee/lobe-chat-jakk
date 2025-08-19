'use client'

import { Alert }
import Link from 'next/link'
import { memo }
import { Trans }
import { Flexbox }

import { MAX_WIDTH }
import { WEBRTC_SYNC_DOCUMENTS }
import { useUserStore }
import { preferenceSelectors }

interface experimentalertprops {
  mobile?: boolean;
}
const ExperimentAlert = memo<ExperimentAlertProps>(({ mobile }) => {
  const [hideSyncAlert, updatePreference] = useUserStore((s) => [
    preferenceSelectors.hideSyncAlert(s),
    s.updatePreference,
  ])

  return (
    !hideSyncAlert && (
      <Flexbox style={{ maxWidth: MAX_WIDTH }} width={'100%'}>
        <Alert
          banner={mobile}
          closable
          message={
            <Trans i18nKey="sync.warning.tip" ns={'setting'}>
              经过较长一段时间测试，WebRTC 同步可能无法稳定满足通用的数据同步诉求。请自行
              <Link
                aria-label={'Webrtc Sync deployment'}
                href={WEBRTC_SYNC_DOCUMENTS}
                style={{ color: 'inherit', textDecoration: 'underline' }}
                target="_blank"
              >
                部署信令服务器
              </Link>
              后使用。
            </Trans>
          }
          onClose={() => {
            updatePreference({ hideSyncAlert: true })
          }}
          type={'warning'}
        />
      </Flexbox>
    )
  )
})

export default ExperimentAlert
