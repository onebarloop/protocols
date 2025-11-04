'use client';
import Editor from '../editor/editor';
import { useDocument } from '@/contexts/document-context';
import { SerializedEditorState, EditorState } from 'lexical';
import { useState, useEffect } from 'react';
import { Viewer } from './document';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';

type EditorWrapperProps = {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  editable?: boolean;
  className?: string;
};

export default function EditorWrapper(props: EditorWrapperProps) {
  const { protocolDispatch } = useDocument();
  const [html, setHtml] = useState<string | null>(null);
  const handleSerializedChange = (serializedState: SerializedEditorState) => {
    protocolDispatch({ type: 'setSerializedState', payload: serializedState });
  };

  return (
    <>
      <Editor
        setHtml={setHtml}
        {...props}
        onSerializedChange={handleSerializedChange}
      />
      <Dialog open={!!html} onOpenChange={() => setHtml(null)} modal={true}>
        <DialogContent className="flex h-[90vh] w-[90vw] max-w-screen! flex-col justify-center p-0">
          <Viewer html={html || undefined} />
        </DialogContent>
      </Dialog>
    </>
  );
}
