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

export default function CreatePDF({
  id,
  onClose,
}: {
  id: string;
  onClose?: () => void;
}) {
  const [pdf, setPdf] = useState<{
    name: string;
    html: string;
  } | null>(null);

  useEffect(() => {
    async function create() {
      const result = await getProtocolById(id);
      if (!result.success) {
        console.error(result.error);
        return;
      }
      const { protocol } = result.data;
      const editor = createEditor();
      const state = editor.parseEditorState(protocol.serializedState);
      editor.setEditorState(state);

      editor.read(() => {
        setPdf({
          name: protocol.name,
          html: $generateHtmlFromNodes(editor, null),
        });
      });
    }
    create();
  }, [id]);

  const handleOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange} modal={true}>
      <DialogContent className="flex h-[95vh] w-[90vw] max-w-screen! flex-col justify-center gap-0 p-0">
        <DialogHeader className="p-4 pb-1">
          <DialogTitle>PDF Preview</DialogTitle>
          <DialogDescription>
            This is a preview of your document as a PDF.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <Viewer title={pdf?.name || 'Title'} html={pdf?.html} />
      </DialogContent>
    </Dialog>
  );
}
