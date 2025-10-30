'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/contexts/document-context';
import { addProtocol, updateProtocol } from '@/dal/mutations';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { isExistingProtocol } from '@/types/helpers';
import { useProtocols } from '@/contexts/protocols-context';
import { createRandomName } from '@/utils';

export default function SaveDocumentButton() {
  const { protocolState } = useDocument();
  const { addProtocolOptimistic, updateProtocolOptimistic } = useProtocols();
  const [_isPending, startTransition] = useTransition();

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
        const name =
          protocolState.name === '' || protocolState.name === 'New Protocol'
            ? createRandomName({ type: 'animals' })
            : protocolState.name;
        addProtocolOptimistic({
          id: `temp-${Date.now()}`,
          name: name,
          icon: protocolState.icon || '🧪',
        });
        result = await addProtocol({ ...protocolState, name });
      }

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button variant="outline" onClick={handleSave}>
      Save
    </Button>
  );
}
