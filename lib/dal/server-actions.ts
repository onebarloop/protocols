'use server';

import { updateTag, revalidatePath } from 'next/cache';
import { db } from '@/db/index';
import { protocols } from '@/db/schema/protocols';
import { eq } from 'drizzle-orm';
import { getSession } from '@/auth/get-session';
import { NewProtocol, Protocol } from '@/types/zod-schemas';
import { ProtocolSchema, NewProtocolSchema } from '@/types/zod-schemas';
import { z } from 'zod';
import { unstable_cache } from 'next/cache';

type Result<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string };

type IdResult = Result<{ protocolId: string }>;
type ProtocolResult = Result<{ protocol: Protocol }>;

export async function addProtocol(protocol: NewProtocol): Promise<IdResult> {
  const validationResult = NewProtocolSchema.safeParse(protocol);

  if (!validationResult.success) {
    console.error(
      'Validation error saving new protocol:',
      validationResult.error,
    );
    return {
      success: false,
      error: 'Failed to save protocol: Invalid data',
    };
  }

  const validatedProtocol = validationResult.data;

  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: 'User not authenticated',
    };
  }

  if (session.user.role === 'guest') {
    return {
      success: false,
      error: 'Guest users cannot save protocols. Please sign up.',
    };
  }

  try {
    const [data] = await db
      .insert(protocols)
      .values({
        name: validatedProtocol.name,
        serializedState: validatedProtocol.serializedState,
        icon: validatedProtocol.icon,
        authorId: session?.user?.id || null,
      })
      .returning({ id: protocols.id });
    revalidatePath('/protocols');
    updateTag('protocols-nav');
    return {
      success: true,
      message: 'Protocol saved successfully',
      data: {
        protocolId: data.id,
      },
    };
  } catch (error) {
    console.error('Error saving protocol:', error);
    return {
      success: false,
      error: 'Failed to save protocol. Error in database operation',
    };
  }
}

export async function deleteProtocol(id: string): Promise<IdResult> {
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: 'User not authenticated',
    };
  }

  if (session.user.role === 'guest') {
    return {
      success: false,
      error: 'Guest users cannot delete protocols. Please sign up.',
    };
  }

  try {
    const [data] = await db
      .delete(protocols)
      .where(eq(protocols.id, id))
      .returning({ id: protocols.id });
    revalidatePath(`/protocols/${id}`);
    revalidatePath('/protocols');
    updateTag('protocols-nav');
    return {
      success: true,
      message: 'Protocol deleted successfully',
      data: {
        protocolId: data.id,
      },
    };
  } catch (error) {
    console.error('Error deleting protocol:', error);
    return {
      success: false,
      error: 'Failed to delete protocol. Error in database operation',
    };
  }
}

export async function updateProtocol(protocol: Protocol): Promise<IdResult> {
  const validationResult = ProtocolSchema.safeParse(protocol);

  if (!validationResult.success) {
    console.error(
      'Validation error updating protocol:',
      validationResult.error,
    );
    return {
      success: false,
      error: 'Failed to update protocol: Invalid data',
    };
  }

  const validatedProtocol = validationResult.data;

  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: 'User not authenticated',
    };
  }

  if (session.user.role === 'guest') {
    return {
      success: false,
      error: 'Guest users cannot edit protocols. Please sign up.',
    };
  }

  try {
    const [data] = await db
      .update(protocols)
      .set({
        name: validatedProtocol.name,
        serializedState: validatedProtocol.serializedState,
        icon: validatedProtocol.icon,
        editedAt: new Date(),
        editorId: session?.user?.id || null,
      })
      .where(eq(protocols.id, validatedProtocol.id))
      .returning({ id: protocols.id });

    revalidatePath('/protocols');
    revalidatePath(`/protocols/${validatedProtocol.id}`);
    updateTag('protocols-nav');

    return {
      success: true,
      message: 'Protocol updated successfully',
      data: { protocolId: data.id },
    };
  } catch (error) {
    console.error('Error updating protocol:', error);
    return {
      success: false,
      error: 'Failed to update protocol. Error in database operation',
    };
  }
}

export async function getProtocolById(id: string): Promise<ProtocolResult> {
  const validation = z.uuid().safeParse(id);
  if (!validation.success) {
    return {
      success: false,
      error: 'Wrong ID',
    };
  }

  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: 'User not authenticated',
    };
  }

  const data = await unstable_cache(
    async () => {
      return await db.query.protocols.findFirst({
        where: (protocols, { eq }) => eq(protocols.id, id),
      });
    },
    ['protocol', id],
    {
      tags: [`protocol-${id}`],
    },
  )();

  if (!data) {
    return {
      success: false,
      error: 'Protocol not found',
    };
  }

  return {
    success: true,
    message: 'Protocol fetched successfully',
    data: {
      protocol: data,
    },
  };
}
