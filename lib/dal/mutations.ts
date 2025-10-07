'use server';

import { revalidateTag } from 'next/cache';
import { db } from '@/db/index';
import { protocols } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { NewProtocol, SuccessMessage } from '@/types/db-types';

export async function saveNewProtocol(
  protocol: NewProtocol,
): Promise<SuccessMessage> {
  if (protocol.name.trim() === 'New Protocol') {
    protocol.name = new Date().toLocaleDateString();
  }
  try {
    await db.insert(protocols).values({
      name: protocol.name,
      html: protocol.html,
    });
    revalidateTag('allProtocols');
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
    revalidateTag('allProtocols');
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
