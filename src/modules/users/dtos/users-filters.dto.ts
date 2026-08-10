import { User } from "@/shared/domain/types";

export type FilterUsersDTO = Partial<Pick<User, 'role'>> & {
  search?: string;
  page?: number;
  limit?: number;
};