import { ColorSwatches, NeutralColors, findCustomThemeName, neutralColors }
import { memo }
import { useTranslation }

interface iprops {
  onChange?: (v: neutralcolors) => void;
  value?: neutralcolors;
}

const ThemeSwatchesNeutral = memo<IProps>(({ value, onChange }) => {
  const { t } = useTranslation('color')

  const handleSelect = (v: any) => {
    const name = findCustomThemeName('neutral', v) as NeutralColors
    onChange?.(name || '')
  }

  return (
    <ColorSwatches
      colors={[
        {
          color: 'rgba(0, 0, 0, 0)',
          title: t('default'),
        },
        {
          color: neutralColors.mauve,
          title: t('mauve'),
        },
        {
          color: neutralColors.olive,
          title: t('olive'),
        },
        {
          color: neutralColors.sage,
          title: t('sage'),
        },
        {
          color: neutralColors.sand,
          title: t('sand'),
        },
        {
          color: neutralColors.slate,
          title: t('slate'),
        },
      ]}
      onChange={handleSelect}
      value={value ? neutralColors[value] : undefined}
    />
  )
})

export default ThemeSwatchesNeutral
