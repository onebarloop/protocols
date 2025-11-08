'use client';

import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

import { useProtocols } from '@/contexts/protocols-context';

import { Icon } from './icon';
import type { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';

import ProtocolActionDropdown from './protocol-action-dropdown';

export function SidebarItem({
  name,
  href,
  icon,
  children,
}: {
  name: string;
  href: string;
  icon: ReactNode;
  children?: ReactNode;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={href} prefetch={true}>
          {icon}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
      {children}
    </SidebarMenuItem>
  );
}

export function SidebarProtocolsList() {
  const { optimisticProtocols } = useProtocols();

  return (
    <>
      {optimisticProtocols.map((protocol) => (
        <SidebarProtocolItem key={protocol.id} protocol={protocol} />
      ))}
    </>
  );
}

function SidebarProtocolItem({
  protocol,
}: {
  protocol: ProtocolNavItemsQueryResult;
}) {
  const { id } = useParams();

  return (
    <SidebarMenuSubItem key={protocol.id}>
      <SidebarMenuSubButton
        asChild
        isActive={id === protocol.id}
        className="h-auto min-h-fit"
      >
        <div className="flex w-full items-center gap-0!">
          <Link
            className="flex min-w-0 grow items-center gap-2 p-1"
            href={`/protocols/${protocol.id}`}
            prefetch={true}
          >
            <Icon component={protocol.icon} className="size-4 shrink-0" />
            <span className="line-clamp-2 overflow-ellipsis">
              {protocol.name}
            </span>
          </Link>
          <ProtocolActionDropdown
            className="ml-auto shrink-0"
            protocol={protocol}
          />
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
