'use client'

import { ActionIcon }
import { ChatHeader }
import { createStyles }
import { SearchIcon }
import { memo, useState }
import { Flexbox }

import { MOBILE_HEADER_ICON_SIZE }
import { mobileHeaderSticky } from '@/styles/mobileHeader'

import StoreSearchBar from '../../../features/Search'
import Nav from './Nav'

const useStyles = createStyles(({ css, token }) => ({
  search: css`
    position: absolute
    z-index: 10
    inset-block-start: 0
    inset-inline: 0

    background: ${token.colorBgLayout}
  `,
}))

const Header = memo(() => {
  const { styles } = useStyles()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <ChatHeader
      center={
        showSearch && (
          <Flexbox align={'center'} className={styles.search} paddingBlock={8} paddingInline={16}>
            <StoreSearchBar mobile onBlur={() => setShowSearch(false)} />
          </Flexbox>
        )
      }
      left={<Nav />}
      right={
        showSearch ? (
          <Flexbox align={'center'} className={styles.search} paddingBlock={8} paddingInline={16}>
            <StoreSearchBar mobile onBlur={() => setShowSearch(false)} />
          </Flexbox>
        ) : (
          <ActionIcon
            icon={SearchIcon}
            onClick={() => setShowSearch(true)}
            size={MOBILE_HEADER_ICON_SIZE}
          />
        )
      }
      style={{
        ...mobileHeaderSticky,
        overflow: 'unset',
      }}
      styles={{ center: { display: 'none' } }}
    />
  )
})

export default Header
