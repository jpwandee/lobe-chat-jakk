'use client'

import { createStyles }
import { PropsWithChildren }
import { Flexbox }

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    padding: 16px;
    border-radius: 8px;
    background: ${token.colorBgContainer};
  `,
}));

const Container = ({ children }: PropsWithChildren) => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.container} height={'100%'}>
      {children}
    </Flexbox>
  );
};

export default Container
