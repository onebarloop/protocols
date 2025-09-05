'use client';

import Editor from './_components/editor';
import { useDocument } from './_contexts/document-context';

export default function NewDocument() {
  const { html, setHtml } = useDocument();

  return (
    <div className="w-fit mx-auto">
      <Editor html={html} setHtml={setHtml} />
    </div>
  );
}
