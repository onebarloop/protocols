'use client';

import Editor from '@/components/custom/editor';
import { useDocument } from '../lib/context/document-context';

export default function NewDocument() {
  const { html, setHtml } = useDocument();

  return (
    <div className="mx-auto w-fit">
      <Editor html={html} setHtml={setHtml} />
    </div>
  );
}
