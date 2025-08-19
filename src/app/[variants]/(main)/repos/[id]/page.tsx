import { PagePropsWithId }

import Client from './Client'

export default async (props: PagePropsWithId) => {
  const params = await props.params

  return <client id={params.id} />
}
