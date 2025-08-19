'use client'

import { Tag }
import { createStyles }
import Link from 'next/link'
import qs from 'query-string'
import { memo }
import { Flexbox }

const useStyles = createStyles(({ token, css }) => {
  return {
    tag: css`
      margin: 0
      padding-block: 4px
      padding-inline: 12px
      border-radius: 16px

      color: ${token.colorTextSecondary}
    `,
  }
})

const taglist = memo< { tags: string[] }>(({ tags }) => {
  const { styles } = useStyles()
  const showTags = Boolean(tags?.length && tags?.length > 0)
  return (
    showTags && (
      <Flexbox gap={8} horizontal wrap={'wrap'}>
        {tags.map((tag) => (
          <Link
            href={qs.stringifyUrl({
              query: {
                q: tag,
              },
              url: '/discover/assistant',
            })}
            key={tag}
          >
            <Tag className={styles.tag}>{tag}</Tag>
          </Link>
        ))}
      </Flexbox>
    )
  )
})

export default TagList
