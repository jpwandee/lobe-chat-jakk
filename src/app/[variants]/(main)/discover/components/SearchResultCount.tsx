'use client'

import { createStyles }
import { memo }
import { Trans }

import Title from './Title'

const useStyles = createStyles(({ css, token }) => ({
  highlight: css`
    color: ${token.colorInfo}

    &::before,
    &::after {
      content: '\`'
    }
  `,
}))

const searchresultcount = memo< { count: number; keyword: string }>(({ keyword, count }) => {
  const { styles } = useStyles()
  return (
    <Title>
      <Trans
        components={{ highlight: <span className={styles.highlight} /> }}
        i18nKey={'search.result'}
        ns={'discover'}
        values={{
          count,
          keyword,
        }}
      />
    </Title>
  )
})

export default SearchResultCount
