// src/infrastructure/db/schema/users.ts
import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

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
  image: text("image"),
  role: userRoleEnum("role").notNull().default("CLIENT"),

  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});