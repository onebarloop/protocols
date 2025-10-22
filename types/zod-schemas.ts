import { z } from 'zod';
import type { SerializedEditorState } from 'lexical';

export { ProtocolSchema, NewProtocolSchema };
export type { Protocol, NewProtocol };

const SerializedEditorStateSchema: z.ZodType<SerializedEditorState> = z.object({
  root: z.object({
    children: z.array(z.any()),
    direction: z
      .union([z.literal('ltr'), z.literal('rtl'), z.null()])
      .optional(),
    format: z.union([z.string(), z.number()]).optional(),
    indent: z.number().optional(),
    type: z.string(),
    version: z.number().optional(),
  }),
}) as z.ZodType<SerializedEditorState>;

const ProtocolSchema = z.object({
  id: z.uuid(),
  name: z.string().nonempty('Name is required'),
  serializedState: SerializedEditorStateSchema,
  createdAt: z.union([z.date(), z.string()]),
  editedAt: z.union([z.date(), z.string()]).nullable(),
  authorId: z.string().nullable(),
  editorId: z.string().nullable(),
  icon: z.string(),
});

type Protocol = z.infer<typeof ProtocolSchema>;

const NewProtocolSchema = z.object({
  name: z.string(),
  serializedState: SerializedEditorStateSchema,
  icon: z.string().optional(),
});

type NewProtocol = z.infer<typeof NewProtocolSchema>;
