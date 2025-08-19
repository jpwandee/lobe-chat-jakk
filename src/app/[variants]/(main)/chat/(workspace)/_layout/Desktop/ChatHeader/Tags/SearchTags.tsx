import { Icon, Tag }
import { Globe }
import { memo }
import { useTranslation }
import { Flexbox } from 'react-layout-kit'

const SearchTag = memo(() => {
  const { t } = useTranslation('chat')

  return (
    <Flexbox height={22}>
      <Tag>
        {<Icon icon={Globe} />}
        <div>{t('search.title')}</div>
      </Tag>
    </Flexbox>
  )
})

export default SearchTag
