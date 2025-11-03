import { z } from 'zod';
import type { SerializedEditorState } from 'lexical';

export { ProtocolSchema, NewProtocolSchema, LoginSchema, ICONLIST, IconSchema };
export type { Protocol, NewProtocol, Login, Icon };

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

const ICONLIST = [
  'bird',
  'fish',
  'bug',
  'squirrel',
  'turtle',
  'snail',
] as const;

const IconSchema = z.enum(ICONLIST);

type Icon = z.infer<typeof IconSchema>;

const ProtocolSchema = z.object({
  id: z.uuid(),
  name: z.string().nonempty('Name is required'),
  serializedState: SerializedEditorStateSchema,
  createdAt: z.union([z.date(), z.string()]),
  editedAt: z.union([z.date(), z.string()]).nullable(),
  authorId: z.string().nullable(),
  editorId: z.string().nullable(),
  icon: IconSchema,
});

type Protocol = z.infer<typeof ProtocolSchema>;

const NewProtocolSchema = z.object({
  name: z.string(),
  serializedState: SerializedEditorStateSchema,
  icon: IconSchema.optional(),
});

type NewProtocol = z.infer<typeof NewProtocolSchema>;

const LoginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string({ message: 'Password is required' })
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

type Login = z.infer<typeof LoginSchema>;
