import { BarList }
import { ActionIcon, Avatar, FormGroup, Modal }
import { MaximizeIcon }
import Link from 'next/link'
import { useRouter }
import qs from 'query-string'
import { memo, useState }
import { useTranslation }
import { Flexbox }

import { FORM_STYLE }
import { DEFAULT_AVATAR }
import { INBOX_SESSION_ID }
import { useClientDataSWR }
import { sessionService }
import { SessionRankItem }

export const assistantsrank = memo< { mobile?: boolean }>(({ mobile }) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['auth', 'chat'])
  const router = useRouter()
  const { data, isLoading } = useClientDataSWR('rank-sessions', async () =>
    sessionService.rankSessions(),
  )

  const showExtra = Boolean(data && data?.length > 5)

  const mapData = (item: SessionRankItem) => {
    const link = qs.stringifyUrl({
      query: {
        session: item.id,
        ...(mobile ? { showMobileWorkspace: true } : {}),
      },
      url: '/chat',
    })

    return {
      icon: (
        <Avatar
          alt={item.title || t('defaultAgent', { ns: 'chat' })}
          avatar={item.avatar || DEFAULT_AVATAR}
          background={item.backgroundColor || undefined}
          size={28}
          style={{
            backdropFilter: 'blur(8px)',
          }}
        />
      ),
      link,
      name: (
        <Link href={link} style={{ color: 'inherit' }}>
          {item.title
            ? item.id === INBOX_SESSION_ID
              ? t('inbox.title', { ns: 'chat' })
              : item.title
            : t('defaultAgent', { ns: 'chat' })}
        </Link>
      ),
      value: item.count,
    }
  }

  return (
    <>
      <FormGroup
        extra={
          showExtra && (
            <ActionIcon
              icon={MaximizeIcon}
              onClick={() => setOpen(true)}
              size={{ blockSize: 28, size: 20 }}
            />
          )
        }
        style={FORM_STYLE.style}
        title={t('stats.assistantsRank.title')}
        variant={'borderless'}
      >
        <Flexbox paddingBlock={16}>
          <BarList
            data={data?.slice(0, 5).map((item) => mapData(item)) || []}
            height={220}
            leftLabel={t('stats.assistantsRank.left')}
            loading={isLoading || !data}
            noDataText={{
              desc: t('stats.empty.desc'),
              title: t('stats.empty.title'),
            }}
            onValueChange={(item) => router.push(item.link)}
            rightLabel={t('stats.assistantsRank.right')}
          />
        </Flexbox>
      </FormGroup>
      {showExtra && (
        <Modal
          footer={null}
          loading={isLoading || !data}
          onCancel={() => setOpen(false)}
          open={open}
          title={t('stats.assistantsRank.title')}
        >
          <BarList
            data={data?.map((item) => mapData(item)) || []}
            height={340}
            leftLabel={t('stats.assistantsRank.left')}
            loading={isLoading || !data}
            onValueChange={(item) => router.push(item.link)}
            rightLabel={t('stats.assistantsRank.right')}
          />
        </Modal>
      )}
    </>
  )
})

export default AssistantsRank
