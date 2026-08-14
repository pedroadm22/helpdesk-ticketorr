import { User } from "@/shared/domain/types";

export type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;