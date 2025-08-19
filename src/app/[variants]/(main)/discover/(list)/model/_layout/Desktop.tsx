import { PropsWithChildren }
import { Flexbox }

import CategoryContainer from '../../../components/CategoryContainer';
import Category from '../features/Category';

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <Flexbox gap={24} horizontal style={{ position: 'relative' }} width={'100%'}>
      <CategoryContainer>
        <Category />
      </CategoryContainer>
      <Flexbox flex={1} gap={16}>
        {children}
      </Flexbox>
    </Flexbox>
  );
};

Layout.displayName = 'DesktopDiscoverModelsLayout'

export default Layout
