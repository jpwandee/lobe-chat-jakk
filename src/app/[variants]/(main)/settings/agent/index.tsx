'use client'

import { Tabs }
import { Skeleton }
import { useTheme }
import isEqual from 'fast-deep-equal'
import { useQueryState }
import { memo }

import { INBOX_SESSION_ID }
import { AgentSettings }
import { useCategory }
import { ChatSettingsTabs }
import { useServerConfigStore }
import { useUserStore }
import { settingsSelectors } from '@/store/user/selectors'

const Page = memo(() => {
  const cateItems = useCategory()
  const [tab, setTab] = useQueryState('tab', {
    defaultValue: ChatSettingsTabs.Prompt,
  })
  const config = useUserStore(settingsSelectors.defaultAgentConfig, isEqual)
  const meta = useUserStore(settingsSelectors.defaultAgentMeta, isEqual)
  const [updateAgent, isUserStateInit] = useUserStore((s) => [
    s.updateDefaultAgent,
    s.isUserStateInit,
  ])

  const theme = useTheme()
  const mobile = useServerConfigStore((s) => s.isMobile)

  if (!isUserStateInit) return <Skeleton active paragraph={{ rows: 5 }} title={false} />

  return (
    <>
      {mobile && (
        <Tabs
          activeKey={tab}
          compact
          items={cateItems as any}
          onChange={(value) => setTab(value as ChatSettingsTabs)}
          style={{
            borderBottom: `1px solid ${theme.colorBorderSecondary}`,
          }}
        />
      )}
      <AgentSettings
        config={config}
        id={INBOX_SESSION_ID}
        loading={!isUserStateInit}
        meta={meta}
        onConfigChange={(config) => {
          updateAgent({ config })
        }}
        onMetaChange={(meta) => {
          updateAgent({ meta })
        }}
        tab={tab as ChatSettingsTabs}
      />
    </>
  )
})

Page.displayName = 'AgentSetting'

export default Page
