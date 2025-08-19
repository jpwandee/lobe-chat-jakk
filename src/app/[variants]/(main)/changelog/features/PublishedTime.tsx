'use client'

import { createStyles }
import dayjs from 'dayjs'
import 'dayjs/locale/zh.js'
import { CSSProperties, FC }
import { useTranslation }

const useStyles = createStyles(({ css, token }) => {
  return {
    time: css`
      margin-block: calc(var(--lobe-markdown-margin-multiple) * 1em)

      font-size: 14px
      line-height: var(--lobe-markdown-line-height)
      color: ${token.colorTextSecondary}
      letter-spacing: 0.02em
    `,
  }
})

interface privacyupdatedprops {
  className?: string;
  date: string;
  style?: cssproperties;
  template?: string;
}
const PublishedTime: FC<PrivacyUpdatedProps> = ({
date = new Date().toISOString(),
style,
className,
template = 'dddd, MMMM D YYYY',
}) => {
  const { i18n }
  const { styles, cx } = useStyles();
  const time = dayjs(date).locale(i18n.language).format(template);

  return (
    <time
      aria-label={'published-date'}
      className={cx(styles.time, className)}
      dateTime={time}
      style={style}
    >
      {time}
    </time>
  );
};

export default PublishedTime
