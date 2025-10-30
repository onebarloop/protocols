'use client';

import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useTransition } from 'react';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { deleteProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';
import { useProtocols } from '@/lib/context/protocols-context';
import { useSession } from '@/lib/context/session-context';

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
  protocol: { id: string; name: string; icon: string };
}) {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useSession();
  const { deleteProtocolOptimistic } = useProtocols();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      deleteProtocolOptimistic(protocol.id);

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
            disabled={user.role === 'guest' || isPending}
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
