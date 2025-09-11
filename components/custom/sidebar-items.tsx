'use client';

import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useParams } from 'next/navigation';
import { Protocol } from '@/types/db-types';
import { ReactNode } from 'react';

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
        <Link href={href}>
          {icon}
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
      {children}
    </SidebarMenuItem>
  );
}

export function SidebarSubItem({ protocol }: { protocol: Protocol }) {
  const { id } = useParams();

  return (
    <SidebarMenuSubItem key={protocol.id}>
      <SidebarMenuSubButton asChild isActive={id === protocol.id}>
        <Link href={`/protocols/${protocol.id}`}>
          ❤️
          <span>{protocol.name}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
