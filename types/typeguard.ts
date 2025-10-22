import { z } from 'zod';
import { Protocol, NewProtocol } from '@/types/zod-schemas';

const HasIdSchema = z.object({
  id: z.string().uuid(),
});

export function isExistingProtocol(
  protocol: NewProtocol | Protocol,
): protocol is Protocol {
  return HasIdSchema.safeParse(protocol).success;
}
