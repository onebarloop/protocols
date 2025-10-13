import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const protocols = pgTable('protocols', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  html: text('html').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: text('created_by'),
  icon: text('icon').default('🧪').notNull(),
});

export type InsertProtocol = typeof protocols.$inferInsert;
export type SelectProtocol = typeof protocols.$inferSelect;
