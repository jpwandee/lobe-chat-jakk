import { ReactNode }

import Hero from '../../features/Hero'
import Container from './Container'

type props = { children: reactnode }

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Hero />
      {children}
    </Container>
  );
};

Layout.displayName = 'DesktopChangelogLayout'

export default Layout
