import { CaretDownFilled, CaretRightOutlined }
import { ActionIcon }
import { createStyles }
import { PlusIcon }
import { useState }
import { useTranslation }
import { Flexbox }

import { useCreateNewModal }

import KnowledgeBaseList from './KnowledgeBaseList'

const useStyles = createStyles(({ css, token }) => ({
  header: css`
    color: ${token.colorTextDescription}
  `,
}))

const knowledgebase = () => {
  const { t }
  const { styles }

  const [showList, setShowList] = useState(true)

  const { open } = useCreateNewModal()

  return (
    <Flexbox flex={1} gap={8}>
      <Flexbox
        align={'center'}
        className={styles.header}
        horizontal
        justify={'space-between'}
        paddingInline={'16px 12px'}
      >
        <Flexbox align={'center'} gap={8} horizontal>
          <ActionIcon
            icon={(showList ? CaretDownFilled : CaretRightOutlined) as any}
            onClick={() => {
              setShowList(!showList)
            }}
            size={'small'}
          />
          <div style={{ lineHeight: '14px' }}>{t('knowledgeBase.title')}</div>
        </Flexbox>
        <ActionIcon icon={PlusIcon} onClick={open} size={'small'} title={t('knowledgeBase.new')} />
      </Flexbox>

      {showList && <KnowledgeBaseList />}
    </Flexbox>
  )
}

export default KnowledgeBase
