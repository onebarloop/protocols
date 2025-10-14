"use client"

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { $generateHtmlFromNodes } from "@lexical/html"
import { EditorState, SerializedEditorState } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

import { nodes } from "./nodes"
import { Plugins } from "./plugins"

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error)
  },
}

function OnChangePluginWrapper({
  onChange,
  onSerializedChange,
  onHtmlChange,
}: {
  onChange?: (editorState: EditorState) => void
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
  onHtmlChange?: (html: string) => void
}) {
  const [editor] = useLexicalComposerContext()

  return (
    <OnChangePlugin
      ignoreSelectionChange={true}
      onChange={(editorState) => {
        onChange?.(editorState)
        onSerializedChange?.(editorState.toJSON())

        // Generate HTML for database storage
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor)
          onHtmlChange?.(html)
        })
      }}
    />
  )
}

export default function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  onHtmlChange,
}: {
  editorState?: EditorState
  editorSerializedState?: SerializedEditorState
  onChange?: (editorState: EditorState) => void
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
  onHtmlChange?: (html: string) => void
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />
          <OnChangePluginWrapper
            onChange={onChange}
            onSerializedChange={onSerializedChange}
            onHtmlChange={onHtmlChange}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}