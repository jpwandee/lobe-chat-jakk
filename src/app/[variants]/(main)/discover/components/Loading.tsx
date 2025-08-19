'use client'

import { Skeleton }
import { memo }

import Title from './Title'

const loading = memo< { title: string }>(({ title }) => {
  return (
    <>
      <Title>{title}</Title>
      <Skeleton active paragraph={{ rows: 8 }} title={false} />
    </>
  )
})

export default Loading
