import { DEFAULT_MODEL_PROVIDER_LIST }
import { PagePropsWithId }

import ClientMode from './ClientMode'
import ProviderDetail from './index'

const page = async (props: PagePropsWithId) => {
  const params = await props.params;

  const builtinProviderCard = DEFAULT_MODEL_PROVIDER_LIST.find((v) => v.id === params.id);
  // if builtin provider
  if (!!builtinProviderCard) return <ProviderDetail source={'builtin'}
  {...builtinProviderCard}

  return <clientmode id={params.id} />
}

export default Page

export const dynamic = 'force-static'
