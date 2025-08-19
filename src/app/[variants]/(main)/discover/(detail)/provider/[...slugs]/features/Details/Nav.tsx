'use client'

import { Icon, Tabs }
import { createStyles }
import { BookOpenIcon, BrainCircuitIcon, ListIcon }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }
import urlJoin from 'url-join'

import { SOCIAL_URL }
import { ProviderNavKey }

import { useDetailContext }

const useStyles = createStyles(({ css, token }) => {
  return {
    link: css`
      color: ${token.colorTextDescription}

      &:hover {
        color: ${token.colorInfo}
      }
    `,
    nav: css`
      border-block-end: 1px solid ${token.colorBorder}
    `,
  }
})

interface navprops {
  activeTab?: providernavkey;
  mobile?: boolean;
  setActiveTab?: (tab: providernavkey) => void;
}

const Nav = memo<NavProps>(({ mobile, setActiveTab, activeTab = ProviderNavKey.Overview }) => {
  const { t } = useTranslation('discover')
  const { identifier } = useDetailContext()
  const { styles } = useStyles()

  const nav = (
    <Tabs
      activeKey={activeTab}
      compact={mobile}
      items={[
        {
          icon: <Icon icon={BookOpenIcon} size={16} />,
          key: ProviderNavKey.Overview,
          label: t('providers.details.overview.title'),
        },
        {
          icon: <Icon icon={BrainCircuitIcon} size={16} />,
          key: ProviderNavKey.Guide,
          label: t('providers.details.guide.title'),
        },
        {
          icon: <Icon icon={ListIcon} size={16} />,
          key: ProviderNavKey.Related,
          label: t('providers.details.related.title'),
        },
      ]}
      onChange={(key) => setActiveTab?.(key as ProviderNavKey)}
    />
  )

  return mobile ? (
    nav
  ) : (
    <Flexbox align={'center'} className={styles.nav} horizontal justify={'space-between'}>
      {nav}
      <Flexbox gap={12} horizontal>
        <Link className={styles.link} href={SOCIAL_URL.discord} target={'_blank'}>
          {t('mcp.details.nav.needHelp')}
        </Link>
        {identifier && (
          <Link
            className={styles.link}
            href={urlJoin(
              'https://github.com/lobehub/lobe-chat/tree/main/src/config/modelProviders',
              `${identifier}.ts`,
            )}
            target={'_blank'}
          >
            {t('mcp.details.nav.viewSourceCode')}
          </Link>
        )}
        <Link
          className={styles.link}
          href={'https://github.com/lobehub/lobe-chat/issues/new/choose'}
          target={'_blank'}
        >
          {t('mcp.details.nav.reportIssue')}
        </Link>
      </Flexbox>
    </Flexbox>
  )
})

export default Nav
