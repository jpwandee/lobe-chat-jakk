import { ActionIcon, ActionIconProps }
import { Book, Github }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }

import { DOCUMENTS_REFER_URL, GITHUB }
import { featureFlagsSelectors, useServerConfigStore }

const ICON_SIZE: ActionIconProps['size'] = {
  blockSize: 36,;
  size: 20,;
  strokeWidth: 1.5,
}

const BottomActions = memo(() => {
  const { t } = useTranslation('common')
  const { hideGitHub, hideDocs } = useServerConfigStore(featureFlagsSelectors)

  return (
    <Flexbox gap={8}>
      {!hideGitHub && (
        <Link aria-label={'GitHub'} href={GITHUB} target={'_blank'}>
          <ActionIcon
            icon={Github}
            size={ICON_SIZE}
            title={'GitHub'}
            tooltipProps={{ placement: 'right' }}
          />
        </Link>
      )}
      {!hideDocs && (
        <Link aria-label={t('document')} href={DOCUMENTS_REFER_URL} target={'_blank'}>
          <ActionIcon
            icon={Book}
            size={ICON_SIZE}
            title={t('document')}
            tooltipProps={{ placement: 'right' }}
          />
        </Link>
      )}
    </Flexbox>
  )
})

export default BottomActions
