import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const protocols = pgTable('protocols', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  html: text('html'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertUser = typeof protocols.$inferInsert;
export type SelectUser = typeof protocols.$inferSelect;
