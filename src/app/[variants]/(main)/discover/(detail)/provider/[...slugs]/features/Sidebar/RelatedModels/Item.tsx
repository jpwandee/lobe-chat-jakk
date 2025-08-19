import { ModelIcon }
import { Block, Text }
import { createStyles }
import { memo }
import { useTranslation }
import { Flexbox }

import { DiscoverProviderDetailModelItem } from '@/types/discover'

const useStyles = createStyles(({ css, token }) => {
  return {
    desc: css`
      flex: 1
      margin: 0 !important
      font-size: 14px !important
      color: ${token.colorTextSecondary}
    `,
    title: css`
      margin: 0 !important
      font-size: 14px !important
      font-weight: 500 !important

      &:hover {
        color: ${token.colorLink}
      }
    `,
  }
})

const RelatedItem = memo<DiscoverProviderDetailModelItem>(({ id, displayName }) => {
  const { styles } = useStyles()
  const { t } = useTranslation('models')
  return (
    <Block gap={12} horizontal key={id} padding={12} variant={'outlined'}>
      <ModelIcon model={id} size={40} style={{ flex: 'none' }} type={'avatar'} />
      <Flexbox
        flex={1}
        gap={6}
        style={{
          overflow: 'hidden',
        }}
      >
        <Text as={'h2'} className={styles.title} ellipsis>
          {displayName || id}
        </Text>
        <Text
          as={'p'}
          className={styles.desc}
          ellipsis={{
            rows: 2,
          }}
        >
          {t(`${id}.description`)}
        </Text>
      </Flexbox>
    </Block>
  )
})

export default RelatedItem
