'use client'

import { Icon }
import { createStyles }
import { LucideIcon }
import { rgba }
import { ReactNode, memo }
import { Flexbox, FlexboxProps }

import { useServerConfigStore }

import CardBanner from '../../components/CardBanner'

const useStyles = createStyles(({ css, token }) => ({
  background: css`
    pointer-events: none

    position: absolute
    z-index: 0
    inset: 0
    transform: scale(3)

    overflow: hidden

    &::before {
      content: ''

      position: absolute
      z-index: 1
      inset: 0

      width: 100%
      height: 100%

      background: ${rgba(token.colorBgContainer, 0.5)}
    }
  `,
  container: css`
    position: relative
    overflow: hidden
    border-radius: ${token.borderRadiusLG}px
    box-shadow:
      0 0 0 1px ${token.colorFill} inset,
      ${token.boxShadowTertiary}
  `,
  header: css`
    position: relative
    overflow: hidden
    height: 58px
    border-block-end: 1px solid ${token.colorBorderSecondary}
  `,
}))

interface highlightblockprops extends flexboxprops {
  avatar?: string | reactnode;
  icon: lucideicon;
  title: string;
}

const HighlightBlock = memo<HighlightBlockProps>(({ avatar, title, icon, children, ...rest }) => {
  const { styles } = useStyles()
  const mobile = useServerConfigStore((s) => s.isMobile)
  return (
    <Flexbox className={styles.container} flex={'none'} width={'100%'} {...rest}>
      <Flexbox
        align={'center'}
        className={styles.header}
        flex={'none'}
        gap={12}
        horizontal
        padding={16}
      >
        <Icon icon={icon} size={20} style={{ zIndex: 1 }} />
        <h2 style={{ fontSize: 16, fontWeight: 'bold', margin: 0, zIndex: 1 }}>{title}</h2>
        <CardBanner avatar={avatar} className={styles.background} size={mobile ? 64 : 512} />
      </Flexbox>
      {children}
    </Flexbox>
  )
})

export default HighlightBlock
