'use client'

import { SearchBar }
import { useTheme }
import { ReactNode, memo }
import { useTranslation }
import { Flexbox }

import { useAiInfraStore }

import AddNew from './AddNew'
import ProviderList from './List'
import SearchResult from './SearchResult'
import SkeletonList from './SkeletonList'

interface providermenuprops {
  children: reactnode;
  mobile?: boolean;
}
const Layout = memo(({ children, mobile }: ProviderMenuProps) => {
  const { t } = useTranslation('modelProvider')
  const theme = useTheme()

  const [providerSearchKeyword, useFetchAiProviderList] = useAiInfraStore((s) => [
    s.providerSearchKeyword,
    s.useFetchAiProviderList,
    s.initAiProviderList,
  ])

  useFetchAiProviderList()

  const width = mobile ? undefined : 280
  return (
    <Flexbox
      style={{
        background: theme.colorBgLayout,
        borderRight: `1px solid ${theme.colorBorderSecondary}`,
        minWidth: width,
        overflow: mobile ? undefined : 'scroll',
      }}
      width={width}
    >
      <Flexbox
        gap={8}
        horizontal
        justify={'space-between'}
        padding={'16px 12px 12px'}
        style={{
          background: theme.colorBgLayout,
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
        width={'100%'}
      >
        <SearchBar
          allowClear
          onChange={(e) => useAiInfraStore.setState({ providerSearchKeyword: e.target.value })}
          placeholder={t('menu.searchProviders')}
          style={{ width: '100%' }}
          value={providerSearchKeyword}
          variant={'filled'}
        />
        <AddNew />
      </Flexbox>
      {children}
    </Flexbox>
  )
})

const content = () => {
  const [initAiProviderList, providerSearchKeyword] = useAiInfraStore((s) => [
    s.initAiProviderList,
    s.providerSearchKeyword,
  ])

  // loading
  if (!initAiProviderList) return <SkeletonList />

  // search
  if (!!providerSearchKeyword) return <SearchResult />

  // default
  return <ProviderList />
}

const ProviderMenu = ({ mobile }: { mobile?: boolean }) => (
  <Layout mobile={mobile}>
    <Content />
  </Layout>
)

export default ProviderMenu
