import { User } from "@/shared/domain/types";

export type UserResponseDTO = Omit<User, 'passwordHash'>;