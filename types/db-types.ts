import { InsertProtocol } from '@/db/schema';

export type NewProtocol = Omit<
  InsertProtocol,
  'id' | 'createdAt' | 'createdBy'
>;

export type SuccessMessage = {
  success: boolean;
  message: string;
};
