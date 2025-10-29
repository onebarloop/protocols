'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/lib/context/document-context';
import { addProtocol, updateProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { isExistingProtocol } from '@/types/helpers';
import { useRouter } from 'next/navigation';
import { useProtocols } from '@/lib/context/protocols-context';

export default function SaveDocumentButton() {
  const router = useRouter();
  const { protocolState } = useDocument();
  const { addProtocolOptimistic, updateProtocolOptimistic } = useProtocols();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      let result;
      const isUpdate = isExistingProtocol(protocolState);

      if (isUpdate) {
        updateProtocolOptimistic({
          id: protocolState.id,
          name: protocolState.name,
          icon: protocolState.icon,
        });

        result = await updateProtocol(protocolState);
      } else {
        result = await addProtocol(protocolState);

        if (result.success && result.protocolId) {
          addProtocolOptimistic({
            id: result.protocolId,
            name: protocolState.name,
            icon: protocolState.icon || '🧪',
          });
        }
      }

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button variant="outline" disabled={isPending} onClick={handleSave}>
      Save
    </Button>
  );
}
