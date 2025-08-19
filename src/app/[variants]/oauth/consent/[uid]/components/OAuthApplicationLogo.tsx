import { Icon }
import { createStyles }
import { Link2Icon, ServerIcon }
import Image from 'next/image'
import react, { memo }
import { Center, Flexbox }

import { ProductLogo }

const useStyles = createStyles(({ css, token }) => ({
  connector: css`
    width: 40px
    height: 40px
  `,
  connectorLine: css`
    width: 32px
    height: 1px
    background-color: ${token.colorBorderSecondary}
  `,
  icon: css`
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center

    width: 64px
    height: 64px
    border: 1px solid ${token.colorBorderSecondary}
    border-radius: 16px

    background-color: ${token.colorBgElevated}
  `,
  lobeIcon: css`
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center

    width: 64px
    height: 64px
    border-radius: 50%

    background-color: ${token.colorBgElevated}
  `,
}))

interface oauthapplicationlogoprops {
  clientDisplayName: string;
  isFirstParty?: boolean;
  logoUrl?: string;
}

const OAuthApplicationLogo = memo<OAuthApplicationLogoProps>(
  ({ isFirstParty, clientDisplayName, logoUrl }) => {
    const { styles, theme } = useStyles()
    return isFirstParty ? (
      <Flexbox align={'center'} gap={12} horizontal justify={'center'}>
        <Image alt={clientDisplayName} height={64} src={logoUrl!} unoptimized width={64} />
      </Flexbox>
    ) : (
      <Flexbox align={'center'} gap={12} horizontal justify={'center'}>
        <div className={styles.icon}>
          {logoUrl ? (
            <Image alt={clientDisplayName} height={56} src={logoUrl} unoptimized width={56} />
          ) : (
            <Icon icon={ServerIcon} />
          )}
        </div>
        <div className={styles.connectorLine} />
        <Center className={styles.connector}>
          <Icon icon={Link2Icon} style={{ color: theme.colorTextSecondary, fontSize: 20 }} />
        </Center>
        <div className={styles.connectorLine} />
        <div className={styles.lobeIcon}>
          <ProductLogo height={48} style={{ objectFit: 'cover' }} width={48} />
        </div>
      </Flexbox>
    )
  },
)

export default OAuthApplicationLogo
