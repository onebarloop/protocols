import { InsertProtocol, SelectProtocol } from '@/db/schema/protocols';
import { ProtocolNavItem, ProtocolQueryResult } from '@/lib/dal/queries';

type NewProtocol = Omit<
  InsertProtocol,
  'createdAt' | 'createdBy' | 'serializedState'
> & {
  serializedState?: InsertProtocol['serializedState'];
};

type Protocol = SelectProtocol;

type SuccessMessage = {
  success: boolean;
  message: string;
};

export type {
  Protocol,
  NewProtocol,
  SuccessMessage,
  ProtocolNavItem,
  ProtocolQueryResult,
};
