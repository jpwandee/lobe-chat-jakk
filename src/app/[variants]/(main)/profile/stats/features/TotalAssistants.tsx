import { useTheme }
import { memo }
import { useTranslation }

import Statistic from '@/components/Statistic'
import StatisticCard from '@/components/StatisticCard'
import TitleWithPercentage from '@/components/StatisticCard/TitleWithPercentage'
import { useClientDataSWR }
import { sessionService }
import { formatIntergerNumber }
import { lastMonth }

import TotalCard from './ShareButton/TotalCard'

const totalmessages = memo< { inShare?: boolean; mobile?: boolean }>(({ mobile, inShare }) => {
  const { t } = useTranslation('auth')
  const theme = useTheme()
  const { data, isLoading } = useClientDataSWR('stats-sessions', async () => ({
    count: await sessionService.countSessions(),
    prevCount: await sessionService.countSessions({ endDate: lastMonth().format('YYYY-MM-DD') }),
  }))

  if (inShare)
    return (
      <TotalCard
        count={formatIntergerNumber(data?.prevCount) || '--'}
        title={t('stats.assistants')}
      />
    )

  return (
    <StatisticCard
      highlight={mobile ? undefined : theme.purple}
      loading={isLoading || !data}
      statistic={{
        description: (
          <Statistic
            title={t('date.prevMonth')}
            value={formatIntergerNumber(data?.prevCount) || '--'}
          />
        ),
        precision: 0,
        value: data?.count || '--',
      }}
      title={
        <TitleWithPercentage
          count={data?.count}
          prvCount={data?.prevCount}
          title={t('stats.assistants')}
        />
      }
    />
  )
})

export default TotalMessages
