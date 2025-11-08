'use client';

import Link from 'next/link';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useTransition, useState, lazy, Suspense } from 'react';
import { Button } from '../ui/button';
import { Trash, EllipsisVertical } from 'lucide-react';
import { deleteProtocol } from '@/dal/server-actions';
import { toast } from 'sonner';
import { useProtocols } from '@/contexts/protocols-context';
import { useSession } from '@/contexts/session-context';
import { Icon } from './icon';
import type { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CreatePDF = lazy(() => import('./create-pdf'));

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
            className="flex grow items-center gap-2 p-1"
            href={`/protocols/${protocol.id}`}
            prefetch={true}
          >
            <Icon component={protocol.icon} className="size-4" />
            <span className="line-clamp-2">{protocol.name}</span>
          </Link>
          <SidebarDropdown protocol={protocol} className="ml-auto" />
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

function SidebarDropdown({
  className,
  protocol,
}: {
  className?: string;
  protocol: ProtocolNavItemsQueryResult;
}) {
  const router = useRouter();
  const { user } = useSession();
  const { deleteProtocolOptimistic } = useProtocols();
  const [isPending, startTransition] = useTransition();
  const [showPDF, setShowPDF] = useState(false);
  const { id } = useParams();

  const handleDelete = () => {
    startTransition(async () => {
      deleteProtocolOptimistic(protocol.id);

      const result = await deleteProtocol(protocol.id);

      if (result.success) {
        toast.success(result.message);
        if (id === protocol.id) {
          router.push('/protocols');
        }
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={className}>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowPDF(true)}>
            Create PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={user.role === 'guest' || isPending}
            onSelect={handleDelete}
          >
            Delete Protocol
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showPDF && (
        <Suspense fallback={null}>
          <CreatePDF id={protocol.id} onClose={() => setShowPDF(false)} />
        </Suspense>
      )}
    </>
  );
}
