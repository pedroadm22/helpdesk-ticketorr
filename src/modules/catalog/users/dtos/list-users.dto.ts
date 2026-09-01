import type { User } from "@/shared/domain/types/user.type";

export type ListUsersDTO = {
  departmentId?: string;
  teamId?: string;
  role?: User["role"];
  active?: boolean;
};