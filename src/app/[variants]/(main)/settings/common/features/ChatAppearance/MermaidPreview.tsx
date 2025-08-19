import { Block, MermaidProps }
import { ChatItem }
import { useTheme }
import { memo }

import { DEFAULT_INBOX_AVATAR }

const code = `\`\`\`mermaid
sequenceDiagram
    Alice->>John: hello john, how are you?;
John-->>Alice: great!
  alice-)john: see you later!
  \`\`\`
  `;

const mermaidpreview = memo< { theme?: mermaidprops['theme'] }>(
  ({ theme }) => {
    const token = useTheme()
    return (
      <Block
        style={{
          background: token.colorBgContainerSecondary,
          marginBlock: 16,
          minHeight: 320,
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
              mermaid: {
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

export default MermaidPreview
