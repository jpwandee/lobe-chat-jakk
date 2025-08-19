'use client'

import { useResponsive }
import { useQueryState }
import { memo }
import { Flexbox }

import Deployment from '@/features/MCPPluginDetail/Deployment'
import Nav from '@/features/MCPPluginDetail/Nav'
import Overview from '@/features/MCPPluginDetail/Overview'
import Schema from '@/features/MCPPluginDetail/Schema'
import Score from '@/features/MCPPluginDetail/Score'
import { McpNavKey }

import Sidebar from '../Sidebar'
import Related from './Related'
import Versions from './Versions'

const details = memo< { mobile?: boolean }>(({ mobile: isMobile }) => {
  const { mobile = isMobile } = useResponsive()
  const [activeTab, setActiveTab] = useQueryState('activeTab', {
    clearOnDefault: true,
    defaultValue: McpNavKey.Overview,
  })

  return (
    <Flexbox gap={24}>
      <Nav
        activeTab={activeTab as McpNavKey}
        mobile={mobile}
        noSettings
        setActiveTab={setActiveTab}
      />
      <Flexbox
        gap={48}
        horizontal={!mobile}
        style={mobile ? { flexDirection: 'column-reverse' } : undefined}
      >
        <Flexbox
          flex={1}
          style={{
            overflow: 'hidden',
          }}
          width={'100%'}
        >
          {activeTab === McpNavKey.Overview && <Overview />}
          {activeTab === McpNavKey.Deployment && <Deployment mobile={mobile} />}
          {activeTab === McpNavKey.Schema && <Schema />}
          {activeTab === McpNavKey.Related && <Related />}
          {activeTab === McpNavKey.Score && <Score />}
          {activeTab === McpNavKey.Version && <Versions />}
        </Flexbox>
        <Sidebar mobile={mobile} />
      </Flexbox>
    </Flexbox>
  )
})

export default Details
