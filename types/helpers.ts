import { z } from 'zod';
import { Protocol, NewProtocol } from '@/types/zod-schemas';
import { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';

const HasIdSchema = z.object({
  id: z.uuid(),
});

export function isExistingProtocol(
  protocol: NewProtocol | Protocol,
): protocol is Protocol {
  return HasIdSchema.safeParse(protocol).success;
}

export function hasSerializedState(
  protocol: Protocol | ProtocolNavItemsQueryResult,
): protocol is Protocol {
  return (
    'serializedState' in protocol && protocol.serializedState !== undefined
  );
}
