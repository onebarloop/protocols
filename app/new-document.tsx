'use client';

import Editor from '@/components/custom/editor';
import { useDocument } from '../lib/context/document-context';

export default function NewDocument() {
  const { html, setHtml } = useDocument();

  return (
    <Editor html={html} setHtml={setHtml} className="w-full h-full rounded" />
  );
}
