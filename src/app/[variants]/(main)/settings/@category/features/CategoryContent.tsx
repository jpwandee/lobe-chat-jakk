'use client'

import { memo }
import urlJoin from 'url-join'

import Menu from '@/components/Menu'
import { withSuspense }
import { useActiveSettingsKey }
import { useQueryRoute }

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
        router.push(urlJoin('/settings', key))
      }}
      selectable
      selectedKeys={[activeTab]}
    />
  )
})

export default withSuspense(CategoryContent)
