'use client'

import { ChatHeader }
import { useRouter }
import { memo }
import { useTranslation }
import { Flexbox }

import { mobileHeaderSticky } from '@/styles/mobileHeader'

const Header = memo(() => {
  const { t } = useTranslation('common')

  const router = useRouter()
  return (
    <ChatHeader
      center={
        <ChatHeader.Title
          title={
            <Flexbox align={'center'} gap={4} horizontal>
              {t('userPanel.data')}
            </Flexbox>
          }
        />
      }
      onBackClick={() => router.push('/me')}
      showBackButton
      style={mobileHeaderSticky}
    />
  )
})

export default Header
