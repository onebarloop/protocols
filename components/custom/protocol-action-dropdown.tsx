'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTransition, useState, lazy, Suspense } from 'react';

import { EllipsisVertical } from 'lucide-react';
import { deleteProtocol } from '@/dal/server-actions';
import { toast } from 'sonner';
import { useProtocols } from '@/contexts/protocols-context';
import { useSession } from '@/contexts/session-context';
import type { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';
import type { Protocol } from '@/types/zod-schemas';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProtocolActionDropdown({
  className,
  align = 'end',
  protocolData,
  children,
}: {
  className?: string;
  align?: 'start' | 'center' | 'end';
  protocolData: ProtocolNavItemsQueryResult | Protocol;
  children?: React.ReactNode;
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
      deleteProtocolOptimistic(protocolData.id);

      const result = await deleteProtocol(protocolData.id);

      if (result.success) {
        toast.success(result.message);
        if (id === protocolData.id) {
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
        {children ? (
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        ) : (
          <DropdownMenuTrigger className={className}>
            <EllipsisVertical />
          </DropdownMenuTrigger>
        )}

        <DropdownMenuContent align={align}>
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
          <CreatePDF protocolData={protocolData} onClose={handlePDF} />
        </Suspense>
      )}
    </>
  );
}
