import {
  pgTable,
  timestamp,
  pgEnum,
  text,
  boolean,
} from "drizzle-orm/pg-core";

import { ALL_USER_ROLES } from "@/shared/domain/types/user-role.type"

// Define os papéis de usuário no sistema
export const userRoleEnum = pgEnum("user_role", ALL_USER_ROLES);

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: userRoleEnum("role").default("CLIENT").notNull(),
  departmentId: text("department_id"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;