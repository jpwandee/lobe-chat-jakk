'use client'

import { type ReactNode, createContext, memo, use }

import { DiscoverModelDetail }

export type DetailContextConfig = Partial<DiscoverModelDetail>

export const DetailContext = createContext<DetailContextConfig>({})

export const detailprovider = memo< { children: reactnode; config?: detailcontextconfig }
  ({ children, config = {} }) => {
    return <DetailContext value={config}>{children}</DetailContext>
  },
)

export const usedetailcontext = () => {
  return use(DetailContext)
}
