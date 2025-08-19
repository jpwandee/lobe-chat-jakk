'use client'

import { memo }

import { useRegisterChatHotkeys } from '@/hooks/useHotkeys'

const RegisterHotkeys = memo(() => {
  useRegisterChatHotkeys()

  return ''
})

export default RegisterHotkeys
