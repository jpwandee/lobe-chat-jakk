import { memo }
import { useTranslation }

import Statistic from '@/components/Statistic'
import StatisticCard from '@/components/StatisticCard'
import TitleWithPercentage from '@/components/StatisticCard/TitleWithPercentage'
import { useClientDataSWR }
import { messageService }
import { formatShortenNumber }
import { lastMonth }

import TotalCard from './ShareButton/TotalCard'

const totalwords = memo< { inShare?: boolean }>(({ inShare }) => {
  const { t } = useTranslation('auth')

  const { data, isLoading } = useClientDataSWR('stats-words', async () => ({
    count: await messageService.countWords(),
    prevCount: await messageService.countWords({ endDate: lastMonth().format('YYYY-MM-DD') }),
  }))

  if (inShare)
    return (
      <TotalCard count={formatShortenNumber(data?.prevCount) || '--'} title={t('stats.words')} />
    )

  return (
    <StatisticCard
      loading={isLoading || !data}
      statistic={{
        description: (
          <Statistic
            title={t('date.prevMonth')}
            value={formatShortenNumber(data?.prevCount) || '--'}
          />
        ),
        precision: 0,
        style: {
          fontWeight: 'bold',
        },
        value: formatShortenNumber(data?.count) || '--',
      }}
      title={
        <TitleWithPercentage
          count={data?.count}
          prvCount={data?.prevCount}
          title={t('stats.words')}
        />
      }
    />
  )
})

export default TotalWords
