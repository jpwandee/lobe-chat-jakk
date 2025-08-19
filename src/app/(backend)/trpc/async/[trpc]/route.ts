import { fetchRequestHandler }
import type { NextRequest }

import { pino }
import { createAsyncRouteContext }
import { asyncRouter }

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    // 避免请求之间互相影响
    // https://github.com/lobehub/lobe-chat/discussions/7442#discussioncomment-13658563
    allowBatching: false,

    /**
     * @link https://trpc.io/docs/v11/context
     */
    createContext: () => createAsyncRouteContext(req),

    endpoint: '/trpc/async',

    onError: ({ error, path, type }) => {
      pino.info(`Error in tRPC handler (async) on path: ${path}, type: ${type}`)
      console.error(error)
    },

    req,
    router: asyncRouter,
  })

export { handler as GET, handler as POST }
