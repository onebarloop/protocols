import { db } from '@/db/index';
import { unstable_cache } from 'next/cache';

export const getAllProtocols = unstable_cache(
  async () => {
    return db.query.protocols.findMany({
      orderBy: (protocols, { asc }) => [asc(protocols.createdAt)],
    });
  },
  ['protocols'],
  {
    tags: ['allProtocols'],
  },
);

export async function getProtocolById(id: string) {
  return await db.query.protocols.findFirst({
    where: (protocols, { eq }) => eq(protocols.id, id),
  });
}
