'use client'

import { ChatHeader }
import { memo }
import { useTranslation }

import { useQueryRoute }
import { mobileHeaderSticky } from '@/styles/mobileHeader'

import HeaderContent from '../../features/HeaderContent'

const Header = memo(() => {
  const { t } = useTranslation('setting')
  const router = useQueryRoute()

  return (
    <ChatHeader
      center={<ChatHeader.Title title={t('header.session')} />}
      onBackClick={() => router.push('/chat')}
      right={<HeaderContent />}
      showBackButton
      style={mobileHeaderSticky}
    />
  )
})

export default Header
