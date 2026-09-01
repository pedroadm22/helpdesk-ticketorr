import { User } from "@/shared/domain/types/user.type";

export type RegisterClientDTO = Pick<
  User,
  "name" | "email"
> & {
  password: string;
};