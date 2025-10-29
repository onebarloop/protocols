'use server';

import { updateTag, revalidatePath } from 'next/cache';
import { db } from '@/db/index';
import { protocols } from '@/db/schema/protocols';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth/get-session';
import { SuccessMessage } from '@/types/types';
import { NewProtocol, Protocol } from '@/types/zod-schemas';
import { ProtocolSchema, NewProtocolSchema } from '@/types/zod-schemas';
import { createRandomName } from '../utils';

export async function saveNewProtocol(
  protocol: NewProtocol,
): Promise<SuccessMessage> {
  const validationResult = NewProtocolSchema.safeParse(protocol);

  if (!validationResult.success) {
    console.error(
      'Validation error saving new protocol:',
      validationResult.error,
    );
    return {
      success: false,
      message: 'Failed to save protocol: Invalid data',
    };
  }

  const validatedProtocol = validationResult.data;

  const name =
    validatedProtocol.name === '' || validatedProtocol.name === 'New Protocol'
      ? createRandomName({ type: 'animals' })
      : validatedProtocol.name;

  const session = await getSession();
  if (!session) {
    return {
      success: false,
      message: 'User not authenticated',
    };
  }

  if (session.user.role === 'guest') {
    return {
      success: false,
      message: 'Guest users cannot save protocols. Please sign up.',
    };
  }

  try {
    const [data] = await db
      .insert(protocols)
      .values({
        name,
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
      protocolId: data.id,
    };
  } catch (error) {
    console.error('Error saving protocol:', error);
    return {
      success: false,
      message: 'Failed to save protocol. Error in database operation',
    };
  }
}

export async function deleteProtocol(id: string): Promise<SuccessMessage> {
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      message: 'User not authenticated',
    };
  }

  if (session.user.role === 'guest') {
    return {
      success: false,
      message: 'Guest users cannot delete protocols. Please sign up.',
    };
  }

  try {
    await db.delete(protocols).where(eq(protocols.id, id));
    revalidatePath(`/protocols/${id}`);
    revalidatePath('/protocols');
    updateTag('protocols-nav');
    return {
      success: true,
      message: 'Protocol deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting protocol:', error);
    return {
      success: false,
      message: 'Failed to delete protocol. Error in database operation',
    };
  }
}

export async function updateProtocol(
  protocol: Protocol,
): Promise<SuccessMessage> {
  const validationResult = ProtocolSchema.safeParse(protocol);

  if (!validationResult.success) {
    console.error(
      'Validation error updating protocol:',
      validationResult.error,
    );
    return {
      success: false,
      message: 'Failed to update protocol: Invalid data',
    };
  }

  const validatedProtocol = validationResult.data;

  const session = await getSession();
  if (!session) {
    return {
      success: false,
      message: 'User not authenticated',
    };
  }

  if (session.user.role === 'guest') {
    return {
      success: false,
      message: 'Guest users cannot edit protocols. Please sign up.',
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
      protocolId: data.id,
    };
  } catch (error) {
    console.error('Error updating protocol:', error);
    return {
      success: false,
      message: 'Failed to update protocol. Error in database operation',
    };
  }
}
