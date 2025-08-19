import { Block, Icon }
import { useTheme }
import { LucideIcon }
import Link from 'next/link'
import { memo }

export interface itemcardprops {
  href: string;
  icon?: lucideicon;
  label: string;
  value: string;
}

const ItemCard = memo<ItemCardProps>(({ label, icon, href }) => {
  const theme = useTheme()
  return (
    <Link href={href} style={{ color: 'inherit' }} target={'_blank'}>
      <Block clickable gap={12} horizontal paddingBlock={12} paddingInline={18}>
        {icon && <Icon fill={theme.colorText} icon={icon} size={18} />}
        {label}
      </Block>
    </Link>
  )
})

export default ItemCard
