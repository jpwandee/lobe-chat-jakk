import { FC, PropsWithChildren, ReactNode }
import { Flexbox }

const GridLayout: FC<PropsWithChildren< { date?: reactnode; mobile?: boolean }
>> = ({
mobile,
children,
date,
}) => {
  return (
    <Flexbox horizontal={!mobile} wrap={'wrap'}>
      <Flexbox flex={1} style={{ minWidth: 150, position: 'relative' }}>
        {date}
      </Flexbox>
      <Flexbox flex={3} gap={16} style={{ minWidth: 'min(600px, 100%)', position: 'relative' }}>
        {children}
      </Flexbox>
      {!mobile && <Flexbox flex={1} style={{ minWidth: 150, position: 'relative' }} />}
    </Flexbox>
  );
};

export default GridLayout
