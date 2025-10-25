'use client';
import Editor from '../editor/editor';
import { useDocument } from '@/lib/context/document-context';
import { SerializedEditorState, EditorState } from 'lexical';

type EditorWrapperProps = {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  editable?: boolean;
};

export default function EditorWrapper(props: EditorWrapperProps) {
  const { protocolDispatch } = useDocument();
  const handleSerializedChange = (serializedState: SerializedEditorState) => {
    protocolDispatch({ type: 'setSerializedState', payload: serializedState });
  };

  return <Editor {...props} onSerializedChange={handleSerializedChange} />;
}
