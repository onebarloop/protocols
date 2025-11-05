'use client';

import { createEditor } from 'lexical';
import { Button } from '../ui/button';
import { getProtocolClient } from '@/lib/dal/queries';
import { $generateHtmlFromNodes } from '@lexical/html';

export default function CreatePDF() {
  async function create() {
    const protocol = await getProtocolClient(
      'e93002a3-b219-4e27-92cb-95c870c20a5b',
    );
    if (!protocol) {
      console.error('Protocol not found');
      return;
    }
    const editor = createEditor();
    const state = editor.parseEditorState(protocol?.serializedState);
    editor.setEditorState(state);

    editor.read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      console.log(html);
    });
  }

  return <Button onClick={() => create()}>PDF</Button>;
}
