'use client';

import Editor from '@/components/custom/editor';
import { useDocument } from '../lib/context/document-context';

export default function NewDocument() {
  const { html, setHtml } = useDocument();

  return <Editor html={html} setHtml={setHtml} className="mx-auto w-a4 h-96 rounded" />;
}
