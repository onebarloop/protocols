'use server';

import { addProtocol } from '@/db/queries/insert';
import { revalidatePath } from 'next/cache';

import { NewProtocol, SuccessMessage } from '@/types/db-types';

export async function saveNewProtocol(
  protocol: NewProtocol,
): Promise<SuccessMessage> {
  if (protocol.name.trim() === 'New Protocol') {
    protocol.name = new Date().toLocaleDateString();
  }
  try {
    await addProtocol(protocol);
    revalidatePath('/');
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
