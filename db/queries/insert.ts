import { db } from '../index';
import { protocols } from '../schema';

import { NewProtocol } from '@/types/db-types';

export async function addProtocol(protocol: NewProtocol) {
  await db.insert(protocols).values({
    name: protocol.name,
    html: protocol.html,
  });
}
