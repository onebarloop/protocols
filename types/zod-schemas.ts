import { z } from 'zod';

export const ProtocolSchema = z.object({
  id: z.uuid(),
  name: z.string().nonempty('Name is required'),
  serializedState: z.any().refine((val) => val != null, {
    message: 'serializedState is required',
  }),
  createdAt: z.union([z.date(), z.string()]),
  editedAt: z.union([z.date(), z.string()]).nullable(),
  authorId: z.string().nullable(),
  editorId: z.string().nullable(),
  icon: z.string(),
});

export type Protocol = z.infer<typeof ProtocolSchema>;

export const NewProtocolSchema = z.object({
  name: z.string(),
  serializedState: z.any().refine((val) => val != null, {
    message: 'serializedState is required',
  }),
  icon: z.string().optional(),
});

export type NewProtocol = z.infer<typeof NewProtocolSchema>;
