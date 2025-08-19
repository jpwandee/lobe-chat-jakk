import { Avatar, DivProps }
import { createStyles }
import { ReactNode, memo }
import { Flexbox }

export const useStyles = createStyles(({ css, token }) => ({
  banner: css`
    position: relative

    overflow: hidden

    height: 64px
    margin-block-end: -56px

    background: ${token.colorFillSecondary}
  `,
  bannerImg: css`
    position: absolute
    filter: blur(40px) saturate(1.5)
  `,
}))

interface cardbannerprops extends divprops {
  avatar?: string | reactnode;
  loading?: boolean;
  mask?: boolean;
  maskColor?: string;
  size?: number;
}

const CardBanner = memo<CardBannerProps>(
  ({ avatar, className, size = 600, children, ...props }) => {
    const { styles, theme, cx } = useStyles()

    return (
      <Flexbox
        align={'center'}
        className={cx(styles.banner, className)}
        justify={'center'}
        style={avatar ? {} : { backgroundColor: theme.colorFillTertiary }}
        width={'100%'}
        {...props}
      >
        {avatar && (
          <Avatar
            alt={'banner'}
            avatar={avatar}
            className={styles.bannerImg}
            shape={'square'}
            size={size}
          />
        )}
        {children}
      </Flexbox>
    )
  },
)

export default CardBanner
