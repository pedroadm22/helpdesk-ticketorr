import { AuthUser } from "@/shared/domain/types/auth-user.type";

export type LoginDTO = Pick<AuthUser, "email"> & {
  password: string;
};
