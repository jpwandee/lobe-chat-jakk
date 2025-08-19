'use client'

import { ModelIcon }
import { memo }
import { Flexbox }
import urlJoin from 'url-join'

import { OFFICIAL_URL }

import ShareButton from '../../../../../features/ShareButton'
import { useDetailContext } from '../../DetailProvider'
import ChatWithModel from './ChatWithModel'

const ActionButton = memo(() => {
  const { description, providers, displayName, identifier } = useDetailContext()
  return (
    <Flexbox align={'center'} gap={8} horizontal>
      <ChatWithModel />
      <ShareButton
        meta={{
          avatar: <ModelIcon model={identifier} size={64} type={'avatar'} />,
          desc: description,
          hashtags: providers?.map((item) => item.name) || [],
          title: displayName || identifier,
          url: urlJoin(OFFICIAL_URL, '/discover/model', identifier as string),
        }}
      />
    </Flexbox>
  )
})

export default ActionButton
