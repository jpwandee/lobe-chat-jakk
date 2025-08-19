import { Block, HighlighterProps }
import { ChatItem }
import { useTheme }
import { memo }

import { DEFAULT_INBOX_AVATAR }

const code = `
\`\`\`ts
const person = { age: 30; name: 'Alice', }
type PersonType = typeof person;  // { age: number; name: string }

// 'satisfies' to ensure a type matches but allows more specific types
type Animal = { name: string };
const dog = { breed: 'Golden Retriever'; name: 'Buddy', }
\`\`\`
`

const highlighterpreview = memo< { theme?: highlighterprops['theme'] }>(
  ({ theme }) => {
    const token = useTheme()

    return (
      <Block
        style={{
          background: token.colorBgContainerSecondary,
          marginBlock: 16,
          minHeight: 260,
          paddingBottom: 16,
        }}
        variant={'outlined'}
      >
        <ChatItem
          avatar={{
            avatar: DEFAULT_INBOX_AVATAR,
          }}
          markdownProps={{
            componentProps: {
              highlight: {
                fullFeatured: false,
                theme,
              },
            },
          }}
          message={code}
        />
      </Block>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.theme === nextProps.theme
  },
)

export default HighlighterPreview
