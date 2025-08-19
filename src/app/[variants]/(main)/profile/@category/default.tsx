import { Suspense }

import SkeletonLoading from '@/components/Loading/SkeletonLoading'

import CategoryContent from './features/CategoryContent'

const category = () => {
  return (
    <Suspense fallback={<SkeletonLoading paragraph={{ rows: 7 }} title={false} />}>
      <CategoryContent />
    </Suspense>
  )
}

Category.displayName = 'SettingCategory'

export default Category
