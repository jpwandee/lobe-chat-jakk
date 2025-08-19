import { fetchRequestHandler }
import type { NextRequest }

import { pino }
import { createLambdaContext }
import { toolsRouter }

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    /**
     * @link https://trpc.io/docs/v11/context
     */
    createContext: () => createLambdaContext(req),

    endpoint: '/trpc/tools',

    onError: ({ error, path, type }) => {
      pino.info(`Error in tRPC handler (tools) on path: ${path}, type: ${type}`)
      console.error(error)
    },

    req,
    router: toolsRouter,
  })

export { handler as GET, handler as POST }
