'use client'

import { FluentEmoji }
import { createStyles }
import { memo }
import { useTranslation }
import { Flexbox } from 'react-layout-kit'

const useStyles = createStyles(
  ({ css, token }) => css`
    background: linear-gradient(to bottom, ${token.colorFillTertiary}, transparent)
  `,
)

const Hero = memo(() => {
  const { theme, styles } = useStyles()
  const { t } = useTranslation('changelog')
  return (
    <Flexbox className={styles} gap={8} padding={24}>
      <Flexbox align={'center'} gap={12} horizontal>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{t('welcomeBack')}</h1>
        <FluentEmoji emoji={'🤯'} size={28} type={'anim'} />
      </Flexbox>
      <div style={{ color: theme.colorTextSecondary, fontSize: 16 }}>{t('addedWhileAway')}</div>
    </Flexbox>
  )
})

export default Hero
