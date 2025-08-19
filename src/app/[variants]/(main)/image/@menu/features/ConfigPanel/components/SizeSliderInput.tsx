import { SliderWithInput }
import { memo }

import { useGenerationConfigParam }

interface sizesliderinputprops {
  paramName: 'width' | 'height';
}

const SizeSliderInput = memo(({ paramName }: SizeSliderInputProps) => {
  const { value, setValue, min, max } = useGenerationConfigParam(paramName)
  return <SliderWithInput max={max} min={min} onChange={setValue} value={value} />
})

export default SizeSliderInput
