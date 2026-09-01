import type { BaseUser } from "@/shared/domain/types/user.type";

export type UpdateUserDTO = Partial<Pick<BaseUser, "name" | "email">>;
