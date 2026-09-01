import { User } from "@/shared/domain/types/user.type";

export type UpdateUserDTO = Partial<
  Pick<
    User,
    "name" |
    "email" |
    "role" |
    "departmentId" |
    "teamId"
  >
>;