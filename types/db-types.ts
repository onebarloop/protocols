import { InsertProtocol, SelectProtocol } from '@/db/schema/protocols';

export type NewProtocol = Omit<
  InsertProtocol,
  'createdAt' | 'createdBy' | 'serializedState'
> & {
  serializedState?: InsertProtocol['serializedState'];
};

export type Protocol = SelectProtocol;
export type ProtocolNavItem = Pick<SelectProtocol, 'id' | 'name' | 'icon'>;

export type SuccessMessage = {
  success: boolean;
  message: string;
};
