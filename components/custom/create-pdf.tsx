'use client';

import { createEditor } from 'lexical';
import { getProtocolById } from '@/lib/dal/server-actions';
import { $generateHtmlFromNodes } from '@lexical/html';
import { Viewer } from './document';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Protocol } from '@/types/zod-schemas';
import { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';
import { hasSerializedState } from '@/types/helpers';

export default function CreatePDF({
  protocolData,
  onClose,
}: {
  protocolData: Protocol | ProtocolNavItemsQueryResult;
  onClose?: () => void;
}) {
  const [pdf, setPdf] = useState<{
    name: string;
    html: string;
  } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function create() {
      let protocol: Protocol | null = null;
      if (hasSerializedState(protocolData)) {
        protocol = protocolData;
      } else {
        const result = await getProtocolById(protocolData.id);
        if (!result.success) {
          console.error(result.error);
          toast.error(result.error);
          return;
        }
        const { protocol: protocolResult } = result.data;
        protocol = protocolResult;
      }
      const editor = createEditor();
      const state = editor.parseEditorState(protocol.serializedState);
      editor.setEditorState(state);

      editor.read(() => {
        setPdf({
          name: protocol.name,
          html: $generateHtmlFromNodes(editor, null),
        });
      });
      setOpen(true);
    }
    create();
  }, [protocolData]);

  const handleOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={true}>
      <DialogContent className="flex h-[95vh] w-[90vw] max-w-screen! flex-col justify-center gap-0 p-0">
        <DialogHeader className="p-4 pb-1">
          <DialogTitle>PDF Preview</DialogTitle>
          <DialogDescription>
            This is a preview of your document as a PDF.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        {pdf ? (
          <Viewer title={pdf.name} html={pdf.html} />
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center">
            Loading PDF preview...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
