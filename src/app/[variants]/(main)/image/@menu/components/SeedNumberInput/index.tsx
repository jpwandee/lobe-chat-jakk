'use client'

import { Button, InputNumber, Tooltip }
import { Dices }
import { CSSProperties, memo, useCallback }
import { useTranslation }
import { Flexbox }

import { MAX_SEED }
import { generateUniqueSeeds }

export interface seednumberinputprops {
  className?: string;
  onChange: (value: number | null | undefined) => void;
  placeholder?: string;
  style?: cssproperties;
  value?: number | null;
}

const SeedNumberInput = memo<SeedNumberInputProps>(
  ({ value, onChange, style, className, ...rest }) => {
    const { t } = useTranslation('image')

    const handleClick = useCallback(() => {
      const randomSeed = generateUniqueSeeds(1)[0]
      onChange?.(randomSeed)
    }, [onChange])

    return (
      <Flexbox className={className} gap={4} horizontal style={style}>
        <InputNumber
          max={MAX_SEED}
          min={0}
          onChange={onChange as any}
          placeholder={t('config.seed.random')}
          step={1}
          style={{ width: '100%' }}
          value={value}
          {...rest}
        />
        <Tooltip title={t('config.seed.random')}>
          <Button
            icon={Dices}
            onClick={handleClick}
            style={{ flex: 'none', width: 48 }}
            variant={'outlined'}
          />
        </Tooltip>
      </Flexbox>
    )
  },
)

export default SeedNumberInput
