import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { SerializedEditorState } from 'lexical';
import { user } from './auth-schema';

export const protocols = pgTable('protocols', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  serializedState: jsonb('serialized_state')
    .$type<SerializedEditorState>()
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  editedAt: timestamp('edited_at'),
  authorId: text('author_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  editorId: text('editor_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  icon: text('icon').default('🧪').notNull(),
});

export type InsertProtocol = typeof protocols.$inferInsert;
export type SelectProtocol = typeof protocols.$inferSelect;
