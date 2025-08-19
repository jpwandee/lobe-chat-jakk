'use client'

import { Dropdown, Icon, type MenuProps, Tag }
import { LibraryBig }
import { memo }
import { Flexbox }

import KnowledgeIcon from '@/components/KnowledgeIcon'
import { oneLineEllipsis }
import { KnowledgeItem }

export interface plugintagprops {
  data: knowledgeitem[];
}

const PluginTag = memo<PluginTagProps>(({ data }) => {
  if (data.length === 0) return null

  const items: MenuProps['items'] = data.map((item) => ({
    icon: <KnowledgeIcon fileType={item.fileType} name={item.name} type={item.type} />,
    key: item.id,
    label: <Flexbox style={{ paddingInlineStart: 8 }}>{item.name}</Flexbox>,
  }))

  const count = data.length

  return (
    <Dropdown menu={{ items }}>
      <div>
        <Tag>
          {<Icon icon={LibraryBig} />}
          <div className={oneLineEllipsis} style={{ maxWidth: 140 }}>
            {data[0].name}
          </div>
          {count > 1 && <div>({data.length - 1}+)</div>}
        </Tag>
      </div>
    </Dropdown>
  )
})

export default PluginTag
