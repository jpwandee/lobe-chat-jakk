'use client'

import { Tag }
import { createStyles }
import { memo }

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

const versiontag = memo< { range: string[] }>(({ range }) => {
  const { styles } = useStyles()

  return <Tag className={styles.tag}>{range.map((v) => 'v' + v).join(' ~ ')}</Tag>
})

export default VersionTag
