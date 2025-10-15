import { db } from '@/db/index';
import { unstable_cache } from 'next/cache';

export const getAllProtocols = unstable_cache(
  () => {
    return db.query.protocols.findMany({
      columns: {
        id: true,
        name: true,
        icon: true,
      },
      orderBy: (protocols, { asc }) => [asc(protocols.createdAt)],
    });
  },
  ['protocols'],
  {
    tags: ['protocols'],
  },
);

export function getProtocolById(id: string) {
  return unstable_cache(
    () => {
      console.log('CACHE MISS - fetching protocol', id);
      return db.query.protocols.findFirst({
        where: (protocols, { eq }) => eq(protocols.id, id),
      });
    },
    ['protocol', id],
    {
      tags: [`protocol-${id}`],
    },
  )();
}
