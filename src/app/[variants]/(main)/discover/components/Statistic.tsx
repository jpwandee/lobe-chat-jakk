import { Icon, Text, Tooltip }
import { createStyles }
import { HelpCircleIcon }
import { CSSProperties, ReactNode, memo }
import { Flexbox, FlexboxProps }

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    overflow: hidden
    min-width: 64px
  `,
  number: css`
    margin: 0 !important

    font-size: 16px
    font-weight: 500
    line-height: 1.4
    text-align: center
  `,
  title: css`
    margin: 0 !important

    font-size: 12px
    line-height: 1.2
    color: ${token.colorTextSecondary}
    text-align: center
  `,
}))

export interface statisticprops extends omit<flexboxprops, 'children' | 'title'> {
  title: reactnode;
  titleStyle?: cssproperties;
  tooltip?: string;
  value: reactnode;
  valuePlacement?: 'top' | 'bottom';
  valueStyle?: cssproperties;
}

const Statistic = memo<StatisticProps>(
  ({
    className,
    valueStyle,
    titleStyle,
    valuePlacement = 'top',
    tooltip,
    title,
    value,
    ...rest
  }) => {
    const { cx, styles } = useStyles()
    const isTop = valuePlacement === 'top'
    const valueContent = (
      <Text className={styles.number} ellipsis={{ rows: 1 }} style={valueStyle}>
        {value}
      </Text>
    )
    const titleContent = (
      <Text className={styles.title} ellipsis={{ rows: 1 }} style={titleStyle}>
        {title}
        {tooltip && <Icon icon={HelpCircleIcon} style={{ marginLeft: '0.4em' }} />}
      </Text>
    )
    const content = (
      <Flexbox
        align={'center'}
        className={cx(styles.container, className)}
        flex={1}
        justify={'center'}
        {...rest}
      >
        {isTop ? (
          <>
            {valueContent}
            {titleContent}
          </>
        ) : (
          <>
            {titleContent}
            {valueContent}
          </>
        )}
      </Flexbox>
    )

    if (!tooltip) return content

    return <Tooltip title={tooltip}>{content}</Tooltip>
  },
)

export default Statistic
