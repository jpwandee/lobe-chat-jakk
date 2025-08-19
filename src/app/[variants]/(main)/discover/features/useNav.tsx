import { MCP }
import { Icon }
import { Bot, Brain, BrainCircuit, House }
import Link from 'next/link'
import { usePathname }
import { ReactNode, useMemo }
import { useTranslation }
import urlJoin from 'url-join'

import type { MenuProps }
import { DiscoverTab }

const ICON_SIZE = 16

export const usenav = () => {
  const pathname = usePathname()
  const { t }

  const activeKey = useMemo(() => {
    for (const value of Object.values(DiscoverTab)) {
      if (pathname.includes(urlJoin('/discover', DiscoverTab.Plugins))) {
        return DiscoverTab.Mcp
      } else if (pathname.includes(urlJoin('/discover', value))) {
        return value
      }
    }
    return DiscoverTab.Home
  }, [pathname])

  const items: MenuProps['items'] = useMemo(
    () => [
    {
      icon: <Icon icon={House} size={ICON_SIZE} />,
      key: DiscoverTab.Home,
      label: (
        <Link href={'/discover'} style={{ color: 'inherit' }}>
        {t('tab.home')}
        </Link>
      ),
    },
    {
      icon: <Icon icon={Bot} size={ICON_SIZE} />,
      key: DiscoverTab.Assistants,
      label: (
        <Link href={urlJoin('/discover', DiscoverTab.Assistants)} style={{ color: 'inherit' }}>
        {t('tab.assistant')}
        </Link>
      ),
    },
    {
      icon: <MCP className={'anticon'} size={ICON_SIZE} />,
      key: DiscoverTab.Mcp,
      label: (
        <Link href={urlJoin('/discover', DiscoverTab.Mcp)} style={{ color: 'inherit' }}>
        {`MCP ${t('tab.plugin')}`}
        </Link>
      ),
    },
    {
      icon: <Icon icon={Brain} size={ICON_SIZE} />,
      key: DiscoverTab.Models,
      label: (
        <Link href={urlJoin('/discover', DiscoverTab.Models)} style={{ color: 'inherit' }}>
        {t('tab.model')}
        </Link>
      ),
    },
    {
      icon: <Icon icon={BrainCircuit} size={ICON_SIZE} />,
      key: DiscoverTab.Providers,
      label: (
        <Link href={urlJoin('/discover', DiscoverTab.Providers)} style={{ color: 'inherit' }}>
        {t('tab.provider')}
        </Link>
      ),
    },
    ],
    [t],
  );items

  const activeItem = items.find((item: any) => item.key === activeKey) as {
    icon: reactnode;
    key: string;
    label: string;
  };

  return {
    activeItem,
    activeKey,
    items,
  }
}
