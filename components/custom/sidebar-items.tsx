'use client';

import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useOptimistic, useTransition } from 'react';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { deleteProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';
import { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';

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

export function SidebarProtocolsList({
  initialProtocols,
}: {
  initialProtocols: ProtocolNavItemsQueryResult[];
}) {
  const [optimisticProtocols, setOptimisticProtocols] = useOptimistic(
    initialProtocols,
    (state, deletedId: string) => state.filter((p) => p.id !== deletedId),
  );

  return (
    <>
      {optimisticProtocols.map((protocol) => (
        <SidebarProtocolItem
          key={protocol.id}
          protocol={protocol}
          onDelete={setOptimisticProtocols}
        />
      ))}
    </>
  );
}

function SidebarProtocolItem({
  protocol,
  onDelete,
}: {
  protocol: ProtocolNavItemsQueryResult;
  onDelete: (id: string) => void;
}) {
  const { id } = useParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      onDelete(protocol.id);

      const result = await deleteProtocol(protocol.id);

      if (result.success) {
        toast.success(result.message);
        if (id === protocol.id) {
          router.push('/protocols');
        }
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <SidebarMenuSubItem key={protocol.id}>
      <SidebarMenuSubButton
        asChild
        isActive={id === protocol.id}
        className="h-auto min-h-fit"
      >
        <Link
          className="p-1"
          href={`/protocols/${protocol.id}`}
          prefetch={true}
        >
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
