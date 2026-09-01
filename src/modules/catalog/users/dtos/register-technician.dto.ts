import { User } from "@/shared/domain/types/user.type";

export type RegisterTechnicianDTO = Pick<
  User,
  "name" | "email" | "departmentId" | "teamId"
> & {
  password: string;
};