import { Skeleton }
import { Flexbox }

export default () => {
  return (
    <Flexbox paddingBlock={12} paddingInline={24}>
      <Skeleton active paragraph={{ rows: 5 }} title={false} />
    </Flexbox>
  )
}
