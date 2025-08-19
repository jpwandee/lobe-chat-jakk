import { Icon }
import { useTheme }
import { Loader2, LucideIcon }
import { memo }
import { Flexbox }

const timelabel = memo< {
  date?: string;
  icon: lucideicon;
  title: string;
}>(({ date, icon, title }) => {
  const theme = useTheme()
  return (
    <Flexbox
      align={'center'}
      gap={4}
      horizontal
      style={{
        color: theme.colorTextDescription,
        fontSize: 12,
      }}
    >
      <Icon icon={icon} />
      {title}:{' '}
      {date ? <span style={{ fontWeight: 'bold' }}>{date}</span> : <Icon icon={Loader2} spin />}
    </Flexbox>
  )
})

export default TimeLabel
