import { User } from "@/shared/domain/types/user.type";

export type RegisterAdminDTO = Pick<
  User,
  "name" | "email" | "departmentId"
> & {
  password: string;
};