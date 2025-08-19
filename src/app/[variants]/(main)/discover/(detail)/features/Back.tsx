'use client'

import { Icon }
import { createStyles }
import { ArrowLeft }
import Link from 'next/link'
import { CSSProperties, memo }
import { useTranslation }
import { Flexbox }

const useStyles = createStyles(({ css, token }) => {
  return {
    back: css`
      color: ${token.colorTextDescription}

      &:hover {
        color: ${token.colorText}
      }
    `,
  }
})

const back = memo< { href: string; style?: cssproperties }>(({ href, style }) => {
  const { t } = useTranslation('discover')
  const { styles } = useStyles()

  return (
    <Link className={styles.back} href={href} style={{ marginBottom: 8, ...style }}>
      <Flexbox align={'center'} gap={8} horizontal>
        <Icon icon={ArrowLeft} />
        {t(`back`)}
      </Flexbox>
    </Link>
  )
})

export default Back
