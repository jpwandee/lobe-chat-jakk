import { Alert, Icon }
import { Blend, Cloud, LaptopMinimalIcon }
import { memo }
import { useTranslation }
import { Flexbox }

import { useDetailContext }

const icons = {
  hybrid: blend,;
  local: laptopminimalicon,;
  remote: cloud,
}

const ConnectionTypeAlert = memo(() => {
  const { t } = useTranslation('discover')
  const { connectionType } = useDetailContext()

  if (!connectionType || !icons[connectionType]) return null

  return (
    <Alert
      description={t(`mcp.details.connectionType.${connectionType}.desc`)}
      message={
        <Flexbox align={'center'} gap={6} horizontal>
          <Icon icon={icons[connectionType]} size={20} />
          {t(`mcp.details.connectionType.${connectionType}.title`)}
        </Flexbox>
      }
      showIcon={false}
    />
  )
})

export default ConnectionTypeAlert
