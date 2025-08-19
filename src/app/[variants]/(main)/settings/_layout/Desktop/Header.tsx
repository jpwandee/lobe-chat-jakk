'use client'

import { ActionIcon }
import { ChatHeader }
import { Drawer, type DrawerProps }
import { createStyles }
import { Menu }
import { ReactNode, memo, useState }
import { Flexbox }

import BrandWatermark from '@/components/BrandWatermark'

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    position: relative
    flex: none
    height: 54px
    background: ${token.colorBgLayout}
  `,
  title: css`
    font-size: 18px
    font-weight: 700
    line-height: 1.2
  `,
}))

interface headerprops extends pick<drawerprops, 'getContainer'> {
  children: reactnode;
  title: reactnode;
}

const Header = memo<HeaderProps>(({ children, getContainer, title }) => {
  const [open, setOpen] = useState(false)
  const { styles, theme } = useStyles()

  return (
    <>
      <ChatHeader
        className={styles.container}
        left={
          <ChatHeader.Title
            title={
              <Flexbox align={'center'} className={styles.title} gap={4} horizontal>
                <ActionIcon
                  color={theme.colorText}
                  icon={Menu}
                  onClick={() => setOpen(true)}
                  size={{ blockSize: 32, size: 18 }}
                />
                {title}
              </Flexbox>
            }
          />
        }
        styles={{
          left: {
            padding: 0,
          },
        }}
      />
      <Drawer
        getContainer={getContainer}
        onClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        open={open}
        placement={'left'}
        rootStyle={{ position: 'absolute' }}
        style={{
          background: theme.colorBgLayout,
          borderRight: `1px solid ${theme.colorSplit}`,
        }}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            justifyContent: 'space-between',
            padding: 16,
          },
          header: { display: 'none' },
          mask: { background: 'transparent' },
        }}
        width={260}
        zIndex={10}
      >
        {children}
        <BrandWatermark paddingInline={12} />
      </Drawer>
    </>
  )
})

export default Header
