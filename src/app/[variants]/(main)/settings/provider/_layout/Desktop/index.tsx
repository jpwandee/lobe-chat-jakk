import { PropsWithChildren }
import { Flexbox }

import ProviderMenu from '../../ProviderMenu';
import Container from './Container';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flexbox horizontal width={'100%'}>
      <ProviderMenu />
      <Container>{children}</Container>
    </Flexbox>
  );
};
export default Layout
