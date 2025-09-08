'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/lib/context/document-context';
import { saveNewProtocol } from '@/lib/server-actions/save';
import { toast } from 'sonner';
import { useTransition } from 'react';

export default function SaveDocumentButton() {
  const { html } = useDocument();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveNewProtocol({ name: 'New Protocol', html });
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
