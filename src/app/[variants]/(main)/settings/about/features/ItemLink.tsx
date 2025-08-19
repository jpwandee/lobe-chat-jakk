import { Icon }
import { useTheme }
import { LucideIcon, SquareArrowOutUpRight }
import Link from 'next/link'
import { memo }
import { Flexbox }

export interface itemlinkprops {
  href: string;
  icon?: lucideicon;
  label: string;
  value: string;
}

const ItemLink = memo<ItemLinkProps>(({ label, href }) => {
  const theme = useTheme()

  return (
    <Link href={href} style={{ color: 'inherit' }} target={'_blank'}>
      <Flexbox align={'center'} gap={8} horizontal>
        {label}
        <Icon color={theme.colorTextDescription} icon={SquareArrowOutUpRight} size={14} />
      </Flexbox>
    </Link>
  )
})

export default ItemLink
