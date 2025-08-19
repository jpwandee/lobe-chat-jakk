import { redirect }

import { PagePropsWithId }

export default async (props: PagePropsWithId) => {
  const params = await props.params

  return redirect(`/repos/${params.id}/evals/dataset`)
}
