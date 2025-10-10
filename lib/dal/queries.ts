import { db } from '@/db/index';
import { protocols } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export const getAllProtocols = unstable_cache(
  async () => {
    return db.select().from(protocols).orderBy(asc(protocols.createdAt));
  },
  ['protocols'],
  {
    tags: ['allProtocols'],
  },
);

export async function getProtocolById(id: string) {
  const result = await db.select().from(protocols).where(eq(protocols.id, id));
  return result[0] || null;
}
