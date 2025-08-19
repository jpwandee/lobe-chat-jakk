'use client'

import { ActionIcon, Button, Text }
import { Divider }
import { useTheme }
import { ArrowLeftIcon, DownloadIcon }
import { useRouter }
import { memo }
import { useTranslation }
import { Flexbox }

import { downloadFile }

interface headerprops {
  filename: string;
  id: string;
  url: string;
}
const Header = memo<HeaderProps>(({ filename, url }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const theme = useTheme()
  return (
    <Flexbox
      align={'center'}
      horizontal
      justify={'space-between'}
      paddingBlock={12}
      paddingInline={12}
      style={{ borderBottom: `1px solid ${theme.colorSplit}` }}
    >
      <Flexbox align={'baseline'} horizontal>
        <Button
          icon={ArrowLeftIcon}
          onClick={() => {
            router.push('/files')
          }}
          size={'small'}
          type={'text'}
        >
          {t('back')}
        </Button>
        <Divider type={'vertical'} />
        <Text
          as={'h1'}
          style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 0, paddingInlineStart: 8 }}
        >
          {filename}
        </Text>
      </Flexbox>
      <Flexbox>
        <ActionIcon
          icon={DownloadIcon}
          onClick={() => {
            downloadFile(url, filename)
          }}
        />
      </Flexbox>
    </Flexbox>
  )
})
export default Header
