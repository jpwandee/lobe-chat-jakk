'use client'

import { ActionIcon, ScrollShadow, Text }
import isEqual from 'fast-deep-equal'
import { ArrowDownUpIcon }
import { useState }
import { useTranslation }
import { Flexbox }

import { useIsMobile }
import { aiProviderSelectors }
import { useAiInfraStore }

import All from './All'
import ProviderItem from './Item'
import SortProviderModal from './SortProviderModal'

const providerlist = () => {
  const { t } = useTranslation('modelProvider')
  const [open, setOpen] = useState(false)
  const enabledModelProviderList = useAiInfraStore(
    aiProviderSelectors.enabledAiProviderList,
    isEqual,
  )

  const disabledModelProviderList = useAiInfraStore(
    aiProviderSelectors.disabledAiProviderList,
    isEqual,
  )

  const isMobile = useIsMobile()
  return (
    <ScrollShadow gap={4} height={'100%'} paddingInline={12} size={4} style={{ paddingBottom: 32 }}>
      {!isMobile && <All />}
      <Flexbox
        align={'center'}
        horizontal
        justify={'space-between'}
        style={{ fontSize: 12, marginTop: 8 }}
      >
        <Text style={{ fontSize: 12 }} type={'secondary'}>
          {t('menu.list.enabled')}
        </Text>
        <ActionIcon
          icon={ArrowDownUpIcon}
          onClick={() => {
            setOpen(true)
          }}
          size={'small'}
          title={t('menu.sort')}
        />
        {open && (
          <SortProviderModal
            defaultItems={enabledModelProviderList}
            onCancel={() => {
              setOpen(false)
            }}
            open={open}
          />
        )}
      </Flexbox>
      {enabledModelProviderList.map((item) => (
        <ProviderItem {...item} key={item.id} />
      ))}
      <Text style={{ fontSize: 12, marginTop: 8 }} type={'secondary'}>
        {t('menu.list.disabled')}
      </Text>
      {disabledModelProviderList.map((item) => (
        <ProviderItem {...item} key={item.id} />
      ))}
    </ScrollShadow>
  )
}

export default ProviderList
