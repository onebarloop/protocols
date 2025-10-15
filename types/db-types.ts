import { InsertProtocol, SelectProtocol } from '@/db/schema';

export type NewProtocol = Omit<
  InsertProtocol,
  'id' | 'createdAt' | 'createdBy' | 'serializedState'
> & {
  serializedState?: InsertProtocol['serializedState'];
};

export type Protocol = SelectProtocol;
export type ProtocolNavItem = Pick<SelectProtocol, 'id' | 'name' | 'icon'>;

export type SuccessMessage = {
  success: boolean;
  message: string;
};
