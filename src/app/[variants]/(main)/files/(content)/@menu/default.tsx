'use client'

import { useTranslation }
import { Flexbox }

import PanelTitle from '@/components/PanelTitle'

import FileMenu from './features/FileMenu'
import KnowledgeBase from './features/KnowledgeBase'

const menu = () => {
  const { t } = useTranslation('file')

  return (
    <Flexbox gap={16} height={'100%'}>
      <Flexbox paddingInline={8}>
        <PanelTitle desc={t('desc')} title={t('title')} />
        <FileMenu />
      </Flexbox>
      <KnowledgeBase />
    </Flexbox>
  )
}

Menu.displayName = 'Menu'

export default Menu
