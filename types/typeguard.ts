import { NewProtocol, Protocol } from '@/types/db-types';

export function isExistingProtocol(
  protocol: NewProtocol | Protocol,
): protocol is Protocol {
  return 'id' in protocol && protocol.id !== undefined;
}
