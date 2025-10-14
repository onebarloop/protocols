'use client';

//import Editor from '@/components/custom/editor';
import { useDocument } from '../lib/context/document-context';
import Editor from '@/components/custom/editor/editor-new';

export default function NewDocument() {
  const { protocolState, protocolDispatch } = useDocument();

  const setHtml = (html: string) => {
    protocolDispatch({ type: 'setHtml', payload: html });
  };

  return <Editor onHtmlChange={(html) => setHtml(html)} />;
}
