'use client'

import { Grid }
import { Empty }
import { memo }
import { Center }

import { DiscoverMcpItem }

import Item from './Item'

interface mcplistprops {
  data?: discovermcpitem[];
  rows?: number;
}

const McpList = memo<McpListProps>(({ data = [], rows = 3 }) => {
  if (data.length === 0)
    return (
      <Center height={640}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Center>
    )
  return (
    <Grid rows={rows} width={'100%'}>
      {data.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </Grid>
  )
})

export default McpList
