// src/infrastructure/db/schema/users.ts
import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { departments } from "./catalog";

// Enum para controle de acesso do seu sistema
export const userRoleEnum = pgEnum("user_role", [
  "CLIENT",
  "TECHNICIAN",
  "ADMIN",
]);

export const users = pgTable("users", {
  // O ID DEVE ser do tipo UUID, sem defaultRandom(),
  // pois ele virá diretamente do auth.users do Supabase
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image").notNull().default("https://ui-avatars.com/api/?name=User&background=random"),
  role: userRoleEnum("role").notNull().default("CLIENT"),
  departmentId: uuid("department_id").references(() => departments.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
