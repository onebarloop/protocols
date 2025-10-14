'use client';

//import Editor from '@/components/custom/editor';
import { useDocument } from '../lib/context/document-context';
import Editor from '@/components/custom/editor/editor';
import { SerializedEditorState } from 'lexical';

export default function NewDocument() {
  const { protocolDispatch } = useDocument();

  /*  const setHtml = (html: string) => {
    protocolDispatch({ type: 'setHtml', payload: html });
  }; */

  const setSerializedState = (serializedState: SerializedEditorState) => {
    protocolDispatch({ type: 'setSerializedState', payload: serializedState });
  };

  return <Editor onSerializedChange={setSerializedState} />;
}
