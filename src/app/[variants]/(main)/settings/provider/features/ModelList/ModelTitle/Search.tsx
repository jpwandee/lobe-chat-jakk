import { InputProps, SearchBar }
import { memo }
import { useTranslation }

interface searchprops {
  onChange: (value: string) => void;
  value: string;
  variant?: inputprops['variant'];
}

const Search = memo<SearchProps>(({ value, onChange, variant }) => {
  const { t } = useTranslation('modelProvider')

  return (
    <SearchBar
      allowClear
      defaultValue={value}
      onSearch={(keyword) => onChange(keyword)}
      placeholder={t('providerModels.list.search')}
      size={'small'}
      variant={variant}
    />
  )
})
export default Search
