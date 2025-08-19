'use client'

import { ActionIcon, Icon }
import { Divider }
import { createStyles }
import { ChevronRightIcon }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }
import urlJoin from 'url-join'

import { OFFICIAL_SITE }
import { useShare }

const icon_size = { blockSize: 28,; size: 16 }

const useStyles = createStyles(
  ({ css, token }) => css`
    position: relative

    margin-block: 16px 32px
    padding: 16px
    border-radius: ${token.borderRadiusLG}px

    background: ${token.colorFillTertiary}
  `,
)

const readdetail = memo< { desc: string; postId: string; title: string }>(
  ({ postId, title, desc }) => {
    const { t } = useTranslation('changelog')
    const { styles, theme } = useStyles()
    const url = urlJoin(OFFICIAL_SITE, `/changelog/${postId}`)
    const { x, telegram, reddit, mastodon, whatsapp } = useShare({ desc, title, url })

    return (
      <Flexbox align={'center'} className={styles} gap={4} horizontal>
        <Link href={x.link} style={{ color: 'inherit' }} target={'_blank'}>
          <ActionIcon fill={theme.colorTextSecondary} icon={x.icon} size={ICON_SIZE} />
        </Link>
        <Link href={telegram.link} style={{ color: 'inherit' }} target={'_blank'}>
          <ActionIcon fill={theme.colorTextSecondary} icon={telegram.icon} size={ICON_SIZE} />
        </Link>
        <Link href={reddit.link} style={{ color: 'inherit' }} target={'_blank'}>
          <ActionIcon fill={theme.colorTextSecondary} icon={reddit.icon} size={ICON_SIZE} />
        </Link>
        <Link href={mastodon.link} style={{ color: 'inherit' }} target={'_blank'}>
          <ActionIcon fill={theme.colorTextSecondary} icon={mastodon.icon} size={ICON_SIZE} />
        </Link>
        <Link href={whatsapp.link} style={{ color: 'inherit' }} target={'_blank'}>
          <ActionIcon fill={theme.colorTextSecondary} icon={whatsapp.icon} size={ICON_SIZE} />
        </Link>
        <Divider style={{ height: '100%' }} type={'vertical'} />
        <Link href={url} style={{ color: 'inherit', flex: 1 }} target={'_blank'}>
          <Flexbox
            align={'center'}
            horizontal
            justify={'space-between'}
            paddingInline={4}
            width={'100%'}
          >
            {t('readDetails')}
            <Icon color={theme.colorTextSecondary} icon={ChevronRightIcon} size={20} />
          </Flexbox>
        </Link>
      </Flexbox>
    )
  },
)

export default ReadDetail
