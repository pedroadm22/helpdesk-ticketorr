import { User } from "@/shared/domain/types";

export type UpdateUserDTO = Partial<
  Pick<User, "name" | "email" | "role" | "avatarUrl">
>;
