import { useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin';
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin';

import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { EditablePlugin } from '@/components/editor/plugins/utility/editable-plugin';

import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { BlockFormatDropDown } from '@/components/editor/plugins/toolbar/block-format-toolbar-plugin';
import { FormatParagraph } from '@/components/editor/plugins/toolbar/block-format/format-paragraph';
import { FormatHeading } from '@/components/editor/plugins/toolbar/block-format/format-heading';
import { FormatNumberedList } from '@/components/editor/plugins/toolbar/block-format/format-numbered-list';
import { FormatBulletedList } from '@/components/editor/plugins/toolbar/block-format/format-bulleted-list';
import { FormatCheckList } from '@/components/editor/plugins/toolbar/block-format/format-check-list';
import { FormatQuote } from '@/components/editor/plugins/toolbar/block-format/format-quote';
import { ElementFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/element-format-toolbar-plugin';
import { HistoryToolbarPlugin } from './plugins/toolbar/history-toolbar-plugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { FontBackgroundToolbarPlugin } from './plugins/toolbar/font-background-toolbar-plugin';
import { FontColorToolbarPlugin } from './plugins/toolbar/font-color-toolbar-plugin';
import { ClearFormattingToolbarPlugin } from './plugins/toolbar/clear-formatting-toolbar-plugin';
import { LinkToolbarPlugin } from './plugins/toolbar/link-toolbar-plugin';
import { LinkPlugin } from './plugins/link-plugin';
import { AutoLinkPlugin } from './plugins/auto-link-plugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { FloatingLinkEditorPlugin } from './plugins/floating-link-editor-plugin';
import { FontSizeToolbarPlugin } from './plugins/toolbar/font-size-plugin';
import { PDFPlugin } from './plugins/toolbar/pdf-plugin';
import { set } from 'zod';

export function Plugins({
  editable = true,
  setHtml,
}: {
  editable?: boolean;
  setHtml?: (html: string | null) => void;
}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div>
      {/* utility plugins */}
      <EditablePlugin editable={editable} />
      {/* toolbar plugins */}
      {editable && (
        <ToolbarPlugin>
          {() => (
            <div className="bg-background sticky top-0 z-10 flex flex-wrap gap-2 overflow-auto rounded-t-lg border-b p-1">
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={['h1', 'h2', 'h3']} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatQuote />
              </BlockFormatDropDown>
              <ElementFormatToolbarPlugin />
              <FontSizeToolbarPlugin />
              <FontFormatToolbarPlugin />

              <FontColorToolbarPlugin />
              <FontBackgroundToolbarPlugin />
              <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
              <ClearFormattingToolbarPlugin />
              {setHtml && <PDFPlugin setHtml={setHtml} />}

              <HistoryToolbarPlugin />
            </div>
          )}
        </ToolbarPlugin>
      )}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={'Start typing ...'} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CheckListPlugin />
        <HistoryPlugin />
        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      </div>
      {/* actions plugins */}
    </div>
  );
}
