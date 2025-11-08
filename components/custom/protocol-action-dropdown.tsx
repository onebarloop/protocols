'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTransition, useState, lazy, Suspense } from 'react';

import { EllipsisVertical } from 'lucide-react';
import { deleteProtocol } from '@/dal/server-actions';
import { toast } from 'sonner';
import { useProtocols } from '@/contexts/protocols-context';
import { useSession } from '@/contexts/session-context';
import type { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function ProtocolActionDropdown({
  className,
  protocol,
}: {
  className?: string;
  protocol: ProtocolNavItemsQueryResult;
}) {
  const router = useRouter();
  const { user } = useSession();
  const { id } = useParams();
  const { deleteProtocolOptimistic } = useProtocols();
  const [isPending, startTransition] = useTransition();
  const [showPDF, setShowPDF] = useState(false);
  const CreatePDF = lazy(() => import('./create-pdf'));

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

  const handlePDF = () => {
    setShowPDF(!showPDF);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('', className)}>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handlePDF}>Create PDF</DropdownMenuItem>
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
          <CreatePDF id={protocol.id} onClose={handlePDF} />
        </Suspense>
      )}
    </>
  );
}
