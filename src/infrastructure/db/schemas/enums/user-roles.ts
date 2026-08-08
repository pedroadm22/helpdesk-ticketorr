import { USER_ROLES } from "@/shared/types/domain/user-role.type";
import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", USER_ROLES);