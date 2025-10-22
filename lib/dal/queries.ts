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

export type ProtocolNavItem = Awaited<
  ReturnType<typeof getAllProtocols>
>[number];

export async function getProtocolById(id: string) {
  try {
    return await unstable_cache(
      async () => {
        return await db.query.protocols.findFirst({
          where: (protocols, { eq }) => eq(protocols.id, id),
          with: {
            author: true,
            editor: true,
          },
        });
      },
      ['protocol', id],
      {
        tags: [`protocol-${id}`],
      },
    )();
  } catch (error) {
    console.error('Error fetching protocol by ID:', error);
    return null;
  }
}

export type ProtocolQueryResult = Awaited<ReturnType<typeof getProtocolById>>;
