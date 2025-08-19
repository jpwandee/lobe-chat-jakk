import { fetchRequestHandler }
import type { NextRequest }

import { pino }
import { createEdgeContext }
import { edgeRouter }

export const runtime = 'edge'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    /**
     * @link https://trpc.io/docs/v11/context
     */
    createContext: () => createEdgeContext(req),

    endpoint: '/trpc/edge',

    onError: ({ error, path }) => {
      pino.info(`Error in tRPC handler (edge) on path: ${path}`)
      console.error(error)
    },

    req,
    router: edgeRouter,
  })

export { handler as GET, handler as POST }
