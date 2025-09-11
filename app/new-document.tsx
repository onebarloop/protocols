'use client';

import Editor from '@/components/custom/editor';
import { useDocument } from '../lib/context/document-context';

export default function NewDocument() {
  const { protocolState, protocolDispatch } = useDocument();

  const setHtml = (html: string) => {
    protocolDispatch({ type: 'setHtml', payload: html });
  }

  return (
    <Editor html={protocolState.html} setHtml={setHtml} className="w-full h-full rounded" />
  );
}
