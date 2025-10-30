import { db } from '@/db/index';
import { unstable_cache } from 'next/cache';
import { getSession } from '@/auth/get-session';
import z from 'zod';

async function getProtocolNavItems() {
  const session = await getSession();
  if (!session) {
    return [];
  }

  return await unstable_cache(
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
    ['protocols-nav'],
    {
      tags: ['protocols-nav', 'protocols'],
    },
  )();
}

async function getAllProtocols() {
  const session = await getSession();
  if (!session) {
    return [];
  }

  return await unstable_cache(
    () => {
      return db.query.protocols.findMany({
        with: {
          author: true,
          editor: true,
        },
        orderBy: (protocols, { asc }) => [asc(protocols.createdAt)],
      });
    },
    ['protocols'],
    {
      tags: ['protocols'],
    },
  )();
}

async function getProtocolById(id: string) {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const validation = z.uuid().safeParse(id);
  if (!validation.success) {
    return null;
  }

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
}

type ProtocolNavItemsQueryResult = Awaited<
  ReturnType<typeof getProtocolNavItems>
>[number];

type AllProtocolsQueryResult = Awaited<
  ReturnType<typeof getAllProtocols>
>[number];

type ProtocolQueryResult = Awaited<ReturnType<typeof getProtocolById>>;

export { getProtocolNavItems, getAllProtocols, getProtocolById };
export type {
  ProtocolNavItemsQueryResult,
  AllProtocolsQueryResult,
  ProtocolQueryResult,
};
