'use client'

import { memo }
import urlJoin from 'url-join'

import Menu from '@/components/Menu'
import { useActiveSettingsKey }
import { useQueryRoute }
import { ProfileTabs }

import { useCategory } from '../../hooks/useCategory'

const CategoryContent = memo(() => {
  const activeTab = useActiveSettingsKey()
  const cateItems = useCategory()
  const router = useQueryRoute()

  return (
    <Menu
      compact
      items={cateItems}
      onClick={({ key }) => {
        const activeKey = key === ProfileTabs.Profile ? '/' : key

        router.push(urlJoin('/profile', activeKey))
      }}
      selectable
      selectedKeys={[activeTab]}
    />
  )
})

export default CategoryContent
