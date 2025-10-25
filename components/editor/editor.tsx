'use client';

import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, SerializedEditorState } from 'lexical';

import { editorTheme } from '@/components/editor/themes/editor-theme';
import { TooltipProvider } from '@/components/ui/tooltip';

import { nodes } from './nodes';
import { Plugins } from './plugins';
import { useDocument } from '@/lib/context/document-context';
import { on } from 'events';

const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

function OnChangePluginWrapper({
  onChange,
  onSerializedChange,
}: {
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <OnChangePlugin
      ignoreSelectionChange={true}
      onChange={(editorState) => {
        onChange?.(editorState);
        onSerializedChange?.(editorState.toJSON());
      }}
    />
  );
}

export default function Editor({
  editorState,
  editorSerializedState,
  onChange,
  editable = true,
  onSerializedChange,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  editable?: boolean;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  //const { protocolDispatch } = useDocument();

  /*  const handleSerializedChange = (serializedState: SerializedEditorState) => {
    protocolDispatch({ type: 'setSerializedState', payload: serializedState });
  }; */
  return (
    <div className="bg-background rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          editable,
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins editable={editable} />
          {(onChange || onSerializedChange) && (
            <OnChangePluginWrapper
              onChange={onChange}
              onSerializedChange={onSerializedChange}
            />
          )}
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
