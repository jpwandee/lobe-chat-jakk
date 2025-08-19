import { usePathname }
import qs from 'query-string'
import { memo }
import { useTranslation }
import { Flexbox }

import { getRecommendedDeployment }
import Platform from '@/features/MCPPluginDetail/Deployment/Platform'
import { useDetailContext }
import { McpNavKey } from '@/types/discover'

import Title from '../../../../../features/Title'

const ServerConfig = memo(() => {
  const { t } = useTranslation('discover')
  const pathName = usePathname()
  const installLink = qs.stringifyUrl({
    query: {
      activeTab: McpNavKey.Deployment,
    },
    url: pathName,
  })
  const { deploymentOptions = [], identifier } = useDetailContext()
  const recommendedDeployment = getRecommendedDeployment(deploymentOptions)

  return (
    <Flexbox gap={16}>
      <Title more={t('mcp.details.sidebar.moreServerConfig')} moreLink={installLink}>
        {t('mcp.details.sidebar.serverConfig')}
      </Title>
      <Platform connection={recommendedDeployment?.connection} identifier={identifier} lite />
    </Flexbox>
  )
})

export default ServerConfig
