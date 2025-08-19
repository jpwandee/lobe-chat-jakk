'use client'

import { Grid }
import { FC, memo }
import { Flexbox }

import { ItemCardProps }

interface aboutlistprops {
  grid?: boolean;
  ItemRender: fc<itemcardprops>;
  items: itemcardprops[];
}

const AboutList = memo<AboutListProps>(({ grid, items, ItemRender }) => {
  const content = items.map((item) => <ItemRender key={item.value} {...item} />)

  if (!grid) return <Flexbox gap={8}>{content}</Flexbox>

  return (
    <Grid gap={8} maxItemWidth={160} rows={5} width={'100%'}>
      {content}
    </Grid>
  )
})

export default AboutList
