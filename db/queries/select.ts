import { db } from '../index';
import { protocols } from '../schema';
import { eq, asc } from 'drizzle-orm';

export async function getAllProtocols() {
  return await db.select().from(protocols).orderBy(asc(protocols.createdAt));
}

export async function getProtocolById(id: string) {
  const result = await db.select().from(protocols).where(eq(protocols.id, id));
  return result[0] || null;
}
