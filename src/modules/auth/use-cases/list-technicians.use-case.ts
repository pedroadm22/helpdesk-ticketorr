// src/modules/users/use-cases/list-technicians.use-case.ts
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema/auth";

export async function listTechniciansUseCase() {
  return await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.role, "TECHNICIAN"));
}