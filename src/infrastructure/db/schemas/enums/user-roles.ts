import { ALL_USER_ROLES } from "@/shared/domain/types/user-role.type";
import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ALL_USER_ROLES);