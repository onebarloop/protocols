import { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ParagraphNode, TextNode } from "lexical"

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [HeadingNode, ParagraphNode, TextNode, QuoteNode, ListNode, ListItemNode];
