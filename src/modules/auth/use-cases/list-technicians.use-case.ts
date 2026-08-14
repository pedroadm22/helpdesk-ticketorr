// src/modules/auth/use-cases/list-technicians.use-case.ts
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema";
import { inArray } from "drizzle-orm";

export interface TechnicianOption {
  id: string;
  name: string;
  email: string;
}

export async function listTechniciansUseCase(): Promise<TechnicianOption[]> {
  // Busca apenas usuários que são TECNICOS ou ADMINS
  const technicians = await db.query.users.findMany({
    where: inArray(users.role, ["TECHNICIAN", "ADMIN"]),
    columns: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: (users, { asc }) => [asc(users.name)],
  });

  return technicians;
}