'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

export function PDFPlugin({
  setHtml,
}: {
  setHtml: (html: string | null) => void;
}) {
  const [editor] = useLexicalComposerContext();

  function exportToPDF() {
    editor.read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      setHtml(html);
    });
  }

  return (
    <Button variant="outline" size="icon" onClick={exportToPDF}>
      <Download className="h-4 w-4" />
    </Button>
  );
}
