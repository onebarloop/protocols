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
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { deleteProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';

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

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await deleteProtocol(protocol.id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <SidebarMenuSubItem key={protocol.id}>
      <SidebarMenuSubButton
        asChild
        isActive={id === protocol.id}
        className="h-auto min-h-fit"
      >
        <Link className="p-1" href={`/protocols/${protocol.id}`}>
          <span className="mr-1">{protocol.icon}</span>
          <span className="line-clamp-2">{protocol.name}</span>
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto h-6 w-6 p-0"
            onClick={handleClick}
          >
            <Trash />
          </Button>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
