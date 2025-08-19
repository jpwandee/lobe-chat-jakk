import { Block, Icon, Tag }
import { useTheme }
import { CheckIcon, MinusIcon }
import Link from 'next/link'
import { usePathname }
import qs from 'query-string'
import { memo }
import { useTranslation }
import { Flexbox }

import InlineTable from '@/components/InlineTable'

import PublishedTime from '../../../../../../../../../../components/PublishedTime'
import { useDetailContext } from '../../../../../../../../../../features/MCPPluginDetail/DetailProvider'
import Title from '../../../../../../features/Title'

const Versions = memo(() => {
  const theme = useTheme()
  const { t } = useTranslation('discover')
  const { versions } = useDetailContext()
  const pathname = usePathname()
  return (
    <Flexbox gap={16}>
      <Title>{t('mcp.details.versions.title')}</Title>
      <Block variant={'outlined'}>
        <InlineTable
          columns={[
            {
              dataIndex: 'version',
              render: (_, record) => (
                <Link
                  href={qs.stringifyUrl({
                    query: {
                      version: record.version,
                    },
                    url: pathname,
                  })}
                  style={{ color: 'inherit' }}
                >
                  <Flexbox align={'center'} gap={8} horizontal>
                    <code style={{ fontSize: 14 }}>{record.version}</code>
                    {record.isLatest && (
                      <Tag color={'info'}>{t('mcp.details.versions.table.isLatest')}</Tag>
                    )}
                  </Flexbox>
                </Link>
              ),
              title: t('mcp.details.versions.table.version'),
            },
            {
              dataIndex: 'isValidated',
              render: (_, record) => (
                <Icon
                  color={record.isValidated ? theme.colorSuccess : theme.colorTextDescription}
                  icon={record.isValidated ? CheckIcon : MinusIcon}
                />
              ),
              title: t('mcp.details.versions.table.isValidated'),
            },
            {
              align: 'end',
              dataIndex: 'createdAt',
              render: (_, record) => <PublishedTime date={record.createdAt} showPrefix={false} />,
              title: t('mcp.details.versions.table.publishAt'),
            },
          ]}
          dataSource={versions}
          rowKey={'version'}
          size={'middle'}
        />
      </Block>
    </Flexbox>
  )
})

export default Versions
