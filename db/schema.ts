import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { SerializedEditorState } from 'lexical';

export const protocols = pgTable('protocols', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  serializedState: jsonb('serialized_state').$type<SerializedEditorState>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: text('created_by'),
  icon: text('icon').default('🧪').notNull(),
});

export type InsertProtocol = typeof protocols.$inferInsert;
export type SelectProtocol = typeof protocols.$inferSelect;
