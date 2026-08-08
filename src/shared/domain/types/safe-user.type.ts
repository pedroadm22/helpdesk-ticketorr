import { User } from "./user.type";

export type SafeUser = Omit<User, 'passwordHash'>;