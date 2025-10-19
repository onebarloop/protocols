'use server';

import { revalidateTag } from 'next/cache';
import { db } from '@/db/index';
import { protocols } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createRandomName } from '../utils';

import { NewProtocol, Protocol, SuccessMessage } from '@/types/db-types';
import { create } from 'domain';

export async function saveNewProtocol(
  protocol: NewProtocol,
): Promise<SuccessMessage> {
  if (!protocol.serializedState) {
    return {
      success: false,
      message: 'Cannot save protocol: Editor content is required',
    };
  }

  if (protocol.name.trim() === '' || protocol.name === 'New Protocol') {
    protocol.name = createRandomName({ type: 'animals' });
  }

  try {
    await db.insert(protocols).values({
      name: protocol.name,
      serializedState: protocol.serializedState,
      icon: protocol.icon,
      createdBy: createRandomName({ type: 'names' }), // Placeholder
    });
    revalidateTag('protocols');
    return {
      success: true,
      message: 'Protocol saved successfully',
    };
  } catch (error) {
    console.error('Error saving protocol:', error);
    return {
      success: false,
      message: 'Failed to save protocol',
    };
  }
}

export async function deleteProtocol(id: string): Promise<SuccessMessage> {
  try {
    await db.delete(protocols).where(eq(protocols.id, id));
    revalidateTag('protocols');
    revalidateTag(`protocol-${id}`);
    return {
      success: true,
      message: 'Protocol deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting protocol:', error);
    return {
      success: false,
      message: 'Failed to delete protocol',
    };
  }
}

export async function updateProtocol(
  protocol: Protocol,
): Promise<SuccessMessage> {
  if (!protocol.serializedState) {
    return {
      success: false,
      message: 'Cannot update protocol: Editor content is required',
    };
  }

  if (!protocol.id) {
    return {
      success: false,
      message: 'Cannot update protocol: Protocol ID is required',
    };
  }

  if (protocol.name.trim() === '') {
    return {
      success: false,
      message: 'Cannot update protocol: Name is required',
    };
  }

  try {
    await db
      .update(protocols)
      .set({
        name: protocol.name,
        serializedState: protocol.serializedState,
        icon: protocol.icon,
        editedAt: new Date(),
        editedBy: createRandomName({ type: 'names' }), // Placeholder
      })
      .where(eq(protocols.id, protocol.id));

    revalidateTag('protocols');
    revalidateTag(`protocol-${protocol.id}`);

    return {
      success: true,
      message: 'Protocol updated successfully',
    };
  } catch (error) {
    console.error('Error updating protocol:', error);
    return {
      success: false,
      message: 'Failed to update protocol',
    };
  }
}
