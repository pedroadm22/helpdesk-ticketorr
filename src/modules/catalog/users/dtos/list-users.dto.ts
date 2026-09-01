import type { UserRole } from "@/shared/domain/types/user.type";

export type ListUsersDTO = {
  page?: number;
  limit?: number;

  search?: string;

  role?: UserRole;
  departmentId?: string;
  teamId?: string;

  active?: boolean;
};