import { FC }

import InstantSwitch from '@/components/InstantSwitch'
import { useAiInfraStore }

interface switchprops {
  Component?: FC< { enabled: boolean; id: string }

  enabled: boolean;
  id: string;
}

const Switch = ({ id, Component, enabled }: SwitchProps) => {
  const [toggleProviderEnabled] = useAiInfraStore((s) => [s.toggleProviderEnabled]);

  // slot for cloud
  if (Component) return <Component enabled={enabled}
  id={id} />;

  return (
    <InstantSwitch
      enabled={enabled}
      onChange={async (checked) => {
        await toggleProviderEnabled(id, checked);
      }}
      size={'small'}
    />
  );
};

export default Switch
