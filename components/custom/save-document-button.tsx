'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/lib/context/document-context';
import { saveNewProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';
import { use, useTransition } from 'react';

export default function SaveDocumentButton() {
  const { protocolState } = useDocument();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveNewProtocol(protocolState);
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
