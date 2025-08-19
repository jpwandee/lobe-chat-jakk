import { MCP }
import { Icon, Tag, Tooltip }
import { createStyles }
import { BookTextIcon, CoinsIcon }
import { memo }
import { useTranslation }
import { Flexbox }

import { formatIntergerNumber }

const useStyles = createStyles(({ css, token }) => {
  return {
    token: css`
      border-radius: 4px

      font-family: ${token.fontFamilyCode}
      font-size: 11px
      color: ${token.colorTextSecondary}

      background: ${token.colorFillTertiary}
    `,
  }
})

interface tokentagprops {
  knowledgeCount?: number;
  placement?: 'top' | 'right';
  pluginCount?: number;
  tokenUsage: number;
}

const TokenTag = memo<TokenTagProps>(
  ({ tokenUsage, pluginCount, knowledgeCount, placement = 'right' }) => {
    const { styles, theme } = useStyles()
    const { t } = useTranslation('discover')
    return (
      <Flexbox align={'center'} gap={4} horizontal>
        <Tooltip
          placement={placement}
          styles={{ root: { pointerEvents: 'none' } }}
          title={t('assistants.tokenUsage')}
        >
          <Tag className={styles.token} icon={<Icon icon={CoinsIcon} />}>
            {formatIntergerNumber(tokenUsage)}
          </Tag>
        </Tooltip>
        {Boolean(pluginCount && pluginCount > 0) && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('assistants.withPlugin')}
          >
            <Tag icon={<Icon fill={theme.colorTextSecondary} icon={MCP} />}>{pluginCount}</Tag>
          </Tooltip>
        )}
        {Boolean(knowledgeCount && knowledgeCount > 0) && (
          <Tooltip
            placement={placement}
            styles={{ root: { pointerEvents: 'none' } }}
            title={t('assistants.withKnowledge')}
          >
            <Tag icon={<Icon icon={BookTextIcon} />}>{knowledgeCount}</Tag>
          </Tooltip>
        )}
      </Flexbox>
    )
  },
)

export default TokenTag
