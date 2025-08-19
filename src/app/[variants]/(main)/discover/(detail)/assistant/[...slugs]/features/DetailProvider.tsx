'use client'

import { type ReactNode, createContext, memo, use }

import { DiscoverAssistantDetail }

export type DetailContextConfig = Partial<DiscoverAssistantDetail>

export const DetailContext = createContext<DetailContextConfig>({})

export const detailprovider = memo< { children: reactnode; config?: detailcontextconfig }
  ({ children, config = {} }) => {
    return <DetailContext value={config}>{children}</DetailContext>
  },
)

export const usedetailcontext = () => {
  return use(DetailContext)
}
