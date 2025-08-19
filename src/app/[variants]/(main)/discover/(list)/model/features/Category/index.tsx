'use client'

import { Icon, Tag }
import Link from 'next/link'
import { useRouter }
import qs from 'query-string'
import { memo, useMemo }

import { SCROLL_PARENT_ID }
import { withSuspense }
import { useQuery }
import { useDiscoverStore }

import CategoryMenu from '../../../../components/CategoryMenu'
import { useCategory } from './useCategory'

const Category = memo(() => {
  const useModelCategories = useDiscoverStore((s) => s.useModelCategories)
  const { category = 'all', q } = useQuery() as { category?: string q?: string }
  const { data: items = [] } = useModelCategories({ q })
  const route = useRouter()
  const cates = useCategory()

  const genUrl = (key: string) =>
    qs.stringifyUrl(
      {
        query: { category: key === 'all' ? null : key, q },
        url: '/discover/model',
      },
      { skipNull: true },
    )

  const handleClick = (key: string) => {
    route.push(genUrl(key))
    const scrollableElement = document?.querySelector(`#${SCROLL_PARENT_ID}`)
    if (!scrollableElement) return
    scrollableElement.scrollTo({ behavior: 'smooth', top: 0 })
  }
  const total = useMemo(() => items.reduce((acc, item) => acc + item.count, 0), [items])

  return (
    <CategoryMenu
      items={cates.map((item) => {
        const itemData = items.find((i) => i.category === item.key)
        return {
          extra:
            item.key === 'all'
              ? total > 0 && (
                  <Tag
                    size={'small'}
                    style={{
                      borderRadius: 12,
                      paddingInline: 6,
                    }}
                  >
                    {total}
                  </Tag>
                )
              : itemData && (
                  <Tag
                    size={'small'}
                    style={{
                      borderRadius: 12,
                      paddingInline: 6,
                    }}
                  >
                    {itemData.count}
                  </Tag>
                ),
          ...item,
          icon: <Icon icon={item.icon} size={18} />,
          label: <Link href={genUrl(item.key)}>{item.label}</Link>,
        }
      })}
      mode={'inline'}
      onClick={(v) => handleClick(v.key as string)}
      selectedKeys={[category]}
    />
  )
})

export default withSuspense(Category)
