'use client'

import { Button, Icon }
import { Dropdown }
import { createStyles }
import { ChevronDownIcon, SquareArrowOutUpRight }
import Link from 'next/link'
import { useRouter }
import { memo }
import { useTranslation }

import { isDeprecatedEdition }

import { useDetailContext } from '../../DetailProvider'

const useStyles = createStyles(({ css }) => ({
  button: css`
    button {
      width: 100%
    }
  `,
}))

const ProviderConfig = memo(() => {
  const { styles } = useStyles()
  const { t } = useTranslation('discover')
  const { url, modelsUrl, identifier } = useDetailContext()
  const router = useRouter()
  const openSettings = () => {
    router.push(isDeprecatedEdition ? '/settings/llm' : `/settings/provider/${identifier}`)
  }

  const icon = <Icon icon={SquareArrowOutUpRight} size={16} />

  const items = [
    url && {
      icon,
      key: 'officialSite',
      label: (
        <Link href={url} target={'_blank'}>
          {t('providers.officialSite')}
        </Link>
      ),
    },
    modelsUrl && {
      icon,
      key: 'modelSite',
      label: (
        <Link href={modelsUrl} target={'_blank'}>
          {t('providers.modelSite')}
        </Link>
      ),
    },
  ].filter(Boolean) as any

  if (!items || items?.length === 0)
    return (
      <Button block size={'large'} style={{ flex: 1 }} type={'primary'}>
        {t('providers.config')}
      </Button>
    )

  return (
    <Dropdown.Button
      className={styles.button}
      icon={<Icon icon={ChevronDownIcon} />}
      menu={{ items }}
      onClick={openSettings}
      overlayStyle={{ minWidth: 267 }}
      size={'large'}
      style={{ flex: 1, width: 'unset' }}
      type={'primary'}
    >
      {t('providers.config')}
    </Dropdown.Button>
  )
})

export default ProviderConfig
