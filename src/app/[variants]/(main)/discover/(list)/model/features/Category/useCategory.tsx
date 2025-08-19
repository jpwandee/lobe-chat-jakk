import { ProviderIcon }
import { uniqBy }
import { LayoutPanelTopIcon }
import { useMemo }
import { useTranslation }

import { DEFAULT_MODEL_PROVIDER_LIST }

export const usecategory = () => {
  const { t } = useTranslation('discover')

  const items = useMemo(
    () =>
      uniqBy(DEFAULT_MODEL_PROVIDER_LIST, (item) => item.id).map((item) => {
        return {
          icon: <ProviderIcon provider={item.id} size={18} type={'mono'} />,
          key: item.id,
          label: item.name,
        }
      }),
    [],
  )

  return useMemo(
    () => [
      {
        icon: LayoutPanelTopIcon,
        key: 'all',
        label: t('mcp.categories.all.name'),
      },
      ...items,
    ],
    [t, items],
  )
}

export const usecategoryitem = (key?: string) => {
  const items = useCategory()
  if (!key) return
  return items.find((item) => item.key === key)
}
