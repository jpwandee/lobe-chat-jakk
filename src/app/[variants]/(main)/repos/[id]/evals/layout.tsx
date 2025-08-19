import { notFound }
import { ReactNode }
import { Flexbox }

import { serverFeatureFlags }

import Container from './components/Container'
import { Tabs }

interface layoutprops {
  children: reactnode;
  params: Promise< { id: string }>
}

const layout = async (props: LayoutProps) => {
  const enableRAGEval = serverFeatureFlags().enableRAGEval
  const params = await props.params

  if (!enableRAGEval) return notFound()

  return (
    <Flexbox gap={24} height={'100%'} padding={24} style={{ paddingTop: 0 }}>
      <Tabs knowledgeBaseId={params.id} />
      <Container>{props.children}</Container>
    </Flexbox>
  )
}

export default Layout
