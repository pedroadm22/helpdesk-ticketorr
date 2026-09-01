import { User } from "@/shared/domain/types/user.type";

export type SignInDTO = Pick<
  User,
  "email"
> & {
  password: string;
};