'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/lib/context/document-context';
import { saveNewProtocol, updateProtocol } from '@/lib/dal/mutations';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { isExistingProtocol } from '@/types/typeguard';

export default function SaveDocumentButton() {
  const { protocolState } = useDocument();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      let result;
      if (isExistingProtocol(protocolState)) {
        result = await updateProtocol(protocolState);
      } else {
        result = await saveNewProtocol(protocolState);
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
