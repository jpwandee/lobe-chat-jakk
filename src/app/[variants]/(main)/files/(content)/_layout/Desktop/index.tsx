import { Flexbox }

import FilePanel from '@/features/FileSidePanel'

import { LayoutProps }
import Container from './Container';
import RegisterHotkeys from './RegisterHotkeys';

const Layout = ({ children, menu, modal }: LayoutProps) => {
  return (
    <>
      <Flexbox
        height={'100%'}
        horizontal
        style={{ maxWidth: '100%', overflow: 'hidden', position: 'relative' }}
        width={'100%'}
      >
        <FilePanel>{menu}</FilePanel>
        <Container>{children}</Container>
      </Flexbox>
      <RegisterHotkeys />
      {modal}
    </>
  );
};

Layout.displayName = 'DesktopFileLayout'

export default Layout
