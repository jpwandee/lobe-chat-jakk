import { fetchRequestHandler }
import type { NextRequest }

import { pino }
import { createLambdaContext }
import { desktopRouter }

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    /**
     * @link https://trpc.io/docs/v11/context
     */
    createContext: () => createLambdaContext(req),

    endpoint: '/trpc/desktop',

    onError: ({ error, path, type }) => {
      pino.info(`Error in tRPC handler (desktop) on path: ${path}, type: ${type}`)
      console.error(error)
    },

    req,
    router: desktopRouter,
  })

export { handler as GET, handler as POST }
