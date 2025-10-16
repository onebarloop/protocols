'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/lib/context/document-context';
import { updateProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';
import { useTransition } from 'react';
import type { Protocol } from '@/types/db-types';

export default function SaveDocumentButton() {
  const { protocolState } = useDocument<Protocol>();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateProtocol(protocolState);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  return (
    <Button variant="secondary" disabled={isPending} onClick={handleSave}>
      Save
    </Button>
  );
}
