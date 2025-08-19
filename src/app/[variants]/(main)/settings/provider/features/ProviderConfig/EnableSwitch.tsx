import { Skeleton }
import { createStyles }
import { FC }

import InstantSwitch from '@/components/InstantSwitch'
import { aiProviderSelectors, useAiInfraStore }

const useStyles = createStyles(({ css }) => ({
  switchLoading: css`
    width: 44px !important
    min-width: 44px !important
    height: 22px !important
    border-radius: 12px !important
  `,
}))

interface switchprops {
  Component?: FC< { id: string }

  id: string;
}

const Switch = ({ id, Component }: SwitchProps) => {
  const { styles }

  const [toggleProviderEnabled, enabled, isLoading] = useAiInfraStore((s) => [
    s.toggleProviderEnabled,
    aiProviderSelectors.isProviderEnabled(id)(s),
    aiProviderSelectors.isAiProviderConfigLoading(id)(s),
  ])

  if (isLoading) return <skeleton.Button active classname={styles.switchLoading}

  // slot for cloud
  if (Component) return <Component id={id} />;

  return (
    <InstantSwitch
      enabled={enabled}
      onChange={async (enabled) => {
        await toggleProviderEnabled(id as any, enabled);
      }}
    />
  );
};

export default Switch
