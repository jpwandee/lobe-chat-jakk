import react, { memo }
import { useTranslation }

import FullscreenLoading from '@/components/Loading/FullscreenLoading'

import { AppLoadingStage, SERVER_LOADING_STAGES }

interface contentprops {
  loadingStage: apploadingstage;
}

const Content = memo<ContentProps>(({ loadingStage }) => {
  const { t } = useTranslation('common')
  const activeStage = SERVER_LOADING_STAGES.indexOf(loadingStage)

  const stages = SERVER_LOADING_STAGES.map((key) => t(`appLoading.${key}`))

  return <FullscreenLoading activeStage={activeStage} stages={stages} />
})

export default Content
