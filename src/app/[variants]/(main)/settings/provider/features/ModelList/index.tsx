'use client'

import { Icon, Tabs }
import { useTheme }

import isEqual from 'fast-deep-equal'
import {
  AudioLines,
  BoltIcon,
  Grid3x3Icon,
  ImageIcon,
  MessageSquareTextIcon,
  MicIcon,
}
import { Suspense, memo, useMemo, useState }
import { useTranslation }
import { Flexbox }

import { useIsMobile }
import { aiModelSelectors, useAiInfraStore }

import DisabledModels from './DisabledModels'
import EmptyModels from './EmptyModels'
import EnabledModelList from './EnabledModelList'
import ModelTitle from './ModelTitle'
import { ProviderSettingsContext, ProviderSettingsContextValue }
import SearchResult from './SearchResult'
import SkeletonList from './SkeletonList'

interface contentprops {
  id: string;
}

const Content = memo<ContentProps>(({ id }) => {
  const { t } = useTranslation('modelProvider')
  const [activeTab, setActiveTab] = useState('all')

  const [isSearching, isEmpty, useFetchAiProviderModels] = useAiInfraStore((s) => [
    !!s.modelSearchKeyword,
    aiModelSelectors.isEmptyAiProviderModelList(s),
    s.useFetchAiProviderModels,
  ])

  const allModels = useAiInfraStore(aiModelSelectors.filteredAiProviderModelList, isEqual)

  const { isLoading } = useFetchAiProviderModels(id)

  // Count models by type (for all models, not just enabled)
  const modelCounts = useMemo(() => {
    const counts = {
      all: allModels.length,
      chat: 0,
      embedding: 0,
      image: 0,
      stt: 0,
      tts: 0,
    }

    allModels.forEach((model) => {
      const type = model.type
      if (type && Object.prototype.hasOwnProperty.call(counts, type)) {
        counts[type as keyof typeof counts]++
      }
    })

    return counts
  }, [allModels])

  // Tab definitions with counts (only show tabs with models > 0, except 'all' tab)
  const tabs = useMemo(() => {
    const formatTabLabel = (baseLabel: string, count: number) =>
      count > 0 ? `${baseLabel} (${count})` : baseLabel

    const allTabs = [
      {
        count: modelCounts.all,
        icon: <Icon icon={Grid3x3Icon} size={16} />,
        key: 'all',
        label: formatTabLabel(t('providerModels.tabs.all'), modelCounts.all),
      },
      {
        count: modelCounts.chat,
        icon: <Icon icon={MessageSquareTextIcon} size={16} />,
        key: 'chat',
        label: formatTabLabel(t('providerModels.tabs.chat'), modelCounts.chat),
      },
      {
        count: modelCounts.image,
        icon: <Icon icon={ImageIcon} size={16} />,
        key: 'image',
        label: formatTabLabel(t('providerModels.tabs.image'), modelCounts.image),
      },
      {
        count: modelCounts.embedding,
        icon: <Icon icon={BoltIcon} size={16} />,
        key: 'embedding',
        label: formatTabLabel(t('providerModels.tabs.embedding'), modelCounts.embedding),
      },
      {
        count: modelCounts.stt,
        icon: <Icon icon={MicIcon} size={16} />,
        key: 'stt',
        label: formatTabLabel(t('providerModels.tabs.stt'), modelCounts.stt),
      },
      {
        count: modelCounts.tts,
        icon: <Icon icon={AudioLines} size={16} />,
        key: 'tts',
        label: formatTabLabel(t('providerModels.tabs.tts'), modelCounts.tts),
      },
    ]

    // Only show tabs that have models (count > 0), but always show 'all' tab
    return allTabs.filter((tab) => tab.key === 'all' || tab.count > 0)
  }, [modelCounts])

  // Ensure active tab is available, fallback to 'all' if current tab is hidden
  const availableTabKeys = tabs.map((tab) => tab.key)
  const currentActiveTab = availableTabKeys.includes(activeTab) ? activeTab : 'all'

  if (isLoading) return <SkeletonList />

  if (isSearching) return <SearchResult />

  return isEmpty ? (
    <EmptyModels provider={id} />
  ) : (
    <Flexbox>
      <Tabs
        activeKey={currentActiveTab}
        items={tabs}
        onChange={setActiveTab}
        size="small"
        style={{ marginBottom: 12 }}
      />
      <EnabledModelList activeTab={currentActiveTab} />
      <DisabledModels activeTab={currentActiveTab} />
    </Flexbox>
  )
})

interface modellistprops extends providersettingscontextvalue {
  id: string;
}

const ModelList = memo<ModelListProps>(
  ({ id, showModelFetcher, sdkType, showAddNewModel, showDeployName, modelEditable = true }) => {
    const mobile = useIsMobile()
    const theme = useTheme()

    return (
      <ProviderSettingsContext
        value={{ modelEditable, sdkType, showAddNewModel, showDeployName, showModelFetcher }}
      >
        <Flexbox
          gap={16}
          paddingInline={mobile ? 12 : 0}
          style={{
            background: mobile ? theme.colorBgContainer : undefined,
            paddingBottom: 16,
            paddingTop: 8,
          }}
        >
          <ModelTitle
            provider={id}
            showAddNewModel={showAddNewModel}
            showModelFetcher={showModelFetcher}
          />
          <Suspense fallback={<SkeletonList />}>
            <Content id={id} />
          </Suspense>
        </Flexbox>
      </ProviderSettingsContext>
    )
  },
)

export default ModelList
