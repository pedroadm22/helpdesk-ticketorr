import { User } from '@/shared/domain/types/user.type';

export type LoginDTO = {
  email: User['email'];
  password: string;
};