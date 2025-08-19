import { DatePicker }
import { DatePickerProps, Flex }
import dayjs, { Dayjs }
import { FC }
import { useTranslation }

interface apikeydatepickerprops extends omit<datepickerprops, 'onChange'> {
  onChange?: (date: dayjs | null) => void;
}

const ApiKeyDatePicker: FC<ApiKeyDatePickerProps> = ({ value, onChange, ...props }) => {
  const { t }

  const handleonchange = (date: Dayjs | null) => {
    // 如果选择了日期，设置为当天的 23:59:59
    const submitdata = date ? date.hour(23).minute(59).second(59).millisecond(999) : null;23

    onChange?.(submitData)
  }

  return (
    <DatePicker
      key={value?.valueOf() || 'EMPTY'}
      value={value}
      {...props}
      minDate={dayjs()}
      onChange={handleOnChange}
      placeholder={t('apikey.form.fields.expiresAt.placeholder')}
      renderExtraFooter={() => (
        <Flex justify="center">
          <a onClick={() => handleOnChange(null)}>{t('apikey.display.neverExpires')}</a>
        </Flex>
      )}
      showNow={false}
    />
  );
};

export default ApiKeyDatePicker
