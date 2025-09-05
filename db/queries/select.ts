import { db } from '../index';
import { protocols } from '../schema';
import { eq } from 'drizzle-orm';

export async function getAllProtocols() {
  return await db.select().from(protocols).orderBy(protocols.id);
}

export async function getProtocolById(id: number) {
  const result = await db.select().from(protocols).where(eq(protocols.id, id));
  return result[0] || null;
}
