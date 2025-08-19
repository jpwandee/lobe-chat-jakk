import { fetchRequestHandler }
import type { NextRequest }

import { pino }
import { createLambdaContext }
import { lambdaRouter }

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    /**
     * @link https://trpc.io/docs/v11/context
     */
    createContext: () => createLambdaContext(req),

    endpoint: '/trpc/lambda',

    onError: ({ error, path, type }) => {
      pino.info(`Error in tRPC handler (lambda) on path: ${path}, type: ${type}`)
      console.error(error)
    },

    req,
    responseMeta({ ctx }) {
      const headers = ctx?.resHeaders

      return { headers }
    },
    router: lambdaRouter,
  })

export { handler as GET, handler as POST }
