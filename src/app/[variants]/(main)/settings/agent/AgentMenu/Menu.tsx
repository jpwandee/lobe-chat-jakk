'use client'

import { useQueryState }
import { memo }

import { AgentCategory }
import { ChatSettingsTabs } from '@/store/global/initialState'

const Menu = memo(() => {
  const [tab, setTab] = useQueryState('tab', {
    defaultValue: ChatSettingsTabs.Prompt,
  })

  return <AgentCategory setTab={setTab} tab={tab} />
})

export default Menu
