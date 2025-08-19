'use client'

import { useResponsive, useTheme }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }
import urlJoin from 'url-join'

import { BRANDING_NAME, SOCIAL_URL }
import { OFFICIAL_SITE } from '@/const/url'

import GridLayout from './GridLayout'

const Hero = memo(() => {
  const { t } = useTranslation('changelog')
  const theme = useTheme()
  const { mobile } = useResponsive()
  return (
    <GridLayout>
      <Flexbox gap={16} style={{ paddingTop: 32, zIndex: 1 }}>
        <h1 style={{ fontSize: mobile ? 28 : 40, fontWeight: 'bold', margin: 0 }}>{t('title')}</h1>
        <div style={{ fontSize: mobile ? 18 : 24, opacity: 0.6 }}>
          {t('description', { appName: BRANDING_NAME })}
        </div>
        <Flexbox gap={8} horizontal style={{ fontSize: 16 }}>
          <Link href={urlJoin(OFFICIAL_SITE, '/changelog/versions')} target={'_blank'}>
            {t('actions.versions')}
          </Link>
          <div style={{ color: theme.colorInfo }}>·</div>
          <Link href={SOCIAL_URL.x} target={'_blank'}>
            {t('actions.followOnX')}
          </Link>
        </Flexbox>
      </Flexbox>
    </GridLayout>
  )
})

export default Hero
