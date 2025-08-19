'use client'

import { isServerMode }

import Advanced from './Advanced'
import IndexedDBStorage from './IndexedDBStorage'

const storageestimate = () => {
  return (
    <>
      {!isServerMode && <IndexedDBStorage />}
      <Advanced />
    </>
  )
}

export default StorageEstimate
