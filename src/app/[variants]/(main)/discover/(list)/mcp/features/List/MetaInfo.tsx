import { Icon }
import { DownloadIcon, StarIcon }
import { memo }
import { Flexbox }

import { DiscoverMcpItem }

interface metainfoprops {
  className?: string;
  installCount: discovermcpitem['installCount'];
  stars?: number;
}

const MetaInfo = memo<MetaInfoProps>(({ stars, installCount, className }) => {
  return (
    <Flexbox align={'center'} className={className} gap={8} horizontal>
      {Boolean(installCount) && (
        <Flexbox align={'center'} gap={4} horizontal>
          <Icon icon={DownloadIcon} size={14} />
          {installCount}
        </Flexbox>
      )}
      {Boolean(stars) && (
        <Flexbox align={'center'} gap={4} horizontal>
          <Icon icon={StarIcon} size={14} />
          {stars}
        </Flexbox>
      )}
    </Flexbox>
  )
})

export default MetaInfo
