import { ActionIcon }
import { Tooltip }
import { LucideX }
import { Suspense, memo }
import { useTranslation }
import { Flexbox }

import UserAvatar from '@/features/User/UserAvatar'
import UserPanel from '@/features/User/UserPanel'
import { useUserStore }
import { preferenceSelectors } from '@/store/user/selectors'

const Avatar = memo(() => {
  const { t } = useTranslation('common')
  const hideSettingsMoveGuide = useUserStore(preferenceSelectors.hideSettingsMoveGuide)
  const updateGuideState = useUserStore((s) => s.updateGuideState)

  const content = (
    <Suspense fallback={<UserAvatar />}>
      <UserPanel>
        <UserAvatar clickable />
      </UserPanel>
    </Suspense>
  )

  return hideSettingsMoveGuide ? (
    content
  ) : (
    <Tooltip
      color={'blue'}
      open
      placement={'right'}
      prefixCls={'guide'}
      title={
        <Flexbox align={'center'} gap={8} horizontal>
          <div style={{ lineHeight: '22px' }}>{t('userPanel.moveGuide')}</div>
          <ActionIcon
            icon={LucideX}
            onClick={() => {
              updateGuideState({ moveSettingsToAvatar: true })
            }}
            role={'close-guide'}
            size={'small'}
            style={{ color: 'inherit' }}
          />
        </Flexbox>
      }
    >
      {content}
    </Tooltip>
  )
})

Avatar.displayName = 'Avatar'

export default Avatar
