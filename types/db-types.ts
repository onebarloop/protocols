import { InsertProtocol } from '@/db/schema';

export type NewProtocol = Omit<InsertProtocol, 'id' | 'createdAt'>;

export type SuccessMessage = {
  success: boolean;
  message: string;
};
