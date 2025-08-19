'use client'

import { Modal }
import { createStyles }
import { PropsWithChildren }
import { useTranslation }
import { Flexbox }

import { PortalHeader }
import { useChatStore }

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    background: linear-gradient(${token.colorBgElevated}, ${token.colorBgLayout}) !important;
  `,
}));

const Layout = ({ children }: PropsWithChildren) => {
  const { styles, cx }
  const [showMobilePortal, isPortalThread, togglePortal] = useChatStore((s) => [
    s.showPortal,
    !!s.portalThreadId,
    s.togglePortal,
  ])
  const { t } = useTranslation('portal');

  return (
    <Modal
      allowFullscreen
      className={cx(isPortalThread && styles.container)}
      footer={null}
      height={'95%'}
      onCancel={() => togglePortal(false)}
      open={showMobilePortal}
      styles={{
        body: { padding: 0 },
        header: { display: 'none' },
      }}
      title={t('title')}
    >
      <PortalHeader />
      <Flexbox
        gap={8}
        height={'calc(100% - 52px)'}
        padding={'0 8px'}
        style={{ overflow: 'hidden' }}
      >
        <Flexbox
          height={'100%'}
          style={{ marginInline: -8, overflow: 'hidden', position: 'relative' }}
          width={'calc(100% + 16px)'}
        >
          {children}
        </Flexbox>
      </Flexbox>
    </Modal>
  );
};

export default Layout
