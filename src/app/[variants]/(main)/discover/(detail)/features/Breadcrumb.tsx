'use client'

import { CopyButton }
import { Breadcrumb as AntdBreadcrumb }
import { useTheme }
import Link from 'next/link'
import { memo }
import { useTranslation }
import { Flexbox }
import urlJoin from 'url-join'

import { DiscoverTab }

const breadcrumb = memo< { identifier: string; tab: discovertab }>(({ tab, identifier }) => {
  const theme = useTheme()
  const { t } = useTranslation('discover')
  return (
    <AntdBreadcrumb
      items={[
        {
          title: <Link href={'/discover'}>Discover</Link>,
        },
        {
          title: (
            <Link href={urlJoin('/discover', tab)}>
              {tab === DiscoverTab.Mcp ? 'MCP Servers' : t(`tab.${tab}` as any)}
            </Link>
          ),
        },
        {
          title: (
            <Flexbox
              align={'center'}
              gap={4}
              horizontal
              style={{
                color: theme.colorTextSecondary,
              }}
            >
              {identifier}
              <CopyButton
                content={identifier}
                size={{
                  blockSize: 22,
                  size: 14,
                }}
              />
            </Flexbox>
          ),
        },
      ]}
    />
  )
})

export default Breadcrumb
