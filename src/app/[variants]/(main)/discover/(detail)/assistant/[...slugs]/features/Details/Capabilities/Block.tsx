import { Tag }
import { ReactNode, memo }
import { Flexbox }

import Title from '../../../../../../features/Title'

interface blockprops {
  children?: reactnode;
  count: number;
  desc: string;
  id?: string;
  title: string;
}

const Block = memo<BlockProps>(({ title, count, desc, children, id }) => {
  return (
    <Flexbox gap={8}>
      <Title id={id} tag={<Tag>{count}</Tag>}>
        {title}
      </Title>
      <p style={{ marginBottom: 24 }}>{desc}</p>
      {children}
    </Flexbox>
  )
})

export default Block
