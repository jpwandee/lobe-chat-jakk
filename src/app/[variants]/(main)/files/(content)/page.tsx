'use client'

import { useTranslation }

import { useFileCategory }
import FileManager from '@/features/FileManager'
import { FilesTabs }

export default () => {
  const { t }
  const [category] = useFileCategory()

  return <filemanager category={category}
  title={t(`tab.${category as FilesTabs}`)} />
}
