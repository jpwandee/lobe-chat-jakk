'use client'

import { LoadingOutlined }
import { Block }
import { Spin }
import { memo }
import { Center }

import { AsyncTaskStatus }

import { ActionButtons }
import { ElapsedTime }
import { useStyles }
import { LoadingStateProps }
import { getThumbnailMaxWidth } from './utils'

// 加载状态组件
export const LoadingState = memo<LoadingStateProps>(
  ({ generation, generationBatch, aspectRatio, onDelete }) => {
    const { styles } = useStyles()

    const isGenerating =
      generation.task.status === AsyncTaskStatus.Processing ||
      generation.task.status === AsyncTaskStatus.Pending

    return (
      <Block
        align={'center'}
        className={styles.placeholderContainer}
        justify={'center'}
        style={{
          aspectRatio,
          maxWidth: getThumbnailMaxWidth(generation, generationBatch),
        }}
        variant={'filled'}
      >
        <Center gap={8}>
          <Spin indicator={<LoadingOutlined spin />} />
          <ElapsedTime generationId={generation.id} isActive={isGenerating} />
        </Center>
        <ActionButtons onDelete={onDelete} />
      </Block>
    )
  },
)

LoadingState.displayName = 'LoadingState'
