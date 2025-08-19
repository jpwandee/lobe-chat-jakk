'use client'

import { Text }
import { createStyles }
import react, { memo }
import { Center }

interface clientprops {
  error: {
    message: string;
    title: string;
  };
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 100%
    min-height: 100vh
    color: ${token.colorTextBase}
    background-color: ${token.colorBgLayout}
  `,
  error: css`
    text-align: center
  `,
}))

const ConsentClientError = memo<ClientProps>(({ error }) => {
  const { styles } = useStyles()

  return (
    <Center className={styles.container}>
      <div className={styles.error}>
        <Text as={'h2'} style={{ color: 'inherit' }}>
          {error.title}
        </Text>
        <Text style={{ color: 'inherit' }}>{error.message}</Text>
      </div>
    </Center>
  )
})

ConsentClientError.displayName = 'ConsentClientError'

export default ConsentClientError
