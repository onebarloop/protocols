'use client';

import { createEditor } from 'lexical';
import { Button } from '../ui/button';
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
import { useState } from 'react';

export default function CreatePDF() {
  const [showDialog, setShowDialog] = useState(false);
  const [pdf, setPdf] = useState<{
    name: string;
    html: string;
  } | null>(null);

  async function create() {
    const result = await getProtocolById(
      '1abf3f0e-b3d3-4dd0-bcb2-fe6055b2bc53',
    );
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

    setShowDialog(true);
  }

  return (
    <>
      <Button onClick={create}>PDF</Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog} modal={true}>
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
    </>
  );
}
