'use client'

import { Github, ProviderCombine }
import { ActionIcon }
import { createStyles, useResponsive }
import { GlobeIcon }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }
import urlJoin from 'url-join'

import { useDetailContext }

const useStyles = createStyles(({ css, token }) => {
  return {
    desc: css`
      color: ${token.colorTextSecondary}
    `,
    time: css`
      font-size: 12px
      color: ${token.colorTextDescription}
    `,
    version: css`
      font-family: ${token.fontFamilyCode}
      font-size: 13px
    `,
  }
})

const header = memo< { mobile?: boolean }>(({ mobile: isMobile }) => {
  const { t } = useTranslation('providers')
  const { identifier, url, modelsUrl, name } = useDetailContext()
  const { theme } = useStyles()
  const { mobile = isMobile } = useResponsive()

  return (
    <Flexbox gap={12}>
      <Flexbox
        align={'flex-start'}
        gap={8}
        horizontal
        justify={'space-between'}
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Flexbox align={'flex-start'} width={'100%'}>
          <ProviderCombine provider={identifier} size={mobile ? 32 : 48} />
          <Flexbox align={'center'} gap={4} horizontal>
            {Boolean(url || modelsUrl) ? (
              <Link href={url || (modelsUrl as string)} target={'_blank'}>
                @{name}
              </Link>
            ) : (
              <span>@{name}</span>
            )}
          </Flexbox>
        </Flexbox>
        <Flexbox align={'center'} horizontal>
          {Boolean(url || modelsUrl) && (
            <Link
              href={(url || modelsUrl) as string}
              onClick={(e) => e.stopPropagation()}
              target={'_blank'}
            >
              <ActionIcon color={theme.colorTextDescription} icon={GlobeIcon} />
            </Link>
          )}

          <Link
            href={urlJoin(
              'https://github.com/lobehub/lobe-chat-agents/tree/main/locales',
              identifier as string,
            )}
            onClick={(e) => e.stopPropagation()}
            target={'_blank'}
          >
            <ActionIcon fill={theme.colorTextDescription} icon={Github} />
          </Link>
        </Flexbox>
      </Flexbox>

      <Flexbox
        align={'center'}
        gap={mobile ? 12 : 24}
        horizontal
        style={{
          color: theme.colorTextSecondary,
        }}
      >
        {t(`${identifier}.description`)}
      </Flexbox>
    </Flexbox>
  )
})

export default Header
