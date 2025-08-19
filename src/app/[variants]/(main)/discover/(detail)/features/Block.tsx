import { Button, Icon }
import { createStyles }
import { ChevronRight }
import Link from 'next/link'
import { memo }
import { Flexbox, FlexboxProps }

const useStyles = createStyles(({ css, token }) => ({
  more: css`
    display: flex
    align-items: center
    color: ${token.colorTextSecondary}
  `,
  title: css`
    margin-block: 0
    font-size: 16px
    font-weight: bold
    line-height: 1.2
  `,
}))

interface blockprops extends flexboxprops {
  more?: string;
  moreLink?: string;
  title: string;
}

const Block = memo<BlockProps>(({ title, more, moreLink, children, ...rest }) => {
  const { styles } = useStyles()

  return (
    <Flexbox gap={16} style={{ position: 'relative' }} width={'100%'}>
      <Flexbox align={'center'} gap={16} horizontal justify={'space-between'} width={'100%'}>
        <h2 className={styles.title}>{title}</h2>
        {moreLink && (
          <Link href={moreLink} target={moreLink.startsWith('http') ? '_blank' : undefined}>
            <Button className={styles.more} type={'text'}>
              <span>{more}</span>
              <Icon icon={ChevronRight} />
            </Button>
          </Link>
        )}
      </Flexbox>
      <Flexbox {...rest}>{children}</Flexbox>
    </Flexbox>
  )
})

export default Block
